import React from 'react'
import styled from 'styled-components'
import Header from '../header/Header'

const StyledPage = styled.div`
    display: flex;
    padding: 0.2rem;
    flex-direction: column;
    gap: 5rem;

    @media (min-width: 576px) {
        padding: 2rem;
    }
`

export default function Page({ children }) {
    return (
        <StyledPage>
            <Header />
            <div>
                {children}
            </div>
        </StyledPage>
    )
}
