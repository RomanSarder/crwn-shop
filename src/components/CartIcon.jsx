import React from 'react'
import styled from 'styled-components'
import { ReactComponent as ShoppingIcon } from '../assets/images/shopping-bag.svg'

var StyledCartIcon = styled.div`
    width: 4.5rem;
    height: 4.5rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .shopping-icon {
        width: 2.4rem;
        height: 2.4rem;
    }

    .item-count {
        position: absolute;
        font-size: 1rem;
        font-weight: bold;
        bottom: 1.2rem;
    }
`

export default function CartIcon() {
    return (
        <StyledCartIcon>
            <ShoppingIcon className="shopping-icon" />
            <span className="shopping-count">0</span>
        </StyledCartIcon>
    )
}
