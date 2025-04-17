import App from "@/App.jsx";
import { store, persistor } from "@/store/store.jsx";

import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import "primereact/resources/primereact.min.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
