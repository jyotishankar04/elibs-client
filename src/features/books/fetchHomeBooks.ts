import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Book } from "../../components/BookList";
import { useDispatch } from "react-redux";
import { setIsUploading } from "./bookSlice";

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
export interface User {
  name: string;
  email: string;
  createdAt: Date;
  publishedBooks: Book[];
  wishlist: [];
  bio: string;
  instagramUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  profileImage: string;
  dob: string;
}
export const getProfileDetails = createAsyncThunk<
  User,
  void,
  {
    rejectValue: string;
  }
>("books/getProfileDetails", async (_, thunkAPI) => {
  try {
    const response = await axios.get<{ user: User }>(
      `http://localhost:3001/api/v1/users/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.user;
  } catch (error: unknown) {
    return thunkAPI.rejectWithValue((error as Error).message);
  }
});
