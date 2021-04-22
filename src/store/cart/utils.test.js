import * as utils from './utils'

var testState = {
    cartItems: [
        {
            id: 2,
            name: 'test item',
            price: 5,
            quantity: 1,
            imageUrl: 'test image url'
        },
        {
            id: 3,
            name: 'test item 2',
            price: 10,
            quantity: 2,
            imageUrl: 'test image url2'
        }
    ]
}

it('getCartItemId should return correct cart item with index', () => {
    expect(utils.getCartItemById(testState, 2)).toEqual({
        item: testState.cartItems[0],
        index: 0
    })
})

it('removeCartItem should properly filter out item by id from items array', () => {
    expect(utils.removeCartItem(testState, 2)).toEqual([testState.cartItems[1]])
})