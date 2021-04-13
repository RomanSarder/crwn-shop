import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistStore } from 'redux-persist'

import rootReducer from './root-reducer'

const store = configureStore({
    reducer: rootReducer,
    middleware: [logger]
})

export const persistor = persistStore(store)
export default store