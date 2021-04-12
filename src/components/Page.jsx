import React from 'react'
import styled from 'styled-components'
import Header from './Header'

const StyledPage = styled.div`
    display: flex;
    padding: 0.5rem;
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
