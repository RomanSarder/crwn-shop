import { createAction } from "@reduxjs/toolkit";

export const toggleCart = createAction('cart/toggle')
export const addItemToCart = createAction('cart/addItem')