import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router'

import { selectCollectionRoutes } from '../../store/collections/selectors'
import WithCollectionsLoading from '../../components/WithCollectionsLoading'
import Spinner from '../../components/spinner/Spinner'


var CollectionsList = lazy(() => import('../../components/collections-list/CollectionsList'))
var CollectionPage = lazy(() => import('../collection/CollectionPage'))

var StyledShopPage = styled.div``

export function ShopPage() {
    var collectionRoutes = useSelector(selectCollectionRoutes)
    const { path } = useRouteMatch();

    return (
        <StyledShopPage>
            <Suspense fallback={Spinner}>
                <Switch>
                    <Route path={path} exact component={CollectionsList} />
                    {
                        collectionRoutes.map(function mapRouteNameToRoute (routeName, index) {
                            return (
                                <Route path={`${path}/${routeName}`} key={routeName + index} exact>
                                    <CollectionPage collectionName={routeName} />
                                </Route>
                            )
                        })
                    }
                </Switch>
            </Suspense>
        </StyledShopPage>
    )
}

export default WithCollectionsLoading(ShopPage)
