import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { getDirectoryData as getDirectoryDataFromAPI } from "../../api/directory";

export const setDirectoryData = createAction('directory/setData')
export const directoryLoadingFinished = createAction('directory/loadingFinished')
export const directoryLoadingStarted = createAction('directory/loadingStarted')

export const getDirectoryData = createAsyncThunk(
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
          const { directory: { items, isFetching } } = getState()
          const isDataAlreadyLoaded = items.length > 0
          if (isDataAlreadyLoaded || isFetching) {
            // Already in progress or data was loaded
            return false
          }
        }
    }
)