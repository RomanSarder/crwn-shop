import React from 'react'
import styled from 'styled-components'

import PreviewCollectionItem from './PreviewCollectionItem'

const StyledPreviewCollection = styled.div`
    display: flex;
    flex-direction: column;

    .title {
        font-weight: bold;
        font-size: 2.8rem;
        text-align: center;
    }

    .preview {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 3rem;

        & > * {
            flex-basis: 34rem;
        }
    }
`

export default function PreviewCollection({ title, items }) {
    return (
        <StyledPreviewCollection>
            <h2 className="title">{ title }</h2>
            <div className="preview">
                {
                    items
                    .filter( function filterFirstFour(_, index) {
                        return index < 4
                    })
                    .map(function renderCollectionItems({ id, name, imageUrl, price }) {
                        return (
                            <PreviewCollectionItem key={id} id={id} name={name} imageUrl={imageUrl} price={price} />
                        )
                    })
                }
            </div>
        </StyledPreviewCollection>
    )
}
