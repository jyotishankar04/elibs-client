import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/fetchUser",
  async () => {
    try {
      const response = await axios.get<{ user: User }>(
        `https://elibapi.devsuvam.xyz/api/v1/users/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
    // console.log(response.data);
  }
);

export const fetchBooks = createAsyncThunk<
  Book[],
  void,
  { rejectValue: string }
>("book/fetchBooks", async () => {
  try {
    const response = await axios.get(
      `https://elibapi.devsuvam.xyz/api/v1/books/list`
    );

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export interface Book {
  _id: string;
  title: string;
  author: string;
  uploadedBy: {
    _id: string;
    name: string;
  };
  genre: string;
  coverImage: string;
  file: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  _id: string;
  profileImage: string;
  wishlist: string[];
  bio: string;
  instagramUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  createdAt: string;
  updatedAt: string;

  wishlistArray: string[];
  publishedBooks: [];
}
