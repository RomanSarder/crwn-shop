import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import CheckoutItemContainer, { CheckoutItem } from './CheckoutItem'
import userEvent from '@testing-library/user-event'
import configureStore from 'redux-mock-store'
import { addItemToCart, decreaseItemQuantity, increaseItemQuantity, removeItemFromCart } from '../../store/cart/actions'
import { Provider } from 'react-redux'

var testCheckoutItem = {
    id: 2,
    name: 'test item',
    quantity: 2,
    price: 5,
    imageUrl: 'test image url'
}

function renderCheckoutItemComponent ({ remove = jest.fn(), decreaseQuantity = jest.fn(), increaseQuantity = jest.fn(), item = testCheckoutItem } = {}) {
    var renderResult = render(
        <CheckoutItem item={item} remove={remove} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} />
    )

    return renderResult
}

function renderCheckoutItemContainer (store) {
    var renderResult = render(
        <Provider store={store}>
            <CheckoutItemContainer item={testCheckoutItem} />
        </Provider>
    )

    return renderResult
}

it('should render checkout item properly', () => {
    var { container, getByAltText, getByText } = renderCheckoutItemComponent()

    expect(container.firstChild).toMatchSnapshot()
    expect(getByAltText(testCheckoutItem.name)).toBeVisible()
    expect(getByAltText(testCheckoutItem.name)).toHaveAttribute('src', testCheckoutItem.imageUrl)
    expect(getByText(testCheckoutItem.name)).toBeVisible()
    expect(getByText(testCheckoutItem.quantity)).toBeVisible()
    expect(getByText(testCheckoutItem.price)).toBeVisible()
})

it('should have working buttons', () => {
    var removeMock = jest.fn()
    var decreaseQuantityMock = jest.fn()
    var increaseQuantityMock = jest.fn()

    var { getByText } = renderCheckoutItemComponent({ 
        decreaseQuantity: decreaseQuantityMock,
        increaseQuantity: increaseQuantityMock,
        remove: removeMock
    })

    userEvent.click(getByText('❮'))
    expect(decreaseQuantityMock).toHaveBeenCalledTimes(1)
    userEvent.click(getByText('❯'))
    expect(increaseQuantityMock).toHaveBeenCalledTimes(1)
    userEvent.click(getByText('✕'))
    expect(removeMock).toHaveBeenCalledTimes(1)
})

it('should properly render with redux state', () => {
    var store = configureStore()({
        cart: {
            cartItems: testCheckoutItem
        }
    })

    store.dispatch(addItemToCart(testCheckoutItem))
    var { getByAltText, getByText, container } = renderCheckoutItemContainer(store)

    expect(container.firstChild).toMatchSnapshot()
    expect(getByAltText(testCheckoutItem.name)).toBeVisible()
    expect(getByAltText(testCheckoutItem.name)).toHaveAttribute('src', testCheckoutItem.imageUrl)
    expect(getByText(testCheckoutItem.name)).toBeVisible()
    expect(getByText(testCheckoutItem.quantity)).toBeVisible()
    expect(getByText(testCheckoutItem.price)).toBeVisible()    
})

it('should properly dispatch decrease item quantity action', () => {
    var store = configureStore()({
        cart: {
            cartItems: testCheckoutItem
        }
    })
    var { getByText } = renderCheckoutItemContainer(store)
    userEvent.click(getByText('❮'))
    expect(store.getActions()[0]).toEqual({
        type: decreaseItemQuantity().type,
        payload: { id: 2 }
    })
})

it('should properly dispatch increase item quantity action', () => {
    var store = configureStore()({
        cart: {
            cartItems: testCheckoutItem
        }
    })
    var { getByText } = renderCheckoutItemContainer(store)
    userEvent.click(getByText('❯'))
    expect(store.getActions()[0]).toEqual({
        type: increaseItemQuantity().type,
        payload: { id: 2 }
    })
})

it('should properly remove cart item', () => {
    var store = configureStore()({
        cart: {
            cartItems: testCheckoutItem
        }
    })
    var { getByText } = renderCheckoutItemContainer(store)
    userEvent.click(getByText('✕'))
    expect(store.getActions()[0]).toEqual({
        type: removeItemFromCart().type,
        payload: { id: 2 }
    })
})