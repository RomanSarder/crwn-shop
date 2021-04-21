import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import CheckoutForm from '../../components/checkout-form/CheckoutForm'
import CheckoutItem from '../../components/checkout-item/CheckoutItem'
import TotalPrice from '../../components/styled/TotalPrice'
import { selectCartItems, selectCartItemsTotalPrice } from '../../store/cart/selectors'

var StyledCheckoutPage = styled.div`
    width: 95%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5rem auto 0;

    @media (min-width: 992px) {
        width: 75%;
    }

    @media (min-width: 1200px) {
        width: 55%;
    }

    .total {
        margin-left: auto;
    }

    .header {
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid darkgrey;
    }
`

var StyledHeaderBlock = styled.div`
    text-transform: capitalize;
    width: 23%;
    text-align: center;

    &:last-child {
        width: 8%
    }
`

export default function CheckoutPage() {
    var cartItems = useSelector(selectCartItems)
    var totalPrice = useSelector(selectCartItemsTotalPrice)

    return (
        <StyledCheckoutPage>
            <div className="header">
                <StyledHeaderBlock>
                    <span>Product</span>
                </StyledHeaderBlock>
                <StyledHeaderBlock>
                    <span>Description</span>
                </StyledHeaderBlock>
                <StyledHeaderBlock>
                    <span>Quantity</span>
                </StyledHeaderBlock>
                <StyledHeaderBlock>
                    <span>Price</span>
                </StyledHeaderBlock>
                <StyledHeaderBlock>
                    <span>Remove</span>
                </StyledHeaderBlock>
            </div>

            {cartItems.map(function renderCheckoutItems (item) {
                return <CheckoutItem item={item} key={item.id} />
            })}

            <TotalPrice className="total">Total: ${totalPrice}</TotalPrice>
            <CheckoutForm />
        </StyledCheckoutPage>
    )
}
