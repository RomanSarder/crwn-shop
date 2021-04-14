import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getCollectionsWithItems } from "../../api/collections";

export const setCollectionsData = createAction('collections/setData')

export const getCollectionsData = createAsyncThunk(
    'collections/getData',
    async function getData (_, { dispatch }) {
        var response = await getCollectionsWithItems()

        dispatch(setCollectionsData(response))
    }
)