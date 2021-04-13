import { combineReducers } from "redux";
import userReducer from './user/userSlice'
import cartReducer from './cart/cartSlice'
import directoryReducer from './directory/directorySlice'
import collectionsReducer from './collections/collectionsSlice'

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    collections: collectionsReducer,
})
