import React, { useState } from 'react'
import StyledPage from '../../components/styled/Page'
import PreviewCollection from '../../components/PreviewCollection'
import { SHOP_DATA } from './data'
import styled from 'styled-components'

const StyledShopPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .collections {
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }
`

export default function ShopPage() {
    var [collections] = useState(SHOP_DATA)

    return (
        <StyledPage>
            <StyledShopPage>
                <h1 className="title">Collections</h1>
                <div className="collections">
                {
                    collections.map(function renderCollections({ id, title, items, routeName }) {
                        return (<PreviewCollection key={id} title={title} items={items} routeName={routeName} />)
                    })
                }
                </div>
            </StyledShopPage>
        </StyledPage>
    )
}
