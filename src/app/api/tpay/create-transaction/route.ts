import { NextResponse } from 'next/server';
import axios from 'axios';

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
        // so we can charge subsequent weekly installments automatically
        if (paymentType === 'weekly') {
            transactionPayload.pay = {
                groupId: 103, // Card payments group
                cardPaymentData: {
                    save: true,  // Request payment token issuance
                    cof: 'first_customer', // First Customer-Initiated Transaction for recurring
                },
            };
        }

        // Create transaction
        const transactionUrl = `${TPAY_API_URL}/transactions`;
        const transactionResponse = await axios.post(transactionUrl, transactionPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const paymentUrl = transactionResponse.data.transactionPaymentUrl;

        if (paymentUrl) {
            return NextResponse.json({ paymentUrl, transactionId: transactionResponse.data.transactionId });
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
