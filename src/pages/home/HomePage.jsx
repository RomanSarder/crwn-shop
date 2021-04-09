import React from 'react'
import styled from 'styled-components'

import Directory from '../../components/Directory'

const StyledHomePage = styled.div`
    padding: 2rem 8rem;
`


export default function HomePage() {
    return (
        <StyledHomePage>
            <Directory />
        </StyledHomePage>
    )
}
