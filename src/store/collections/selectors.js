import { createSelector } from "reselect"

export function selectCollectionItems (state) {
    return state.collections
}

export var selectCollectionRoutes = createSelector(
    selectCollectionItems,
    function getCollectionsRouteNames (collectionsObject) {
        return Object.keys(collectionsObject).map(function getCollectionRouteName (key) {
            return key
        }) || []
    }
)

export function selectCollectionName (_, collectionName) {
    return collectionName
}

export var selectCollectionItemsPreview = createSelector(
    selectCollectionItems,
    function getCollectionItemsPreview (collectionsObject) {

        return Object.keys(collectionsObject).map(function mapCollectionsToCollectionsPreview (key) {
            return {
                ...collectionsObject[key],
                title: key,
                items: collectionsObject[key].items.slice(0, 4)
            }
        }) || []
    }
)

export function selectItemsByCollectionName (state, collectionName) {
    return selectCollectionItems(state)?.[collectionName].items || []
}