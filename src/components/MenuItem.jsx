import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

const StyledMenuItemBackground = styled.div`
    height: 100%;
    width: 100%;
    z-index: -1;
    background-image: ${props => `url(${props.backgroundUrl})`};
    background-position: center;
    background-size: cover;
`

export const StyledMenuItem = styled.div`
    height: 24rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid black;
    margin: 0 0.75rem 1.5rem;
    overflow: hidden;

    &:hover {
        cursor: pointer;

        &>.content {
            opacity: 0.9;
        }

        ${StyledMenuItemBackground} {
            transform: scale(1.1);
            transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95)
        }
    }

    @media (min-width: 1200px) {
        height: ${props => props.size === 'large' ? '38rem' : '24rem'}
    }

    .content {
        display: flex;
        flex-direction: column;
        height: 12rem;
        width: 16rem;
        align-items: center;
        justify-content: center;
        border: 2px solid black;
        background-color: white;
        opacity: 0.7;
        position: absolute;
    }

    .title {
        font-weight: bold;
        margin-bottom: 0.4rem;
        font-size: 2.4rem;
        color: #4a4a4a;
    }

    .subtitle {
        font-size: 1.8rem;
    }

    .title, .subtitle {
        text-transform: uppercase;
    }
`

export default function MenuItem({ title, imageUrl, size, linkUrl }) {
    var history = useHistory()
    var { path } = useRouteMatch()

    return (
        <StyledMenuItem size={size} onClick={() => history.push(`${linkUrl}`)}>
            <StyledMenuItemBackground backgroundUrl={imageUrl} />
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </StyledMenuItem>
    )
}
