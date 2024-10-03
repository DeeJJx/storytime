'use client'

// import React from 'react';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
const stripeKey: string = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? 'default'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    stripeKey
);
export default function PreviewPage() {
    const [message, setMessage] = useState<string | null>(null);
    useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
      setMessage('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
      setMessage('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start mx-5">
      {message ? (
        <h2>{message}</h2>
      ) : (
        <>
          <h2>Unlock your favourites - £0.99</h2>
          <form action="/api/checkout_session" method="POST">
            <section>
              <button type="submit" role="link">
                Checkout
              </button>
            </section>
            <style jsx>{`
              form {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              section {
                background: #ffffff;
                display: flex;
                flex-direction: column;
                width: 100%;
                border-radius: 6px;
                justify-content: space-between;
                max-width: 400px;
              }
              button {
                height: 36px;
                background: #556cd6;
                border-radius: 4px;
                color: white;
                border: 0;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                
              }
              button:hover {
                opacity: 0.8;
              }
            `}</style>
          </form>
        </>
      )}
    </main>
  );
}