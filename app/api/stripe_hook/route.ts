const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

import { NextResponse, NextRequest } from 'next/server'
import { headers } from 'next/headers';

export async function POST(request: Request, response: NextResponse){
    try {
        const body = await request.text();

        const signature = headers().get("stripe-signature");

        const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

        if(event.type === "checkout.session.completed"){
            if(!event.data.object.customer_details.email){
                throw new Error(`missing user emil, ${event.id}`);
            }

            if(!event.data.object.metadata.itinerary_id){
                throw new Error(`missing itinerary_id on metadata, ${event.id}`);
            }

            //updateDB() - SET PAYMENT FLAG
            //SendEmail() - Send payment confirmation email
        }

        return NextResponse.json({ result: event, ok: true });
    } catch (err: unknown) {
        if (err instanceof Error) {
            // If err is an instance of StripeError or has a custom statusCode
            const statusCode = (err as any).statusCode || 500;
            return NextResponse.json({ message: err.message }, { status: statusCode });
        }

        // Fallback in case err is not of type Error (unlikely, but possible)
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
      }
}