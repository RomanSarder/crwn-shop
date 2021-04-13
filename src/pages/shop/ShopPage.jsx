import React from 'react'
import styled from 'styled-components'
import { Route, Switch, useRouteMatch } from 'react-router'
import CollectionsList from '../../components/CollectionsList'
import { useSelector } from 'react-redux'
import { selectCollectionRoutes } from '../../store/collections/selectors'
import CollectionPage from '../collection/CollectionPage'

const StyledShopPage = styled.div`
`

export default function ShopPage() {
    var collectionRoutes = useSelector(selectCollectionRoutes)
    const { path } = useRouteMatch();

    return (
        <StyledShopPage>
            <Switch>
                <Route path={path} exact component={CollectionsList} />
                {
                    collectionRoutes.map(function mapRouteNameToRoute (routeName, index) {
                        return (
                            <Route path={`${path}/${routeName}`} key={routeName + index} exact>
                                <CollectionPage category={routeName} />
                            </Route>
                        )
                    })
                }
            </Switch>
        </StyledShopPage>
    )
}
