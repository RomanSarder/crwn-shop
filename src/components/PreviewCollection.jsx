import React from 'react'
import styled from 'styled-components'

import PreviewCollectionItem from './PreviewCollectionItem'

const StyledPreviewCollection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
        font-weight: normal;
    }

    .preview {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 3rem;

        & > * {
            flex-basis: 34rem;
        }
    }
`

export default function PreviewCollection({ title, items }) {
    return (
        <StyledPreviewCollection>
            <h1 className="title">{ title }</h1>
            <div className="preview">
                {
                    items
                    .filter( function filterFirstFour(_, index) {
                        return index < 4
                    })
                    .map(function renderCollectionItems({ id, name, imageUrl, price }) {
                        return (
                            <PreviewCollectionItem key={id} name={name} imageUrl={imageUrl} price={price} />
                        )
                    })
                }
            </div>
        </StyledPreviewCollection>
    )
}
