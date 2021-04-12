import React from 'react'
import styled from 'styled-components'

var StyledCartItem = styled.div`
    width: 100%;
    display: flex;
    min-height: 10rem;
    margin-bottom: 1.5rem;

    img {
        width: 25%;
        height: 95%;
        object-fit: cover;
    }

    .details {
        width: 70%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 1rem 2rem;
    }

    .subtotal {
        display: flex;
        align-items: center;
        
        span {
            font-size: 2.6rem;
            font-weight: bold;
        }
    }
`

export default function CartItem( { item: { id, price, imageUrl, name, quantity } } ) {
    return (
        <StyledCartItem>
            <img src={imageUrl} alt={name} />
            <div className="details">
                <span>{name}</span>
                <span>{quantity} * ${price}</span>
            </div>
            <div className="subtotal">
                <span>${quantity * price}</span>
            </div>
        </StyledCartItem>
    )
}
