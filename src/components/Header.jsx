import React, { useContext } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as Logo } from '../assets/images/crown.svg'
import { getUser } from '../store/user/selectors'
import { AuthContext } from './AuthProvider'
import CartIcon from './CartIcon'

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;

    .menu {
        display: flex;
        gap: 2rem;
    }

    a, span {
        text-decoration: none;
        color: black;
        font-size: 2.2rem;
        text-transform: uppercase;
        padding: 0;
    }

    button {
        background: none;
        font-weight: normal;
        display: inline-flex;
        align-items: flex-start;

        span {
            margin-top: -0.1rem;
        }
    }
`

export default function Header() {
    var { signOut } = useContext(AuthContext)
    var currentUser = useSelector(getUser, shallowEqual)

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
                { currentUser ?
                  <React.Fragment>
                      <span>{currentUser.displayName}</span>
                      <button onClick={() => signOut()}>
                          <span>Sign Out</span>
                      </button>
                      <CartIcon />
                  </React.Fragment> :
                  <Link to="/auth">Sign In</Link>   
                }
            </div>
        </StyledHeader>
    )
}
