import React from 'react'
import { useSelector } from 'react-redux'
import { makeCollectionItemsByCategoryNameSelector } from '../../store/collections/selectors'

import Collection from '../../components/Collection'

// Ensure that each instance will get its own selector 
var selectCollectionItemsByName = makeCollectionItemsByCategoryNameSelector()

export default function Collectionpage({ category }) {
    var items = useSelector((state) => {
        return selectCollectionItemsByName(state, category)
    })

    return (
        <div>
            <Collection items={items} title={category} />
        </div>
    )
}
