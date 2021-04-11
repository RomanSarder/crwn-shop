import React, { useContext, useState } from 'react'

import FormInput from './FormInput'
import Button from './Button'
import StyledAuthForm from './styled/AuthForm'
import { AuthContext } from './AuthProvider'

export default function SignUp() {
    const [form, setForm] = useState({
        password: '',
        displayName: '',
        email: '',
        confirmPassword: ''
    })
    var { makeSignUpFunction } = useContext(AuthContext)
    const { password, displayName, email, confirmPassword } = form

    function handleFieldChange (event) {
        const { value, name } = event.target

        setForm(function updateState(previousState) {
            return { ...previousState, [name]: value }
        })

    }

    async function handleFormSubmit (event) {
        event.preventDefault()
        var signUpWithEmailAndPassword = makeSignUpFunction({ displayName })

        if (password !== confirmPassword) {
            alert('Passwords does not match!')
            return
        }

        try {
            await signUpWithEmailAndPassword(email, password)
        } catch (error) {
            console.log(`Error while trying to sign up user: ${error}`)
        }
    }

    return (
        <StyledAuthForm>
            <h2 className="title">Register new account</h2>
            <span>Sign Up</span>
            <form onSubmit={handleFormSubmit}>
                <FormInput label="Name" name="displayName" type="text" value={displayName} handleChange={handleFieldChange} />
                <FormInput label="Email" name="email" type="email" value={email} handleChange={handleFieldChange} />
                <FormInput label="Password" name="password" type="password" value={password} handleChange={handleFieldChange} />
                <FormInput label="Password" name="confirmPassword" type="password" value={confirmPassword} handleChange={handleFieldChange} />
                
                <Button type="submit">Sign Up</Button>
            </form>
        </StyledAuthForm>
    )
}
