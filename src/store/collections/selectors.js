import { createSelector } from "reselect"

export function selectCollectionData (state) {
    return state.collections.data
}

export var selectCollectionRoutes = createSelector(
    selectCollectionData,
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
    selectCollectionData,
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
    return selectCollectionData(state)?.[collectionName].items || []
}