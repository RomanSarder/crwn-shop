import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addItemToCart } from '../../store/cart/actions'
import Button from '../button/Button'

var StyledPreviewCollectionItem = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    .add-to-cart-btn {
        position: absolute;
        visibility: hidden;
        opacity: 0.7;
        width: 80%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, 200%);
    }

    .add-to-cart-btn:hover {
        opacity: 1;
    }

    &:hover {
        .image-container {
            opacity: 0.8;
        }

        .add-to-cart-btn {
            visibility: visible;
        }
    }

    .image-container {
        background-image: ${props => `url(${props.imageUrl})`};
        background-size: cover;
        background-position: center;
        height: 38rem;
        width: 34rem;
    }

    .info {
        display: flex;
        justify-content: space-between;

        span {
            font-size: 2.2rem;
        }
    }
`

export function CollectionItem ({ price, name, imageUrl, onAddToCart }) {
    return (
        <StyledPreviewCollectionItem imageUrl={imageUrl}>
            <div className="image-container">
            </div>
            <div className="info">
                <span>{name}</span>
                <span>${price}</span>
            </div>
            <Button onClick={onAddToCart} className="add-to-cart-btn" appearance="inverse">Add To Cart</Button>
        </StyledPreviewCollectionItem>
    )
}

export default function CollectionItemContainer (props) {
    var dispatch = useDispatch()
    const { id, price, name, imageUrl } = props

    return <CollectionItem onAddToCart={() => dispatch(addItemToCart({ id, price, name, imageUrl }))} {...props}/>
}
