import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import userReducer from './user/userSlice'
import cartReducer from './cart/cartSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    },
    middleware: [logger]
})