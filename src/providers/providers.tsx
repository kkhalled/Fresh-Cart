"use client";
import { ReactNode, useRef } from "react";

import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import { AppStoreType, createStore, preloadedState } from "../store/store";
import { AuthState } from "../features/auth/server/auth.action";
import StoreInitializer from "./StoreInitializer";

type ProvidersProps = {
  children: ReactNode;
  preloadedState: preloadedState;
};
export default function providers({
  children,
  preloadedState,
}: ProvidersProps) {
  const storeRef = useRef<null | AppStoreType>(null);
  if (!storeRef.current) {
    storeRef.current = createStore(preloadedState);
  }

  return (
    <>
      <Provider store={storeRef.current}>
        <StoreInitializer />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
      </Provider>
    </>
  );
}
