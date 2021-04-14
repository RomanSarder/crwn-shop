import { createReducer } from "@reduxjs/toolkit";
import { collectionLoadingFinished, collectionLoadingStarted, getCollectionsData, setCollectionsData } from "./actions";

var initialState = {
    isLoading: false,
    isFetching: false,
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
            state.isFetching = false
        })
        .addCase(getCollectionsData.pending, function updateState (state) {
            state.isFetching = true
        })
})