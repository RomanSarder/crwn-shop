import * as selectors from './selectors'

var testState = {
    cart: {
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
}

it('selectCartItemsTotalQuantity selector should properly return total quantity of items in cart', () => {
    var selectorResult = selectors.selectCartItemsTotalQuantity(testState)

    expect(selectorResult).toEqual(3)

    selectorResult = selectors.selectCartItemsTotalQuantity({
        ...testState,
        testProperty: true
    })

    expect(selectors.selectCartItemsTotalQuantity.recomputations()).toEqual(1)

    selectorResult = selectors.selectCartItemsTotalQuantity({
        cart: {
            cartItems: []
        }
    })

    expect(selectorResult).toEqual(0)
})

it('selectCartItemsTotalPrice selector should properly return total price of the cart', () => {
    var selectorResult = selectors.selectCartItemsTotalPrice(testState)

    expect(selectorResult).toEqual(25)

    selectorResult = selectors.selectCartItemsTotalPrice({
        ...testState,
        testProperty: true
    })

    expect(selectors.selectCartItemsTotalPrice.recomputations()).toEqual(1)

    selectorResult = selectors.selectCartItemsTotalPrice({
        cart: {
            cartItems: []
        }
    })

    expect(selectorResult).toEqual(0)
})