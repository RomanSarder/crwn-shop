import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getCollectionsWithItems as getCollectionsWithItemsFromAPI } from "../../api/collections";

export var setCollectionsData = createAction('collections/setData')
export var collectionLoadingFinished = createAction('collections/loadingFinished')
export var collectionLoadingStarted = createAction('collections/loadingStarted')

export var getCollectionsData = createAsyncThunk(
    'collections/getData',
    async function getData (_, { dispatch }) {
        dispatch(collectionLoadingStarted())
        
        try {
            var response = await getCollectionsWithItemsFromAPI()
            dispatch(setCollectionsData(response))
        } finally {
            dispatch(collectionLoadingFinished())
        }
    },
    {
        condition: function checkIfDataAlreadyLoaded (_, { getState }) {
          var { collections: { data, isFetching } } = getState()
          const isDataAlreadyLoaded = Object.keys(data).length > 0
          if (isDataAlreadyLoaded || isFetching) {
            // Already in progress or data was loaded
            return false
          }
        }
    }
)