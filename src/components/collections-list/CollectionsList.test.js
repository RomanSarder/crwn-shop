import React from 'react'
import { render } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import CollectionsListContainer, { CollectionsList } from './CollectionsList'
import { Provider } from 'react-redux'

jest.mock('../collection/Collection', () => () => (<div>Hello World</div>))

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

function renderCollectionsList () {
    var renderResult = render(
        <CollectionsList collections={testCollections} />
    )

    return renderResult
}

function renderCollectionsListContainer (store) {
    var renderResult = render(
        <Provider store={store}>
            <CollectionsListContainer />
        </Provider>
    )

    return renderResult
}

it('<CollectionsList /> should render with mocked collections', () => {
    var { container, getAllByText } = renderCollectionsList()

    expect(container.firstChild).toMatchSnapshot()
    expect(getAllByText('Hello World').length).toEqual(2)
})

it('<CollectionsList />  should render with redux state', () => {
    var store = configureStore()({
        collections: {
            data: {
                [testCollections[0].name]: {
                    id: 1,
                    items: []
                },
                [testCollections[1].name]: {
                    id: 2,
                    items: []
                }
            }
        }
    })
    var { getAllByText, container } = renderCollectionsListContainer(store)
    expect(container.firstChild).toMatchSnapshot()
    expect(getAllByText('Hello World').length).toEqual(2)
})