import React from 'react'
import styled from 'styled-components'

import CollectionItem from './CollectionItem'

const StyledPreviewCollection = styled.div`
    display: flex;
    flex-direction: column;

    .title {
        font-weight: bold;
        font-size: 2.8rem;
        text-align: center;
        text-transform: capitalize;
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

export default function Collection({ title, items }) {
    return (
        <StyledPreviewCollection>
            <h2 className="title">{ title }</h2>
            <div className="preview">
                {
                    items
                    .map(function renderCollectionItems({ id, name, imageUrl, price }) {
                        return (
                            <CollectionItem key={id} id={id} name={name} imageUrl={imageUrl} price={price} />
                        )
                    })
                }
            </div>
        </StyledPreviewCollection>
    )
}
