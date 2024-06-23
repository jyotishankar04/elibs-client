import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHomePageBooks } from "./fetchHomeBooks";
import { Book } from "../../components/BookList";

export interface State {
  isLoggedIn: boolean;
  books: Book[];
  containerLoading: boolean;
}

const initialState: State = {
  isLoggedIn: false,
  books: [],
  containerLoading: false,
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchHomePageBooks.pending, (state) => {
      state.containerLoading = true;
    });
    builder.addCase(fetchHomePageBooks.rejected, (state) => {
      state.containerLoading = false;
    });
    builder.addCase(
      fetchHomePageBooks.fulfilled,
      (state, action: PayloadAction<{ data: Book[] }>) => {
        state.books = action.payload.data;
        state.containerLoading = false;
      }
    );
  },
});

export const { login, logout } = bookSlice.actions;

export default bookSlice.reducer;
