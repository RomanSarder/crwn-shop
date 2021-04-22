import reducer from './reducer'
import { addItemToCart, decreaseItemQuantity, increaseItemQuantity, removeItemFromCart, toggleCart } from './actions'

it('Cart reducer should toggle cart', () => {
    var resultState = reducer(undefined, toggleCart())

    expect(resultState.showCart).toEqual(true)

    resultState = reducer(resultState, toggleCart())

    expect(resultState.showCart).toEqual(false)
})

it('Cart reducer should add item to cart', () => {
    var testCartItem = {
        id: 2,
        name: 'test item',
        price: 5,
        imageUrl: 'test image url'
    }

    var resultState = reducer(undefined, addItemToCart(testCartItem))

    expect(resultState.cartItems).toContainEqual({
        ...testCartItem,
        quantity: 1
    })
})

it('Cart reducer should remove item from cart', () => {
    var testCartItem = {
        id: 2,
        name: 'test item',
        price: 5,
        quantity: 1,
        imageUrl: 'test image url'
    }

    var resultState = reducer({
        cartItems: [ testCartItem ]
    }, removeItemFromCart({ id: testCartItem.id }))

    expect(resultState.cartItems.filter(el => el.id === testCartItem.id).length).toEqual(0)
})

it('Cart reducer should increase and decrease item quantity', () => {
    var testCartItem = {
        id: 2,
        name: 'test item',
        price: 5,
        quantity: 1,
        imageUrl: 'test image url'
    }

    var resultState = reducer({
        cartItems: [ testCartItem ]
    }, increaseItemQuantity({ id: testCartItem.id }))

    expect(resultState.cartItems).toContainEqual({
        ...testCartItem,
        quantity: 2
    })

    resultState = reducer(resultState, decreaseItemQuantity({ id: testCartItem.id }))

    expect(resultState.cartItems).toContainEqual(testCartItem)

    resultState = reducer(resultState, decreaseItemQuantity({ id: testCartItem.id }))

    expect(resultState.cartItems.filter(el => el.id === testCartItem.id).length).toEqual(0)
})