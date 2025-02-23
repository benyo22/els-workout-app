import "./index.css";

import App from "./App.jsx";

import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./state/store.jsx";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
