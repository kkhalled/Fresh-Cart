import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer, User } from "../features/auth/store/authSlice";
import { cartReducer } from "../features/cart/store/cart.slice";
import { wishlistReducer } from "../features/wishlist/store/wishlist.slice";
import { checkoutReducer } from "../features/checkout/store/checkout.slice";
import { categoriesReducer } from "../features/categories/store/categories.slice";
import { AuthState } from "../features/auth/server/auth.action";

export type preloadedState = {
  auth: AuthState;
};

// Create a base store configuration for type inference
const baseStore = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    checkout: checkoutReducer,
    categories: categoriesReducer,
  },
});

export function createStore(preloadedState: preloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      checkout: checkoutReducer,
      categories: categoriesReducer,
    },
    preloadedState: {
      auth: preloadedState.auth,
    },
  });

  return store;
}

export type AppStoreType = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof baseStore.getState>;
export type AppDispatch = typeof baseStore.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
