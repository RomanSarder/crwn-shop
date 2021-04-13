import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { selectCollectionItems } from '../store/collections/selectors'
import PreviewCollection from './PreviewCollection'

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

export default function Collections() {
    var collections = useSelector(selectCollectionItems)
    return (
        <StyledCollections>
            <div className="collections">
            {
                collections.map(function renderCollections({ id, title, items, routeName }) {
                    return (<PreviewCollection key={id} title={title} items={items} routeName={routeName} />)
                })
            }
            </div>
        </StyledCollections>
    )
}
