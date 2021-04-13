import React from 'react'
import PreviewCollection from '../../components/PreviewCollection'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { selectCollectionItems } from '../../store/collections/selectors'

const StyledShopPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    .collections {
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }
`

export default function ShopPage() {
    var collections = useSelector(selectCollectionItems)

    return (
        <StyledShopPage>
            <div className="collections">
            {
                collections.map(function renderCollections({ id, title, items, routeName }) {
                    return (<PreviewCollection key={id} title={title} items={items} routeName={routeName} />)
                })
            }
            </div>
        </StyledShopPage>
    )
}
