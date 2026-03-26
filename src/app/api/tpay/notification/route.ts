import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

export async function POST(request: Request) {
    try {
        const contentType = request.headers.get('content-type') || '';
        let body: Record<string, any>;

        if (contentType.includes('application/json')) {
            body = await request.json();
        } else {
            const formData = await request.formData();
            body = Object.fromEntries(formData.entries());
        }

        console.log('Tpay Notification Received:', JSON.stringify(body, null, 2));

        const transactionId = body.tr_id;
        const trStatus = typeof body.tr_status === 'string' ? body.tr_status.toUpperCase() : '';
        const isSuccess = trStatus === 'TRUE';
        const paymentToken = body.cli_auth || body.card_token;

        if (!transactionId) {
            console.warn('Notification missing tr_id');
            return new NextResponse('TRUE', { status: 200, headers: { 'Content-Type': 'text/plain' } });
        }

        if (isSuccess) {
            console.log('Payment successful for Transaction ID:', transactionId);

            try {
                const db = getDb();

                // Try exact match first, then try with/without "TR-" prefix
                // TPay API returns transactionId in one format, webhook sends tr_id in another
                const possibleIds = [transactionId];
                if (transactionId.startsWith('TR-')) {
                    possibleIds.push(transactionId.slice(3)); // Without "TR-" prefix
                } else {
                    possibleIds.push(`TR-${transactionId}`); // With "TR-" prefix
                }

                let subsSnapshot = await db.collection('subscriptions')
                    .where('transactionId', '==', possibleIds[0])
                    .limit(1)
                    .get();

                if (subsSnapshot.empty && possibleIds.length > 1) {
                    console.log(`No match for "${possibleIds[0]}", trying "${possibleIds[1]}"...`);
                    subsSnapshot = await db.collection('subscriptions')
                        .where('transactionId', '==', possibleIds[1])
                        .limit(1)
                        .get();
                }

                if (!subsSnapshot.empty) {
                    const subDoc = subsSnapshot.docs[0];
                    const subData = subDoc.data();

                    if (subData.status === 'pending') {
                        if (!paymentToken) {
                            console.error(`Subscription ${subDoc.id}: first payment succeeded but NO card_token received. Check TPay dashboard — tokenization may not be enabled.`);
                            // Still mark as paid but without token, recurring won't work
                            await subDoc.ref.update({
                                weeksPaid: 1,
                                lastPaymentAt: Timestamp.now(),
                            });
                        } else {
                            // First payment confirmed — activate subscription with token
                            const nextPayment = new Date();
                            nextPayment.setDate(nextPayment.getDate() + 7);

                            await subDoc.ref.update({
                                status: 'active',
                                paymentToken: paymentToken,
                                weeksPaid: 1,
                                nextPaymentDate: Timestamp.fromDate(nextPayment),
                                lastPaymentAt: Timestamp.now(),
                            });

                            console.log(`Subscription ${subDoc.id} activated with token. Next payment: ${nextPayment.toISOString()}`);
                        }
                    } else if (subData.status === 'active') {
                        // Subsequent weekly payment confirmed — increment weeksPaid
                        const newWeeksPaid = (subData.weeksPaid || 0) + 1;
                        const isCompleted = newWeeksPaid >= subData.totalWeeks;

                        const updateData: Record<string, any> = {
                            weeksPaid: newWeeksPaid,
                            lastPaymentAt: Timestamp.now(),
                        };

                        if (isCompleted) {
                            updateData.status = 'completed';
                            updateData.nextPaymentDate = null;
                            console.log(`Subscription ${subDoc.id} completed! All ${subData.totalWeeks} weeks paid.`);
                        } else {
                            const nextPayment = new Date();
                            nextPayment.setDate(nextPayment.getDate() + 7);
                            updateData.nextPaymentDate = Timestamp.fromDate(nextPayment);
                            console.log(`Subscription ${subDoc.id} week ${newWeeksPaid}/${subData.totalWeeks} paid. Next: ${nextPayment.toISOString()}`);
                        }

                        await subDoc.ref.update(updateData);
                    }
                } else {
                    console.log('No subscription found for transaction:', transactionId, '(likely a one-time payment)');
                }
            } catch (dbError) {
                console.error('Firestore update error:', dbError);
                // Still return TRUE so Tpay doesn't retry
            }
        }

        // Tpay expects exactly "TRUE" as the response body with 200 OK
        return new NextResponse('TRUE', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' },
        });

    } catch (error) {
        console.error('Tpay Notification Error:', error);
        return new NextResponse('FALSE', { status: 500 });
    }
}
