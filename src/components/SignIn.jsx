import React, { useState } from 'react'
import styled from 'styled-components'
import FormInput from './FormInput'

const StyledSignIn = styled.div`
    width: 30vw;
`

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
                <FormInput label="Email" name="email" type="email" value={email} handleChange={handleEmailChange} />
                <FormInput label="Password" name="password" type="password" value={password} handleChange={handlePasswordChange} />

                <input type="submit" value="Submit"/>
            </form>
        </StyledSignIn>
    )
}
