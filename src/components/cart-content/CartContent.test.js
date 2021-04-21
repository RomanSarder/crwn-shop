import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import CardContentContainer, { CartContent } from './CartContent'
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';

jest.mock('../cart-item/CartItem', () => () => (<div>Hello World</div>))

const testCartItems = [
    {
        id: 1,
        imageUrl: 'test1',
        name: 'Test Item 1',
        price: 10,
        quantity: 1
    },
    {
        id: 2,
        imageUrl: 'test2',
        name: 'Test Item 2',
        price: 20,
        quantity: 2
    }
]

function renderCartComponent ({ onCheckoutMock = jest.fn(), total = 5,  ...otherProps} = {}) {
    var renderResult = render(<CartContent items={testCartItems} total={total} onCheckout={onCheckoutMock} {...otherProps}/>)

    return renderResult 
}

function renderCartContainer (storeInstance) {
    var renderResult = render(
        <Provider store={storeInstance}>
            <CardContentContainer />
        </Provider>
    )

    return renderResult
}

it('<CartContent /> should render proper cart content with mocked cart items', () => {
    var { container, getByText, getAllByText } = renderCartComponent()
    expect(container.firstChild).toMatchSnapshot()
    expect(getByText('Total: $5')).toBeVisible()
    expect(getAllByText('Hello World').length).toEqual(2)
})

it('<CartContent /> should have checkout button working', () => {
    var onCheckoutMock = jest.fn()

    var { getByText } = renderCartComponent({ onCheckoutMock })
    var button = getByText('Go To Checkout')
    userEvent.click(button)
    expect(onCheckoutMock).toHaveBeenCalledTimes(1)
})

it('<CartContent /> should render proper number of cart items', () => {
    var { getAllByText } = renderCartComponent()

    expect(getAllByText('Hello World').length).toEqual(2)
})

it('<CartContent /> should properly render with redux state', () => {
    var store = configureStore()({
        cart: {
            cartItems: testCartItems
        }
    })

    var { container, getAllByText, getByText } = renderCartContainer(store)
    expect(getAllByText('Hello World').length).toEqual(2)
    expect(getByText('Total: $50')).toBeVisible()
    expect(container.firstChild).toMatchSnapshot()
})