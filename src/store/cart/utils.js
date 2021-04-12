export function getCartItemById (state, id) {
    const itemIndex = state.cartItems.findIndex(function findPendingItem (item) {
        return item.id == id
    })

    var targetItem = state.cartItems[itemIndex]

    return {
        index: itemIndex,
        item: targetItem
    }
}

export function removeCartItem (state, id) {
    return state.cartItems.filter(function filterInItemsExceptId (item) {
        return item.id !== id
    })
}