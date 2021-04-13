import { combineReducers } from "redux";
import userReducer from './user/userSlice'
import cartReducer from './cart/cartSlice'

export default combineReducers({
    user: userReducer,
    cart: cartReducer
})
