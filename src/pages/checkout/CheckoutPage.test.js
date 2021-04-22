import { render, screen } from '@testing-library/react'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import CheckoutPage from './CheckoutPage'

var testCartItems = [
    {
        id: 2,
        name: 'test item 1',
        quantity: 1,
        price: 10,
        imageUrl: 'test image url'
    },
    {
        id: 3,
        name: 'test item 2',
        quantity: 3,
        price: 30,
        imageUrl: 'test image url'
    },
    {
        id: 4,
        name: 'test item 3',
        quantity: 1,
        price: 10,
        imageUrl: 'test image url'
    }
]

it('<CheckoutPage /> should render checkout items and total price', () => {
    var store = configureStore()({
        cart: {
            cartItems: testCartItems
        }
    })
    
    var { getByText, getAllByAltText, getAllByText, container } = render(
        <Provider store={store}>
            <CheckoutPage />
        </Provider>
    )
    expect(container).toMatchSnapshot()
    expect(getAllByText('test item', { exact: false }).length).toEqual(3)
    expect(getAllByAltText('test item', { exact: false }).length).toEqual(3)
    expect(getByText('Total: $110'))
})