import { configureStore } from "@reduxjs/toolkit";
import dateReducer, { dateChangeMiddleware } from "./features/dateSlice";

export const store = configureStore({
  reducer: {
    date: dateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dateChangeMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
