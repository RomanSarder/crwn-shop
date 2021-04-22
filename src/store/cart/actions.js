import { createAction } from "@reduxjs/toolkit";

export var toggleCart = createAction('cart/toggle')
export var addItemToCart = createAction('cart/addItem')
export var removeItemFromCart = createAction('cart/removeItem')
export var increaseItemQuantity = createAction('cart/increaseQuantity')
export var decreaseItemQuantity = createAction('cart/decreaseQuantity')