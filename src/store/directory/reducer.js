import { createReducer } from "@reduxjs/toolkit";
import { directoryLoadingFinished, directoryLoadingStarted, getDirectoryData, setDirectoryData } from "./actions";

var initialState = {
    isFetching: false,
    isLoading: false,
    items: []
}

export default createReducer(initialState, function buildReducer (builder) {
    return builder
      .addCase(setDirectoryData, function updateState (state, { payload }) {
        state.items = payload
      })
      .addCase(directoryLoadingStarted, function updateState (state, { payload }) {
        state.isLoading = true
      })
      .addCase(directoryLoadingFinished, function updateState (state, { payload }) {
        state.isLoading = false
        state.isFetching = false
      })
      .addCase(getDirectoryData.pending, function updateState (state, { payload }) {
        state.isFetching = true
      })
})