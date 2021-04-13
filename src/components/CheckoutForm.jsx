import React from 'react'
import styled from 'styled-components'
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Button from './Button';

var StyledCheckoutForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 40rem;

    .card-field {
        padding: 1rem;
    }
`

var CARD_OPTIONS = {
    iconStyle: "solid"
}

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
var stripePromise = loadStripe(
'pk_test_51IIfTLFa4rmPXVBIz0eoA0ossKfDSpCUhRWzDCxg85Gp9nmyuXJm6tFe7xX3T3gvfLMh7YfgRHZqgsdiG58UDeuM00Yi8kLu0C'
);


function CheckoutForm() {
    var stripe = useStripe()
    var elements = useElements()

    async function handleSubmit (event) {
        event.preventDefault()

        var { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })

        console.log(paymentMethod, error)
    }

    return (
        <StyledCheckoutForm onSubmit={handleSubmit}>
            <div className="card-field">
                <CardElement options={CARD_OPTIONS} />
            </div>
            <Button type="submit">
                Check Out Now
            </Button>
        </StyledCheckoutForm>
    )
}

const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css2?family=Open+Sans+Condensed"
      }
    ]
  };

export default function Checkout () {
    return (
        <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
            <CheckoutForm/>
        </Elements>
    )
}
