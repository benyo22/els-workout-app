import App from "@/App.jsx";
import { persistor, store } from "@/store/store.jsx";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "primereact/resources/primereact.min.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
