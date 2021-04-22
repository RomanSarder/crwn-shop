import React from 'react'
import styled from 'styled-components'
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Button from '../button/Button';

var StyledCheckoutForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 40rem;
    gap: 1rem;

    .card-field {
        padding: 1rem;
    }

    .test-warning {
        color: red;
        font-size: 3.2rem;
        text-align: center;
        margin: 2rem 0;
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
            <span className="test-warning">
                *Please use the following credit card for test payment*
                <br />
                4242 4242 4242 4242 - Exp: any future date
            </span>
            <div className="card-field">
                <CardElement options={CARD_OPTIONS} />
            </div>
            <Button type="submit">
                Check Out Now
            </Button>
        </StyledCheckoutForm>
    )
}

var ELEMENTS_OPTIONS = {
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
