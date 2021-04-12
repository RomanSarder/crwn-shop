import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { selectCartDisplayState, selectCartItems } from '../store/cart/selectors'

import Button from './Button'
import CartItem from './CartItem'

var StyledCartContent = styled.div`
    position: absolute;
    ${props => props.show ? css`visibility: visible;` : css`visibility: hidden;`}
    width: 36rem;
    height: 24rem;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    border: 1px solid black;
    background-color: white;
    top: 8rem;
    right: 0;
    z-index: 5;

    .cart-items {
        height: 85%;
        display: flex;
        flex-direction: column;
        overflow: scroll;
    }

    .checkout-btn {
        margin-top: auto;
    }

    @media (min-width: 768px) {
        height: 34rem;
        width: 42rem;
    }

    @media (min-width: 992px) { 
        width: 48rem;
        height: 38rem;
    }
`

export default function CartContent() {
    const showCart = useSelector(selectCartDisplayState)
    const cartItems = useSelector(selectCartItems)

    return (
        <StyledCartContent show={showCart}>
            <div className="cart-items">
                { cartItems.map(function renderCartItems (item) {
                   return <CartItem key={item.id} item={item} /> 
                }) }
            </div>
            <Button className="checkout-btn">Checkout</Button>
        </StyledCartContent>
    )
}
