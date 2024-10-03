const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: 'price_1PyWQiHlBvX5OuBXeqCTk0Ja',
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${request.nextUrl.origin}/checkout?success=true`,
          cancel_url: `${request.nextUrl.origin}/checkout?canceled=true`,
        });
        return NextResponse.redirect(session.url, 303);
      } catch (err: unknown) {
        // response.status(err.statusCode || 500).json(err.message);
        if (err instanceof Error) {
            // If err is an instance of StripeError or has a custom statusCode
            const statusCode = (err as any).statusCode || 500;
            return NextResponse.json({ message: err.message }, { status: statusCode });
        }

        // Fallback in case err is not of type Error (unlikely, but possible)
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
      }
     
}