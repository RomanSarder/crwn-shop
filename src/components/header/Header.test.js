import { render } from '@testing-library/react'
import 'jest-styled-components'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import configureStore from 'redux-mock-store'
import Header from './Header'
import { Provider } from 'react-redux'
import { AuthContext } from '../auth-provider/AuthProvider'
import userEvent from '@testing-library/user-event'

jest.mock('../cart-content/CartContent', () => () => (<div>Cart Content Mock</div>))
jest.mock('../cart-icon/CartIcon', () => () => (<div>Cart Icon Mock</div>))


var history = createMemoryHistory()
var signOutMock = jest.fn()

function renderHeader (store) {
    var renderResult = render(
        <Router history={history}>
            <Provider store={store}>
                <AuthContext.Provider value={{ signOut: signOutMock }}>
                    <Header />
                </AuthContext.Provider>
            </Provider>
        </Router>
    )

    return renderResult
}

it('<Header /> should display unauthenticated state', () => {
    var store = configureStore()({
        user: {
            currentUser: null
        },
        cart: {
            showCart: false
        }
    })

    var { container, getAllByRole, getByTestId } = renderHeader(store)

    expect(container.firstChild).toMatchSnapshot()
    var links = getAllByRole('link')
    expect(links.length).toEqual(4)
    expect(links[0]).toContainElement(getByTestId('logo-svg'))
    expect(links[0]).toHaveAttribute('href', '/')

    expect(links[1]).toHaveTextContent('Shop')
    expect(links[1]).toHaveAttribute('href', '/shop')
    expect(links[2]).toHaveTextContent('Contact')
    expect(links[2]).toHaveAttribute('href', '/contact')
    expect(links[3]).toHaveTextContent('Sign In')
    expect(links[3]).toHaveAttribute('href', '/auth')
})

it('<Header /> should display authenticated state', () => {
    const testDisplayName = 'Test User'
    var store = configureStore()({
        user: {
            currentUser: { displayName: testDisplayName }
        },
        cart: {
            showCart: true
        }
    })

    var { container, getAllByRole, getByRole, getByText } = renderHeader(store)
    expect(container.firstChild).toMatchSnapshot()
    var links = getAllByRole('link')
    expect(links.length).toEqual(3)
    expect(getByText('Test User')).toBeVisible()
    expect(getByRole('button')).toHaveTextContent('Sign Out')
    expect(getByText('Cart Icon Mock')).toBeVisible()
})

it('<Header /> have sign out button working', () => {
    const testDisplayName = 'Test User'
    var store = configureStore()({
        user: {
            currentUser: { displayName: testDisplayName }
        },
        cart: {
            showCart: false
        }
    })

    var { getByRole } = renderHeader(store)

    userEvent.click(getByRole('button'))

    expect(signOutMock).toHaveBeenCalledTimes(1)
})

it('<Header /> should show cart', () => {
    const testDisplayName = 'Test User'
    var store = configureStore()({
        user: {
            currentUser: { displayName: testDisplayName }
        },
        cart: {
            showCart: true
        }
    })

    var { getByText, container } = renderHeader(store)

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText('Cart Content Mock')).toBeVisible()
})