import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import rootReducer from './root-reducer'

var middleware = [thunk]

if (process.env.NODE_ENV != 'test' && process.env.NODE_ENV != 'production') {
    middleware.push(logger)
}

export function createStoreInstance () {
    return configureStore({
        reducer: rootReducer,
        middleware,
    })
}

const store = createStoreInstance()

export const persistor = persistStore(store)
export default store