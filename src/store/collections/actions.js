import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getCollectionsWithItems } from "../../api/collections";

export const setCollectionsData = createAction('collections/setData')
export const collectionLoadingFinished = createAction('collections/loadingFinished')
export const collectionLoadingStarted = createAction('collections/loadingStarted')

export const getCollectionsData = createAsyncThunk(
    'collections/getData',
    async function getData (_, { dispatch }) {
        dispatch(collectionLoadingStarted())
        
        try {
            var response = await getCollectionsWithItems()
            dispatch(setCollectionsData(response))
        } finally {
            dispatch(collectionLoadingFinished())
        }
    },
    {
        condition: function checkIfDataAlreadyLoaded (_, { getState }) {
          const { collections: { data, isFetching } } = getState()
          const isDataAlreadyLoaded = Object.keys(data).length > 0
          if (isDataAlreadyLoaded || isFetching) {
            // Already in progress or data was loaded
            return false
          }
        }
    }
)