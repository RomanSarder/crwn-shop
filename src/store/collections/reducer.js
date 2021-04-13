import { createReducer } from "@reduxjs/toolkit";
import { SHOP_DATA } from './data'

var initialState = {
    items: SHOP_DATA
}

export default createReducer(initialState, function buildReducer (builder) {
    return builder
})