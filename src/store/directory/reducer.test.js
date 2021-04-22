import reducer from './reducer'
import * as actions from './actions'

it('Directory reducer should properly set directory data', () => {
    var testData = [{ test: true }]
    var resultState = reducer(undefined, actions.setDirectoryData(testData))

    expect(resultState.items).toEqual(testData)
})

it('Directory reducer should properly set/unset loading state', () => {
    var resultState = reducer(undefined, actions.directoryLoadingStarted())
    expect(resultState.isLoading).toEqual(true)
    resultState = reducer(resultState, actions.directoryLoadingFinished())
    expect(resultState.isLoading).toEqual(false)
})

it('Directory reducer should set properly set/unset fetching state when data is loading', () => {
    var resultState = reducer(undefined, actions.getDirectoryData.pending())
    expect(resultState.isFetching).toEqual(true)
    resultState = reducer(resultState, actions.directoryLoadingFinished())
    expect(resultState.isFetching).toEqual(false)
})