import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import '../styles/Checkout.css';
import { CartState } from '../Context/Context';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51MUCJqSJ5OsYGHjpJhKQbhdQCaudm4Q0A6XW0zdVkytY72xLYRsdYngBBw7jtSTflDWuBYBIFqH4I3r6M5UgrB1b00iqZkok7q");

export default function Payment() {
  const {
    state: { cart },
  } = CartState();
    
  let tsum = 0;

  cart.map((prod) => {
    tsum = tsum + Number(prod.price * prod.qty);
  });
  
  const items = { price : tsum };
  console.log(tsum)

console.log(items)
  const [clientSecret, setClientSecret] = useState("");
  
  useEffect(() => {
    
    // console.log(JSON.stringify({items}))
    // Create PaymentIntent as soon as the page loads
    fetch("https://pawsitivelypets-api.onrender.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( items ),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
