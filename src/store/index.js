import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import userReducer from './user/userSlice'

export default configureStore({
    reducer: {
        user: userReducer
    },
    middleware: [logger]
})