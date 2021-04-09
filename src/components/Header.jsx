import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as Logo } from '../assets/images/crown.svg'

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;

    .menu {
        display: flex;
        gap: 2rem;
    }

    a {
        text-decoration: none;
        color: black;
        font-size: 2.2rem;
        text-transform: uppercase;
    }
`

export default function Header() {
    return (
        <StyledHeader>
            <div className="logo-container">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            <div className="menu">
                <Link to="/shop">Shop</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </StyledHeader>
    )
}
