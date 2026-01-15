import { NextResponse } from 'next/server';
import axios from 'axios';

const PAYU_BASE_URL = process.env.PAYU_BASE_URL || 'https://secure.payu.com';
const PAYU_CLIENT_ID = process.env.PAYU_CLIENT_ID || '';
const PAYU_CLIENT_SECRET = process.env.PAYU_CLIENT_SECRET || '';
const PAYU_POS_ID = process.env.PAYU_POS_ID || '';

interface OrderRequest {
    amount: number;
    description: string;
}

async function getAccessToken(): Promise<string> {
    const tokenUrl = `${PAYU_BASE_URL}/pl/standard/user/oauth/authorize`;

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', PAYU_CLIENT_ID);
    params.append('client_secret', PAYU_CLIENT_SECRET);

    const response = await axios.post(tokenUrl, params.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    return response.data.access_token;
}

export async function POST(request: Request) {
    try {
        const body: OrderRequest = await request.json();
        const { amount, description } = body;

        // Get OAuth access token
        const accessToken = await getAccessToken();

        // Get the origin for redirect URLs
        const origin = request.headers.get('origin') || 'http://localhost:3000';

        // Create order ID
        const extOrderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(7)}`;

        // Create order payload
        const orderPayload = {
            notifyUrl: `${origin}/api/payu/notify`,
            continueUrl: `${origin}/pl/buy?status=success`,
            customerIp: request.headers.get('x-forwarded-for') || '127.0.0.1',
            merchantPosId: PAYU_POS_ID,
            description: description,
            currencyCode: 'PLN',
            totalAmount: amount.toString(),
            extOrderId: extOrderId,
            products: [
                {
                    name: 'Migraine Without Secrets - Founders Edition',
                    unitPrice: amount.toString(),
                    quantity: '1',
                },
            ],
        };

        // Create order
        const orderUrl = `${PAYU_BASE_URL}/api/v2_1/orders`;
        const orderResponse = await axios.post(orderUrl, orderPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            maxRedirects: 0,
            validateStatus: (status) => status >= 200 && status < 400,
        });

        // PayU returns a 302 redirect with the payment URL
        const redirectUri = orderResponse.data.redirectUri || orderResponse.headers.location;

        if (redirectUri) {
            return NextResponse.json({ redirectUri, orderId: orderResponse.data.orderId });
        }

        return NextResponse.json({ error: 'Failed to get payment URL' }, { status: 500 });
    } catch (error) {
        console.error('PayU order creation error:', error);

        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                { error: error.response?.data?.message || 'Payment service error' },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
