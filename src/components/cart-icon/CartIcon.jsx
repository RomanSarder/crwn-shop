import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ReactComponent as ShoppingIcon } from '../../assets/images/shopping-bag.svg'
import { toggleCart } from '../../store/cart/actions'
import { selectCartItemsTotalQuantity } from '../../store/cart/selectors'

var StyledCartIcon = styled.div`
    width: 4.5rem;
    height: 4.5rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .shopping-icon {
        width: 3rem;
        height: 3rem;
    }

    .item-count {
        position: absolute;
        font-size: 1.2rem;
        font-weight: bold;
        bottom: 1.8rem;
        top: 50%;
        transform: translateY(-65%)
    }

    @media (min-width: 576px) {
        width: 4.5rem;
        height: 4.5rem;
        align-items: flex-start;
        
        .item-count {
            top: auto;
            transform: none;
        }
    }
`

export default function CartIcon() {
    var dispatch = useDispatch()
    var cartItemsCount = useSelector(selectCartItemsTotalQuantity)

    return (
        <StyledCartIcon onClick={() => dispatch(toggleCart())}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartItemsCount}</span>
        </StyledCartIcon>
    )
}
