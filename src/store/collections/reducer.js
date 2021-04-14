import { createReducer } from "@reduxjs/toolkit";
import { setCollectionsData } from "./actions";

var initialState = {}

export default createReducer(initialState, function buildReducer (builder) {
    return builder
        .addCase(setCollectionsData, function updateState (state, { payload }) {
            return { ...state, ...payload }
        })
})