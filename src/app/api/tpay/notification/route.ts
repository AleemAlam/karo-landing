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

        // Check for payment token (card tokenization for recurring payments)
        // Tpay returns the token as `cli_auth` or within the card data fields
        const paymentToken = body.cli_auth || body.card_token;
        if (paymentToken) {
            console.log('=== RECURRING PAYMENT TOKEN RECEIVED ===');
            console.log('Payment Token:', paymentToken);
            console.log('Payer Email:', body.tr_email || body.email);
            console.log('Transaction ID:', body.tr_id);
            console.log('=========================================');

            // TODO: Store this token in your database associated with the user/order.
            // This token is needed to charge the customer for subsequent weekly payments (weeks 2-6).
            //
            // To charge subsequent payments, make a POST request to:
            //   POST https://api.tpay.com/transactions
            // with the payload:
            //   {
            //     amount: 239.00,
            //     description: "Weekly payment - Week X of 6",
            //     payer: { email: "...", name: "..." },
            //     pay: {
            //       groupId: 103,
            //       cardPaymentData: {
            //         token: "<paymentToken>",
            //         cof: "recurring"
            //       }
            //     }
            //   }
            //
            // You would set up a cron job / scheduled task to run weekly for 5 more weeks.
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
