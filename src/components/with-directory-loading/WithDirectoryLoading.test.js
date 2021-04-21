import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import WithDirectoryLoading from './WithDirectoryLoading'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { getDirectoryData } from '../../store/directory/actions'

jest.mock('../../store/directory/actions', () => {
    return {
        __esModule: true,
        default: 42,
        getDirectoryData: jest.fn()
      };
})


function TestComponent () {
    return (
        <h1>Test component</h1>
    )
}

var TestComponentWithDirectoryLoading = WithDirectoryLoading(TestComponent)

function renderWithDirectory (store) {
    var renderResult = render(
        <Provider store={store}>
            <TestComponentWithDirectoryLoading />
        </Provider>
    )

    return renderResult
}

it('<WithDirectoryLoading /> should load directory data and display component if not loading', () => {
    getDirectoryData.mockImplementation(() => {
        return {
            type: 'TEST_ACTION'
        }
    })
    var store = configureStore()({
        directory: {
            isLoading: false,
        }
    })
    var { getByText } = renderWithDirectory(store)
    expect(store.getActions()[0]).toEqual({
        type: 'TEST_ACTION'
    })
    expect(getDirectoryData).toHaveBeenCalledTimes(1)
    expect(getByText('Test component')).toBeVisible()
})

it('<WithDirectoryLoading /> should load directory data and not display component if loading', () => {
    getDirectoryData.mockImplementation(() => {
        return {
            type: 'TEST_ACTION'
        }
    })
    var store = configureStore()({
        directory: {
            isLoading: true,
        }
    })
    var { queryByText } = renderWithDirectory(store)
    expect(store.getActions()[0]).toEqual({
        type: 'TEST_ACTION'
    })
    expect(getDirectoryData).toHaveBeenCalledTimes(1)
    expect(queryByText('Test component')).toBeFalsy()
})