import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { toggleCart } from '../store/cart/actions'
import { selectCartDisplayState, selectCartItems, selectCartItemsTotalPrice } from '../store/cart/selectors'

import Button from './Button'
import CartItem from './CartItem'
import TotalPrice from './styled/TotalPrice'

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

    .empty-message {
        font-size: 2.2rem;
        margin: 5rem auto;
        font-weight: bold;
    }

    .total {
        margin-left: auto;
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

function renderCartItems (items) {
    return items.map(function mapCartItemsToComponents (item) {
        return <CartItem key={item.id} item={item} />
    })
}

export default function CartContent() {
    const showCart = useSelector(selectCartDisplayState)
    var cartItems = useSelector(selectCartItems)
    var totalPrice = useSelector(selectCartItemsTotalPrice)
    var history = useHistory()
    var dispatch = useDispatch()

    function checkout () {
        history.push('/checkout')
        dispatch(toggleCart())
    }

    return (
        <StyledCartContent show={showCart}>
            <div className="cart-items">
                { cartItems.length ? 
                    renderCartItems(cartItems) :
                    <span className="empty-message">Your cart is empty</span> }
            </div>
            <TotalPrice className="total">Total: ${totalPrice}</TotalPrice>
            <Button onClick={checkout} className="checkout-btn">
                Go To Checkout
            </Button>
        </StyledCartContent>
    )
}
