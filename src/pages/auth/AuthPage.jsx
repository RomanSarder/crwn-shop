import React from 'react'
import styled from 'styled-components'
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'

const StyledAuthPage = styled.div`
    display: flex;
    justify-content: space-around;
`

export default function AuthPage() {
    return (
        <StyledAuthPage>
            <SignIn />
            <SignUp />
        </StyledAuthPage>
    )
}
