import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import CardContentContainer, { CartContent } from './CartContent'
import userEvent from '@testing-library/user-event';
import { createStoreInstance } from '../../store';
import { addItemToCart } from '../../store/cart/actions';
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

it('should render proper cart content with mocked cart items', () => {
    var { container } = renderCartComponent()
    expect(container.firstChild).toMatchSnapshot()
})

it('should have checkout button working', () => {
    var onCheckoutMock = jest.fn()

    var { getByText } = renderCartComponent({ onCheckoutMock })
    var button = getByText('Go To Checkout')
    userEvent.click(button)
    expect(onCheckoutMock).toHaveBeenCalledTimes(1)
})

it('should render proper number of cart items', () => {
    var { getAllByText } = renderCartComponent()

    expect(getAllByText('Hello World').length).toEqual(2)
})

it('should properly render with redux state', () => {
    var store = createStoreInstance()
    store.dispatch(addItemToCart(testCartItems[0]))
    store.dispatch(addItemToCart(testCartItems[1]))

    var { container, getAllByText, getByText } = renderCartContainer(store)
    expect(getAllByText('Hello World').length).toEqual(2)
    expect(getByText('Total: $30')).toBeVisible()
    expect(container.firstChild).toMatchSnapshot()
})