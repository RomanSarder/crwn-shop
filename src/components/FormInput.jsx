import React from 'react'
import styled, { css } from 'styled-components'

const shrinkedLabelStyles = css`
    top: -1.4rem;
    font-size: 1.2rem;
    color: black;
`

const StyledInputGroup = styled.div`
    position: relative;
    margin: 4.5rem 0;

`
const StyledLabel = styled.label`
    color: grey;
    font-size: 1.6rem;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 0.5rem;
    top: 1rem;
    transition: 300ms ease all;

    ${props => props.shrink && shrinkedLabelStyles}

`
const StyledInput = styled.input`
    background: none;
    background-color: white;
    color: grey;
    font-size: 1.8rem;
    padding: 1rem 1rem 1rem 0.5rem;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid grey;
    margin: 2.5rem 0;

    &:focus {
        outline: none
    }

    &:focus ~ ${StyledLabel} {
        ${shrinkedLabelStyles}
    }
` 

export default function FormInput({ handleChange, label, value, ...otherProps }) {
    return (
        <StyledInputGroup>
            {label && <StyledLabel htmlFor={label} shrink={value && value.length}>{label}</StyledLabel>}
            <StyledInput onChange={handleChange} value={value} {...otherProps} />
        </StyledInputGroup>
    )
}