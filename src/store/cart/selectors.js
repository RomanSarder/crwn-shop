import { createSelector } from "reselect"

export function selectCartDisplayState (state) {
    return state.cart.showCart
}

export function selectCartItems (state) {
    return state.cart.cartItems
}

export const selectCartItemsTotalQuantity = createSelector(
    selectCartItems,
    function calculateTotalQuantity (items) {
        return items.reduce(function accumulateItemsQuantity (acc, next) {
            return acc + next.quantity
        }, 0)
    }
)

export const selectCartItemsTotalPrice = createSelector(
    selectCartItems,
    function calculateTotalPrice (items) {
        return items.reduce(function accumulatePrice (acc, next) {
            return acc + ( next.price * next.quantity )
        }, 0)
    }
)