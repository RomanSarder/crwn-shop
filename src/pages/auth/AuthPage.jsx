import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'

import { getUser } from '../../store/user/selectors'

const StyledAuthPage = styled.div`
    display: flex;
    justify-content: space-around;
`

export default function AuthPage() {
    var currentUser = useSelector(getUser)

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
