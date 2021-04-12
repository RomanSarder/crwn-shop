import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { removeItemFromCart } from '../store/cart/actions'
import PlainButtonWrapper from './styled/PlainButtonWrapper'

var StyledCheckoutItem = styled.div`
  width: 100%;
  display: flex;
  min-height: 10rem;
  border-bottom: 1px solid darkgrey;
  padding: 1.5rem 0;
  font-size: 2rem;
  align-items: center;

  .image-container {
    width: 23%;
    padding-right: 1.5rem;

    img {
      width: 100%;
      max-height: 100%;
    }
  }
  .name,
  .quantity,
  .price {
    width: 23%;
  }

  .quantity {
    padding-left: 2rem;
  }

  .remove-button {
    padding-left: 1.2rem;
    cursor: pointer;
  }

  ${PlainButtonWrapper} {
      font-size: 2.6rem;
  }
`

export default function CheckoutItem({ item: { name, quantity, price, imageUrl, id } }) {
    var dispatch = useDispatch()

    function removeItem () {
        dispatch(removeItemFromCart(id))
    }

    return (
        <StyledCheckoutItem>
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">{quantity}</span>
            <span className="price">{price}</span>
            <div className="remove-button">
                <PlainButtonWrapper onClick={removeItem}>&#10005;</PlainButtonWrapper>
            </div>
        </StyledCheckoutItem>
    )
}
