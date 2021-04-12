import { createReducer } from "@reduxjs/toolkit";
import { addItemToCart, toggleCart } from "./actions";

var initialState = {
    showCart: false,
    cartItems: [],
}

export default createReducer(initialState, function buildReducer (builder) {
    builder
        .addCase(toggleCart, function updateState (state, { payload }) {
            state.showCart = !state.showCart
        })
        .addCase(addItemToCart, function updateState (state, { payload }) {
            var currentCartItems = state.cartItems
            var pendingItem = { ...payload, quantity: 1 }

            const sameItemIndexInCartItems = currentCartItems.findIndex(function findPendingItem (item) {
                return item.id == pendingItem.id
            })
            const isItemAlreadyInCart = sameItemIndexInCartItems > -1

            if (isItemAlreadyInCart) {
                var targetCartItem = state.cartItems[sameItemIndexInCartItems]
                state.cartItems[sameItemIndexInCartItems] = { ...targetCartItem, quantity: targetCartItem.quantity + 1 }
            } else {
                state.cartItems.push({ ...pendingItem, quantity: 1 })
            }
        })
})