import { createReducer } from "@reduxjs/toolkit";
import { collectionLoadingFinished, collectionLoadingStarted, setCollectionsData } from "./actions";

var initialState = {
    isLoading: false,
    data: {}
}

export default createReducer(initialState, function buildReducer (builder) {
    return builder
        .addCase(setCollectionsData, function updateState (state, { payload }) {
            state.data = payload
        })
        .addCase(collectionLoadingStarted, function updateState (state) {
            state.isLoading = true
        })
        .addCase(collectionLoadingFinished, function updateState (state) {
            state.isLoading = false
        })
})