import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "../../components/BookList";

export const fetchHomePageBooks = createAsyncThunk<
  Book[],
  void,
  {
    rejectValue: string;
  }
>("books/fetchHomePageBooks", async (_, thunkAPI) => {
  try {
    const response = await axios.get<Book[]>(
      `http://localhost:3001/api/v1/books/list`
    );
    return response.data;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
