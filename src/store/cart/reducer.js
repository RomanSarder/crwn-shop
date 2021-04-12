import { createReducer } from "@reduxjs/toolkit";
import { toggleCart } from "./actions";

var initialState = {
    showCart: false
}

export default createReducer(initialState, function buildReducer (builder) {
    builder
        .addCase(toggleCart, function updateState (state, { payload }) {
            state.showCart = !state.showCart
        })
})