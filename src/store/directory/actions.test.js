import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './actions'
import { getDirectoryData as getDirectoryDataFromAPI } from '../../api/directory'

jest.mock('../../api/directory', () => {
    return {
        __esModule: true,
        default: 42,
        getDirectoryData: jest.fn()
      };
})

it('getDirectoryData should properly get items and dispatch actions', async () => {
    var testDirectoryData = {
        test: true
    }
    getDirectoryDataFromAPI.mockImplementation(async () => testDirectoryData)
    
    var store = configureStore([thunk])({
        directory: {
            isLoading: false,
            isFetching: false,
            items: []
        }
    })

    await store.dispatch(actions.getDirectoryData())

    var dispatchedActions = store.getActions()
    expect(dispatchedActions[0].type).toEqual(actions.getDirectoryData.pending().type)
    expect(dispatchedActions[1].type).toEqual(actions.directoryLoadingStarted().type)
    expect(dispatchedActions[2].type).toEqual(actions.setDirectoryData().type)
    expect(dispatchedActions[2].payload).toEqual(testDirectoryData)
    expect(dispatchedActions[3].type).toEqual(actions.directoryLoadingFinished().type)
    expect(dispatchedActions[4].type).toEqual(actions.getDirectoryData.fulfilled().type)
})

it('getDirectoryData should not perform fetching if directory is being fetched', async () => {
    var testDirectoryData = {
        test: true
    }
    getDirectoryDataFromAPI.mockImplementation(async () => testDirectoryData)
    
    var store = configureStore([thunk])({
        directory: {
            isLoading: false,
            isFetching: true,
            items: []
        }
    })

    await store.dispatch(actions.getDirectoryData())

    var dispatchedActions = store.getActions()

    expect(dispatchedActions.length).toEqual(0)
})