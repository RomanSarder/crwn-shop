import React from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router'
import Collections from '../../components/Collections'

const StyledShopPage = styled.div`
`

export default function ShopPage() {

    return (
        <StyledShopPage>
            <Switch>
                <Route path="/shop" exact component={Collections} />
            </Switch>
        </StyledShopPage>
    )
}
