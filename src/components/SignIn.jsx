import React, { useContext, useState } from 'react'

import FormInput from './FormInput'
import Button from './Button'
import StyledAuthForm from './styled/AuthForm'
import { AuthContext } from './AuthProvider'

export default function SignIn() {
    var [form, setForm] = useState({
        password: '',
        email: ''
    })
    var { signInWithGoogle, signInWithEmailAndPassword } = useContext(AuthContext)

    const { password, email } = form

    async function handleFormSubmit (event) {
        event.preventDefault()

        try {
            await signInWithEmailAndPassword(email, password)
        } catch (error) {
            console.log(`Error while trying to sign in with email and password: ${error.message}`)
        }

        setForm({
            password: '',
            email: ''
        })
    }

    function handleFieldChange (event) {
        const { name, value } = event.target

        setForm(function updateState (prevState) {
            return { ...prevState, [name]: value }
        })
    }

    return (
        <StyledAuthForm>
            <h2 className="title">I already have an account</h2>
            <span>Sign In</span>
            <form onSubmit={handleFormSubmit}>
                <FormInput label="Email" name="email" type="email" value={email} handleChange={handleFieldChange} />
                <FormInput label="Password" name="password" type="password" value={password} handleChange={handleFieldChange} />
                
                <div className="buttons">
                    <Button type="submit">Sign In</Button>
                    <Button appearance="google" onClick={signInWithGoogle}>Sign In With Google</Button>
                </div>
            </form>
        </StyledAuthForm>
    )
}
