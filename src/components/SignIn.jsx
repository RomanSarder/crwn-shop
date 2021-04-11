import React, { useState } from 'react'
import styled from 'styled-components'

import FormInput from './FormInput'
import Button from './Button'

import { signInWithGoogle } from '../firebase/utils'

const StyledSignIn = styled.div`
    width: 30vw;
    display: flex;
    flex-direction: column;

    .title {
        font-size: 2.8rem;
        margin: 1rem 0;
    }

    span {
        font-size: 2rem;
    }
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
            <h2 className="title">I already have an account</h2>
            <span>Sign In</span>
            <form onSubmit={handleFormSubmit}>
                <FormInput label="Email" name="email" type="email" value={email} handleChange={handleEmailChange} />
                <FormInput label="Password" name="password" type="password" value={password} handleChange={handlePasswordChange} />

                <Button type="submit">Sign In</Button>
                <Button appearance="google" onClick={signInWithGoogle}>Sign In With Google</Button>
            </form>
        </StyledSignIn>
    )
}
