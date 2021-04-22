import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './actions'
import { getCollectionsWithItems } from '../../api/collections'

jest.mock('../../api/collections', () => {
    return {
        __esModule: true,
        default: 42,
        getCollectionsWithItems: jest.fn()
      };
})

it('getCollectionsData should properly get items and dispatch actions', async () => {
    var testCollectionsData = {
        test: true
    }
    getCollectionsWithItems.mockImplementation(async () => testCollectionsData)
    
    var store = configureStore([thunk])({
        collections: {
            isLoading: false,
            isFetching: false,
            data: {}
        }
    })

    await store.dispatch(actions.getCollectionsData())

    var dispatchedActions = store.getActions()

    expect(dispatchedActions[0].type).toEqual(actions.getCollectionsData.pending().type)
    expect(dispatchedActions[1].type).toEqual(actions.collectionLoadingStarted().type)
    expect(dispatchedActions[2].type).toEqual(actions.setCollectionsData().type)
    expect(dispatchedActions[2].payload).toEqual(testCollectionsData)
    expect(dispatchedActions[3].type).toEqual(actions.collectionLoadingFinished().type)
    expect(dispatchedActions[4].type).toEqual(actions.getCollectionsData.fulfilled().type)
})

it('getCollectionsData should not perform fetching if collections are already being fetched', async () => {
    var testCollectionsData = {
        test: true
    }
    getCollectionsWithItems.mockImplementation(async () => testCollectionsData)
    
    var store = configureStore([thunk])({
        collections: {
            isLoading: false,
            isFetching: true,
            data: {}
        }
    })

    await store.dispatch(actions.getCollectionsData())

    var dispatchedActions = store.getActions()

    expect(dispatchedActions.length).toEqual(0)
})