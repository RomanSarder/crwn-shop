import { createReducer } from "@reduxjs/toolkit";
import { 
        addItemToCart as addItemToCartAction, 
        decreaseItemQuantity as decreaseItemQuantityAction, 
        increaseItemQuantity as increaseItemQuantityAction, 
        removeItemFromCart as removeItemFromCartAction, 
        toggleCart as toggleCartAction 
        } from "./actions";
import { getCartItemById, removeCartItem } from "./utils";

var initialState = {
    showCart: false,
    cartItems: [],
}

export default createReducer(initialState, function buildReducer (builder) {
    builder
        .addCase(toggleCartAction, function updateState (state) {
            state.showCart = !state.showCart
        })
        .addCase(addItemToCartAction, function updateState (state, { payload }) {
            var pendingItem = { ...payload, quantity: 1 }

            var { index: targetItemInCartIndex, item: targetItemInCart } = getCartItemById(state, pendingItem.id)
            const isItemAlreadyInCart = targetItemInCartIndex > -1
            if (isItemAlreadyInCart) {
                state.cartItems[targetItemInCartIndex] = { ...targetItemInCart, quantity: targetItemInCart.quantity + 1 }
            } else {
                state.cartItems.push({ ...pendingItem, quantity: 1 })
            }
        })
        .addCase(removeItemFromCartAction, function updateState (state, { payload: { id } }) {
            state.cartItems = removeCartItem(state, id)
        })
        .addCase(increaseItemQuantityAction, function updateState (state, { payload: { id } }) {
            var { index, item } = getCartItemById(state, id)
            state.cartItems[index].quantity = item.quantity + 1
        })
        .addCase(decreaseItemQuantityAction, function updateState (state, { payload: { id } }) {
            var { index, item } = getCartItemById(state, id)

            if (item.quantity == 1) {
                state.cartItems = removeCartItem(state, id)
            } else {
                state.cartItems[index].quantity = item.quantity - 1
            }
        })
})