import "./index.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css"; // Core styles
import "primereact/resources/themes/lara-light-blue/theme.css"; // Change theme if needed

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
