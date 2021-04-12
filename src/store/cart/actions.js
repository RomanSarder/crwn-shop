import { createAction } from "@reduxjs/toolkit";

export const toggleCart = createAction('cart/toggle')
export const addItemToCart = createAction('cart/addItem')
export const removeItemFromCart = createAction('cart/removeItem')