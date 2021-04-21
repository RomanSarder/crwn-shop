import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

import CollectionItem from '../collection-item/CollectionItem'

const StyledPreviewCollection = styled.div`
    display: flex;
    flex-direction: column;

    .title {
        font-weight: bold;
        font-size: 3.2rem;
        text-align: center;
        text-transform: capitalize;
        cursor: pointer;
        transition: color 0.5s ease-in-out;

        &:hover {
            color: darkgrey;
        }
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

export function handleCategoryClick (history, title) {
    return () => {
        history.push(`/shop/${title}`)
    }
}

export default function Collection({ title, items, onCategoryClick = handleCategoryClick }) {
    var history = useHistory()

    return (
        <StyledPreviewCollection>
            <h2 className="title" onClick={onCategoryClick(history, title)}>{ title }</h2>
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
