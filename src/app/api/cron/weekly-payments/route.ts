import { NextResponse } from 'next/server';
import axios from 'axios';
import { getDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

const TPAY_CLIENT_ID = process.env.TPAY_CLIENT_ID || '';
const TPAY_CLIENT_SECRET = process.env.TPAY_CLIENT_SECRET || '';
const TPAY_API_URL = 'https://api.tpay.com';
const CRON_SECRET = process.env.CRON_SECRET || '';

async function getAccessToken(): Promise<string> {
    const tokenUrl = `${TPAY_API_URL}/oauth/auth`;
    const params = new URLSearchParams();
    params.append('client_id', TPAY_CLIENT_ID);
    params.append('client_secret', TPAY_CLIENT_SECRET);
    params.append('scope', 'read write');

    const response = await axios.post(tokenUrl, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return response.data.access_token;
}

export async function GET(request: Request) {
    try {
        // Verify cron secret
        const authHeader = request.headers.get('authorization');
        if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const db = getDb();
        const now = new Date();

        // Find active subscriptions where nextPaymentDate is due
        const subsSnapshot = await db.collection('subscriptions')
            .where('status', '==', 'active')
            .where('nextPaymentDate', '<=', Timestamp.fromDate(now))
            .get();

        if (subsSnapshot.empty) {
            console.log('No weekly payments due at this time.');
            return NextResponse.json({ message: 'No payments due', processed: 0 });
        }

        console.log(`Found ${subsSnapshot.size} subscription(s) due for payment.`);

        let accessToken: string | null = null;
        const origin = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
        let processed = 0;
        let failed = 0;

        for (const doc of subsSnapshot.docs) {
            const sub = doc.data();
            const weekNumber = (sub.weeksPaid || 0) + 1;

            if (!sub.paymentToken) {
                console.error(`Subscription ${doc.id} has no payment token, skipping.`);
                failed++;
                continue;
            }

            if (sub.weeksPaid >= sub.totalWeeks) {
                // Already completed, mark it
                await doc.ref.update({ status: 'completed' });
                console.log(`Subscription ${doc.id} already fully paid, marking completed.`);
                continue;
            }

            try {
                // Get access token (reuse if we already fetched one)
                if (!accessToken) {
                    accessToken = await getAccessToken();
                }

                // Create recurring transaction using stored token
                const transactionPayload = {
                    amount: sub.amount,
                    description: `Migrena Bez Tajemnic - Tydzień ${weekNumber} z ${sub.totalWeeks}`,
                    hiddenDescription: `Weekly payment ${doc.id} week ${weekNumber}`,
                    payer: {
                        email: sub.payerEmail,
                        name: sub.payerName,
                    },
                    pay: {
                        groupId: 103,
                        cardPaymentData: {
                            token: sub.paymentToken,
                        },
                    },
                    callbacks: {
                        notification: {
                            url: `${origin}/api/tpay/notification`,
                            email: sub.payerEmail,
                        },
                    },
                };

                const response = await axios.post(`${TPAY_API_URL}/transactions`, transactionPayload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                const newTransactionId = response.data.title; // webhook tr_id matches title, not transactionId

                // Update the subscription's transactionId so the notification handler
                // can find it when Tpay confirms this payment
                await doc.ref.update({
                    transactionId: newTransactionId,
                    lastChargeAttempt: Timestamp.now(),
                });

                console.log(`Charged subscription ${doc.id} week ${weekNumber}: transactionId=${newTransactionId}`);
                processed++;

            } catch (chargeError: any) {
                console.error(
                    `Failed to charge subscription ${doc.id} week ${weekNumber}:`,
                    chargeError.response?.data || chargeError.message
                );
                failed++;

                // Mark subscription as failed if charge errors out
                await doc.ref.update({
                    lastChargeError: chargeError.response?.data?.message || chargeError.message,
                    lastChargeAttempt: Timestamp.now(),
                });
            }
        }

        return NextResponse.json({
            message: `Processed weekly payments`,
            processed,
            failed,
            total: subsSnapshot.size,
        });

    } catch (error: any) {
        console.error('Cron job error:', error.message);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
