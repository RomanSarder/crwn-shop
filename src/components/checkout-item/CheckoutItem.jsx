import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from '../../store/cart/actions'
import PlainButtonWrapper from '../styled/PlainButtonWrapper'

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
    text-align: center;
  }

  .quantity {
      display: flex;
      justify-content: center;
      align-items: center;

      ${PlainButtonWrapper} {
          font-size: 1.6rem;
          align-items: flex-start;
      }
  }

  .remove-button {
    padding-left: 1.2rem;
    cursor: pointer;
  }

  ${PlainButtonWrapper} {
      font-size: 2.6rem;
  }
`

export default function CheckoutItemContainer ({ item }) {
    var dispatch = useDispatch()
    const { id } = item

    function removeItem () {
        dispatch(removeItemFromCart({ id }))
    }

    function decreaseQuantity () {
        dispatch(decreaseItemQuantity({ id }))
    }

    function increaseQuantity () {
        dispatch(increaseItemQuantity({ id }))
    }

    return <CheckoutItem item={item} remove={removeItem} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} />
}

export function CheckoutItem({ item: { name, quantity, price, imageUrl }, remove, decreaseQuantity, increaseQuantity }) {
    return (
        <StyledCheckoutItem>
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <div className="quantity">
                <PlainButtonWrapper onClick={decreaseQuantity}>
                    <span>&#10094;</span>
                </PlainButtonWrapper>
                <span className="value">{quantity}</span>
                <PlainButtonWrapper onClick={increaseQuantity}>
                    <span>&#10095;</span>
                </PlainButtonWrapper>
            </div>
            <span className="price">{price}</span>
            <div className="remove-button">
                <PlainButtonWrapper onClick={remove}>&#10005;</PlainButtonWrapper>
            </div>
        </StyledCheckoutItem>
    )
}
