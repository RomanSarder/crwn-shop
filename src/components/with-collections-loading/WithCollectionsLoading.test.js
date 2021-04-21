import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import WithCollectionsLoading from './WithCollectionsLoading'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { getCollectionsData } from '../../store/collections/actions'

jest.mock('../../store/collections/actions', () => {
    return {
        __esModule: true,
        default: 42,
        getCollectionsData: jest.fn()
      };
})

function TestComponent () {
    return (
        <h1>Test component</h1>
    )
}

var TestComponentWithCollectionsLoading = WithCollectionsLoading(TestComponent)

function renderWithCollections (store) {
    var renderResult = render(
        <Provider store={store}>
            <TestComponentWithCollectionsLoading />
        </Provider>
    )

    return renderResult
}

it('<WithCollectionsLoading /> should load collections and display component if not loading', () => {
    getCollectionsData.mockImplementation(() => {
        return {
            type: 'TEST_ACTION'
        }
    })
    var store = configureStore()({
        collections: {
            isLoading: false,
        }
    })
    var { getByText } = renderWithCollections(store)
    expect(store.getActions()[0]).toEqual({
        type: 'TEST_ACTION'
    })
    expect(getCollectionsData).toHaveBeenCalledTimes(1)
    expect(getByText('Test component')).toBeVisible()
})

it('<WithCollectionsLoading /> should load collections and not display component if loading', () => {
    getCollectionsData.mockImplementation(() => {
        return {
            type: 'TEST_ACTION'
        }
    })
    var store = configureStore()({
        collections: {
            isLoading: true,
        }
    })
    var { queryByText } = renderWithCollections(store)
    expect(store.getActions()[0]).toEqual({
        type: 'TEST_ACTION'
    })
    expect(getCollectionsData).toHaveBeenCalledTimes(1)
    expect(queryByText('Test component')).toBeFalsy()
})