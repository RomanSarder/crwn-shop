import React from 'react'
import { useSelector } from 'react-redux'
import { selectItemsByCollectionName } from '../../store/collections/selectors'

import Collection from '../../components/Collection'


export default function CollectionPage({ collectionName }) {
    var items = useSelector((state) => {
        return selectItemsByCollectionName(state, collectionName)
    })

    return (
        <div>
            <Collection items={items} title={collectionName} />
        </div>
    )
}
