import { createSelector } from "reselect"

export function selectCollectionItems (state) {
    return state.collections.items
}

export function selectCollectionRoutes (state) {
    return selectCollectionItems(state).map(function getCollectionRouteName (collection) {
        return collection.routeName
    })
}

export function selectCollectionName (_, collectionName) {
    return collectionName
}

export var selectCollectionItemsPreview = createSelector(
    selectCollectionItems,
    function getCollectionItemsPreview (items) {
        return items.map(function mapCollectionsToCollectionsPreview (collection) {
            return {
                ...collection,
                items: collection.items.slice(0, 4)
            }
        })
    }
)

export function makeCollectionItemsByCategoryNameSelector () {
    return createSelector(
        selectCollectionItems,
        selectCollectionName,
        function getParticularCollectionItems (items, collectionName) {
            console.log('recalculate items by name', items, collectionName)
            var lowercasedCollectionName = collectionName.toLowerCase()
            console.log(items
                .find(function getCollection (collection) {
                    return collection.routeName == lowercasedCollectionName
                })
                .items)
            return items
                .find(function getCollection (collection) {
                    return collection.routeName == lowercasedCollectionName
                })
                .items
        }
    )
}