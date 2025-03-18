import App from "./App.jsx";

import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { store, persistor } from "./state/store.jsx";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import "primereact/resources/primereact.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
