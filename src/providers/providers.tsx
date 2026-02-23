import { ReactNode } from "react";
import { store } from "./../store/store";
import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

type ProvidersProps = {
  children: ReactNode;
};
export default function providers({ children }: ProvidersProps) {
  return (
    <>
      <Provider store={store}>
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
