import React from 'react'
import { useSelector } from 'react-redux'
import { selectItemsByCollectionName } from '../../store/collections/selectors'

import Collection from '../../components/Collection'
import WithCollectionsLoading from '../../components/WithCollectionsLoading'

var CollectionWithLoading = WithCollectionsLoading(Collection)


export default function CollectionPage({ collectionName }) {
    var items = useSelector((state) => {
        return selectItemsByCollectionName(state, collectionName)
    })

    return (
        <div>
            <CollectionWithLoading items={items} title={collectionName} />
        </div>
    )
}
