import { configureStore } from "@reduxjs/toolkit";
import { authSlice, cartSlice, productSlice, sliderSlice } from "../features";

export const store = configureStore({
  reducer: {
    slider: sliderSlice.reducer,
    products: productSlice.reducer,
    cart: cartSlice.reducer,
    user: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
