import React from 'react'
import styled, { css } from 'styled-components'

var GoogleButtonStyles = css`
    background-color: #4285f4;
    color: white;

    &:hover {
        background: #357ae8;
        border: none;
        color: white;
    }
`

const StyledButton = styled.button`
    min-width: 16.5rem;
    width: auto;
    height: 5rem;
    letter-spacing: 0.5px;
    line-height: 5rem;
    padding: 0 3.5rem 0 3.5rem;
    font-size: 1.5rem;
    background-color: black;
    color: white;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    cursor: pointer;
    border: none;

    

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    ${props => {
        switch (props.appearance) {
            case 'google': {
                return GoogleButtonStyles
            }
            default: return ''
        }
    }}
`

export default function Button({ children, ...otherProps }) {
    return (
        <StyledButton {...otherProps}>
            {children}
        </StyledButton>
    )
}
