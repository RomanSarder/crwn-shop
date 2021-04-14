import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectCollectionItemsPreview } from '../store/collections/selectors'
import Collection from './Collection'

var StyledCollections = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    .collections {
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }
`

export default function CollectionsList() {
    var collections = useSelector(selectCollectionItemsPreview)
    return (
        <StyledCollections>
            <div className="collections">
            {
                collections.map(function renderCollections({ id, name, items }) {
                    return (<Collection key={id} title={name} items={items}/>)
                })
            }
            </div>
        </StyledCollections>
    )
}