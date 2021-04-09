import React, { useState } from 'react'
import styled from 'styled-components'

const StyledSignIn = styled.div``

export default function SignIn() {
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    function handleFormSubmit (event) {
        event.preventDefault()

        setEmail('')
        setPassword('')
    }

    function handleEmailChange (event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange (event) {
        setPassword(event.target.value)
    }

    return (
        <StyledSignIn>
            <h2>I already have an account</h2>
            <span>Sign In</span>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email</label>
                <input onChange={handleEmailChange} name="email" value={email} type="email" required/>

                <label htmlFor="password">Password</label>
                <input onChange={handlePasswordChange} name="password" value={password} type="password" required/>

                <input type="submit" value="Submit"/>
            </form>
        </StyledSignIn>
    )
}
