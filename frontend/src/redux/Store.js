import { configureStore } from '@reduxjs/toolkit'

import cartReducer from "./features/cart/cartSlice"
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'
import productsApi from './features/products/productsApi'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath] : productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
})