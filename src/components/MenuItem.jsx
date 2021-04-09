import React from 'react'
import styled from 'styled-components'

export const StyledMenuItem = styled.div`
    min-width: 30%;
    height: 24rem;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 0 0.75rem 1.5rem;

    .content {
        height: 9rem;
        padding: 0 2.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid black;
    }

    .title {
        font-weight: bold;
        margin-bottom: 0.6rem;
        font-size: 2.2rem;
        color: #4a4a4a;
    }
`

export default function MenuItem({ title }) {

    return (
        <StyledMenuItem>
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </StyledMenuItem>
    )
}
