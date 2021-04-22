import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { getDirectoryData as getDirectoryDataFromAPI } from "../../api/directory";

export var setDirectoryData = createAction('directory/setData')
export var directoryLoadingFinished = createAction('directory/loadingFinished')
export var directoryLoadingStarted = createAction('directory/loadingStarted')

export var getDirectoryData = createAsyncThunk(
    'directory/getData',
    async function getData (_, { dispatch }) {
        dispatch(directoryLoadingStarted())
        
        try {
            var response = await getDirectoryDataFromAPI()
            dispatch(setDirectoryData(response))
        } finally {
            dispatch(directoryLoadingFinished())
        }
    },
    {
        condition: function checkIfDataAlreadyLoaded (_, { getState }) {
          var { directory: { items, isFetching } } = getState()
          const isDataAlreadyLoaded = items.length > 0
          if (isDataAlreadyLoaded || isFetching) {
            // Already in progress or data was loaded
            return false
          }
        }
    }
)