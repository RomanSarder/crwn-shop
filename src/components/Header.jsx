import React, { useContext } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as Logo } from '../assets/images/crown.svg'
import { selectCartDisplayState } from '../store/cart/selectors'
import { selectUser } from '../store/user/selectors'
import { AuthContext } from './AuthProvider'
import CartContent from './CartContent'
import CartIcon from './CartIcon'

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 3.8rem;

    .logo {
        width: 4.2rem;
        height: 3.3rem;
    }

    .menu {
        display: flex;
        gap: 2rem;
        align-items: center;
    }

    a, span {
        text-decoration: none;
        color: black;
        font-size: 1.8rem;
        text-transform: uppercase;
        padding: 0;
        text-align: center;
    }

    .sign-out-btn {
        background: none;
        font-weight: normal;
        display: inline-flex;
        align-items: flex-start;

        span {
            margin-top: -0.1rem;
        }
    }

    @media (min-width: 576px) {
        height: 4.5rem;

        a, span {
            font-size: 2.2rem;
            text-align: left;
        } 
        .logo {
            height: 3.9rem;
            width: 5rem;
        }
        .menu {
            align-items: flex-start
        }
    }
`

export default function Header() {
    var { signOut } = useContext(AuthContext)
    var currentUser = useSelector(selectUser, shallowEqual)
    var showCart = useSelector(selectCartDisplayState)

    return (
        <StyledHeader>
            <div className="logo-container">
                <Link to="/">
                    <Logo className="logo" />
                </Link>
            </div>
            <div className="menu">
                <Link to="/shop">Shop</Link>
                <Link to="/contact">Contact</Link>
                { currentUser ?
                  <React.Fragment>
                      <span>{currentUser.displayName}</span>
                      <button className="sign-out-btn" onClick={() => signOut()}>
                          <span>Sign Out</span>
                      </button>
                      <CartIcon />
                  </React.Fragment> :
                  <Link to="/auth">Sign In</Link>   
                }
            </div>
            { showCart && <CartContent /> }
        </StyledHeader>
    )
}
