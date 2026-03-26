import { NextResponse } from 'next/server';
import axios from 'axios';
import { getDb } from '@/lib/firebase-admin';
import { Timestamp } from 'firebase-admin/firestore';

const TPAY_CLIENT_ID = process.env.TPAY_CLIENT_ID || '';
const TPAY_CLIENT_SECRET = process.env.TPAY_CLIENT_SECRET || '';
const TPAY_API_URL = 'https://api.tpay.com';

interface OrderRequest {
    amount: number;
    description: string;
    paymentType?: 'weekly' | 'onetime';
    payer: {
        email: string;
        name: string;
    };
}

async function getAccessToken(): Promise<string> {
    const tokenUrl = `${TPAY_API_URL}/oauth/auth`;

    const params = new URLSearchParams();
    params.append('client_id', TPAY_CLIENT_ID);
    params.append('client_secret', TPAY_CLIENT_SECRET);
    params.append('scope', 'read write');

    try {
        const response = await axios.post(tokenUrl, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Tpay Auth Error:', error);
        throw new Error('Failed to authenticate with Tpay');
    }
}

export async function POST(request: Request) {
    try {
        const body: OrderRequest = await request.json();
        const { amount, description, payer, paymentType } = body;

        // Get OAuth access token
        const accessToken = await getAccessToken();

        // Get the origin for redirect URLs
        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

        // Create transaction payload
        const transactionPayload: Record<string, unknown> = {
            amount: amount,
            description: description,
            hiddenDescription: `Order ${Date.now()}`,
            payer: {
                email: payer.email,
                name: payer.name,
            },
            callbacks: {
                payerUrls: {
                    success: `${origin}/pl/buy?status=success`,
                    error: `${origin}/pl/buy?status=error`,
                },
                notification: {
                    url: `${origin}/api/tpay/notification`,
                    email: payer.email,
                },
            },
        };

        // For weekly payments, force card payment and request card tokenization
        if (paymentType === 'weekly') {
            transactionPayload.pay = {
                groupId: 103,
                cardPaymentData: {
                    save: 1,
                },
            };
        }

        // Create transaction in Tpay
        const transactionUrl = `${TPAY_API_URL}/transactions`;
        const transactionResponse = await axios.post(transactionUrl, transactionPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const paymentUrl = transactionResponse.data.transactionPaymentUrl;
        const transactionId = transactionResponse.data.transactionId;
        console.log(transactionResponse.data)

        // For weekly plans, create a subscription record in Firestore
        if (paymentType === 'weekly' && transactionId) {
            try {
                const db = getDb();
                await db.collection('subscriptions').add({
                    payerEmail: payer.email,
                    payerName: payer.name,
                    transactionId: transactionId,
                    paymentType: 'weekly',
                    amount: 1.00,
                    totalWeeks: 3,
                    weeksPaid: 0,
                    paymentToken: null,
                    status: 'pending', // Will become 'active' once first payment confirmed
                    createdAt: Timestamp.now(),
                    nextPaymentDate: null, // Set after first payment confirmation
                });
                console.log('Subscription created in Firestore for transaction:', transactionId);
            } catch (dbError) {
                console.error('Firestore error (non-blocking):', dbError);
                // Don't block the payment flow if DB write fails
            }
        }

        if (paymentUrl) {
            return NextResponse.json({ paymentUrl, transactionId });
        }

        return NextResponse.json({ error: 'Failed to get payment URL' }, { status: 500 });

    } catch (error: any) {
        console.error('Tpay transaction creation error:', error.response?.data || error.message);

        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                { error: error.response?.data?.message || 'Payment service error', details: error.response?.data },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
