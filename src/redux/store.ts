import { configureStore } from "@reduxjs/toolkit";
import { baseUrlApi } from "./api/baseUrlApi";
export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseUrlApi.reducerPath]: baseUrlApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseUrlApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
