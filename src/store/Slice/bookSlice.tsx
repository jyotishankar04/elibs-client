import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "../asyncReducres/fetch";

const initialState = {
  _id: "",
  title: "",
  author: "",
  uploadedBy: {
    _id: "",
    name: "",
  },
  genre: "",
  coverImage: "",
  file: "",
  description: "",
  createdAt: "",
  updatedAt: "",
};
const bookSlice = createSlice({
  name: "book",
  initialState: { book: [initialState] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (_state, action) => {
      Object.assign(_state.book, action.payload);
    });
  },
});

// export const {} = userSlice.actions;
export default bookSlice.reducer;
