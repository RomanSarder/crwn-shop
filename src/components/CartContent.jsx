import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { selectCartDisplayState } from '../store/cart/selectors'

import Button from './Button'

var StyledCartContent = styled.div`
    position: absolute;
    ${props => props.show ? css`visibility: visible;` : css`visibility: hidden;`}
    width: 24rem;
    height: 34rem;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    border: 1px solid black;
    background-color: white;
    top: 8rem;
    right: 0;
    z-index: 5;

    .cart-items {
        height: 24rem;
        display: flex;
        flex-direction: column;
        overflow: scroll;
    }

    ${Button} {
        margin-top: auto;
    }
`

export default function CartContent() {
    const showCart = useSelector(selectCartDisplayState)

    return (
        <StyledCartContent show={showCart}>
            <div className="cart-items"></div>
            <Button>Checkout</Button>
        </StyledCartContent>
    )
}
