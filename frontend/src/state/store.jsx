import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { elsApi } from "./elsApiSlice";
import { authReducer } from "./slices/authSlice";
import { authViewReducer } from "./slices/authViewSlice";
import { darkModeReducer } from "./slices/darkModeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "authView", "darkMode"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    authView: authViewReducer,
    darkMode: darkModeReducer,
    [elsApi.reducerPath]: elsApi.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(elsApi.middleware),
});

export const persistor = persistStore(store);
