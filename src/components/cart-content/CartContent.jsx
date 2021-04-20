import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { toggleCart } from '../../store/cart/actions'
import { selectCartItems, selectCartItemsTotalPrice } from '../../store/cart/selectors'

import Button from '../button/Button'
import CartItem from '../CartItem'
import TotalPrice from '../styled/TotalPrice'

var StyledCartContent = styled.div`
    position: absolute;
    display: flex;
    width: 36rem;
    height: 24rem;
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

function _renderCartItems (items) {
    return items.map(function mapCartItemsToComponents (item) {
        return <CartItem key={item.id} item={item} />
    })
}

export default function CartContentContainer () {
    var cartItems = useSelector(selectCartItems)
    var totalPrice = useSelector(selectCartItemsTotalPrice)
    var history = useHistory()
    var dispatch = useDispatch()

    function checkout () {
        history.push('/checkout')
        dispatch(toggleCart())
    }

    return <CartContent onCheckout={checkout} total={totalPrice} items={cartItems} />
}

export function CartContent({ onCheckout, total, items, renderCartItems = _renderCartItems }) {
    return (
        <StyledCartContent>
            <div className="cart-items">
                { items.length ? 
                    renderCartItems(items) :
                    <span className="empty-message">Your cart is empty</span> }
            </div>
            <TotalPrice className="total">Total: ${total}</TotalPrice>
            <Button onClick={onCheckout} className="checkout-btn">
                Go To Checkout
            </Button>
        </StyledCartContent>
    )
}
