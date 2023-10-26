import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";

// Redux store configuration
export const store = configureStore({
  reducer: {
    countries: countriesReducer, // Agrego mi reducer al store
  },
  // Para que no me de error al guardar el store en el local storage
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
