import React from 'react'
import styled from 'styled-components'

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
      height: 100%;
      max-height: 16.5rem;
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
`

export default function CheckoutItem({ item: { name, quantity, price, imageUrl } }) {
    return (
        <StyledCheckoutItem>
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">{quantity}</span>
            <span className="price">{price}</span>
            <div className="remove-button">&#10005;</div>
        </StyledCheckoutItem>
    )
}
