import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Tpay sends notification as form-data or JSON depending on configuration, 
        // but typically it's POST data. The documentation mentions typical POST parameters.
        // We should read the body.

        // In a real production environment, you MUST verify the JWS signature here.
        // The signature is in the 'X-JWS-Signature' header.
        // You would fetch Tpay's certificate and verify the body.

        // For now, we will log the notification and respond with TRUE to confirm receipt.

        const contentType = request.headers.get('content-type') || '';
        let body;

        if (contentType.includes('application/json')) {
            body = await request.json();
        } else {
            const formData = await request.formData();
            body = Object.fromEntries(formData.entries());
        }

        console.log('Tpay Notification Received:', body);

        // Here update your database status based on `tr_status` or similar fields
        // tr_status: TRUE = transaction successful

        if (body.tr_status === 'TRUE') {
            console.log('Payment successful for Transaction ID:', body.tr_id);
            // TODO: Update order status in your database
        }

        // Tpay expects exactly "TRUE" as the response body with 200 OK
        return new NextResponse('TRUE', {
            status: 200,
            headers: {
                'Content-Type': 'text/plain',
            },
        });

    } catch (error) {
        console.error('Tpay Notification Error:', error);
        return new NextResponse('FALSE', { status: 500 });
    }
}
