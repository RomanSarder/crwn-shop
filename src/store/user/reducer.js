import { createReducer } from "@reduxjs/toolkit";
import { setUser } from './actions'

var initialState = {
    currentUser: null
}

export default createReducer(initialState, function buildReducer (builder) {
    builder
        .addCase(setUser, (state, { payload }) => {
            state.currentUser = payload
        })
})