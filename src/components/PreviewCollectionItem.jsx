import React from 'react'
import styled from 'styled-components'

const StyledPreviewCollectionItem = styled.div`
    display: flex;
    flex-direction: column;

    .image-container {
        background-image: ${props => `url(${props.imageUrl})`};
        background-size: cover;
        background-position: center;
        height: 38rem;
        width: 34rem;
    }

    .info {
        display: flex;
        justify-content: space-between;

        span {
            font-size: 2.2rem;
        }
    }
`

export default function PreviewCollectionItem({ price, name, imageUrl }) {
    return (
        <StyledPreviewCollectionItem imageUrl={imageUrl}>
            <div className="image-container">
            </div>
            <div className="info">
                <span>{name}</span>
                <span>${price}</span>
            </div>
        </StyledPreviewCollectionItem>
    )
}
