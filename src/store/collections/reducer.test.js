import reducer from './reducer'
import * as actions from './actions'

var testCollections = [
    {
        id: 1,
        name: 'test 1',
        items: []
    },
    {
        id: 2,
        name: 'test 2',
        items: []
    }
]

it('Collections reducer should properly set collections data', () => {
    var resultState = reducer(undefined, actions.setCollectionsData(testCollections))

    expect(resultState.data).toEqual(testCollections)
})

it('Collections reducer should properly set/unsed loading state', () => {
    var resultState = reducer(undefined, actions.collectionLoadingStarted())
    expect(resultState.isLoading).toEqual(true)
    resultState = reducer(resultState, actions.collectionLoadingFinished())
    expect(resultState.isLoading).toEqual(false)
})

it('Collections reducer should properly set fetching state if collections are being loaded', () => {
    var resultState = reducer(undefined, actions.getCollectionsData.pending())
    expect(resultState.isFetching).toEqual(true)
})