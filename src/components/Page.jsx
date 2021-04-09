import React from 'react'
import styled from 'styled-components'
import Header from './Header'

const StyledPage = styled.div`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 5rem;
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
