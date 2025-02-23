import { authReducer } from "./authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { elsApi } from "./elsApiSlice";

import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
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
