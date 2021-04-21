import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { createMemoryHistory } from 'history'
import DirectoryContainer, { Directory } from './Directory'

jest.mock('../menu-item/MenuItem', () => () => (<div>Hello World</div>))

const testUrl = 'test-url'
var testSections = [
    {
        title: 'hats', 
        imageUrl: 'test-url-1', 
        id: 1, 
        size: 'large' 
    },
    {
        title: 'mens',
        imageUrl: 'test-url-2',
        id: 2,
    }
]

function renderDirectory () {
    var renderResult = render(
        <Directory sections={testSections} url={testUrl} />
    )

    return renderResult
}

function renderDirectoryContainer (store) {
    var history = createMemoryHistory()
    history.push(testUrl)

    var renderResult = render(
        <Router history={history}>
            <Provider store={store}>
                <DirectoryContainer />
            </Provider>
        </Router>
    )

    return renderResult
}

it('<Directory /> should properly render with mocked menu items', () => {
    var { container, getAllByText } = renderDirectory()

    expect(container.firstChild).toMatchSnapshot()
    expect(getAllByText('Hello World').length).toEqual(2)
})

it('<Directory /> should properly render with redux state', () => {
    var store = configureStore()({
        directory: {
            items: testSections
        }
    })

    var { container, getAllByText } = renderDirectoryContainer(store)
    expect(container.firstChild).toMatchSnapshot()
    expect(getAllByText('Hello World').length).toEqual(2)
})