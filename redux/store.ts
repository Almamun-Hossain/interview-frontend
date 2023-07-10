import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./features/productSlices";
import CartSlice from "./features/cartSlices";
export const store = configureStore({
     reducer: {
          products: ProductSlice,
          carts: CartSlice
     }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export default store;
export type AppDispatch = typeof store.dispatch;
