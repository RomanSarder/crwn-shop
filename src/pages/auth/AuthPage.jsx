import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import SignIn from '../../components/sign-in/SignIn'
import SignUp from '../../components/sign-up/SignUp'

import { selectUser } from '../../store/user/selectors'

const StyledAuthPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 1200px) {
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;
    }
`

export default function AuthPage() {
    var currentUser = useSelector(selectUser)

    if (currentUser) {
        return <Redirect to="/" />
    } else {
        return (
            <StyledAuthPage>
                <SignIn />
                <SignUp />
            </StyledAuthPage>
        )
    }
}
