export function selectCartDisplayState (state) {
    return state.cart.showCart
}

export function selectCartItems (state) {
    return state.cart.cartItems
}

export function selectCartItemsNumber (state) {
    return state.cart.cartItems.length
}