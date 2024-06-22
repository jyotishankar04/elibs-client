import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/books/bookSlice";
export const store = configureStore({
  reducer: {
    booksReducer,
  },
});
