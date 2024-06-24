import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHomePageBooks, getProfileDetails, User } from "./fetchHomeBooks";
import { Book } from "../../components/BookList";
import { User } from "lucide-react";

export interface State {
  isLoggedIn: boolean;
  books: Book[];
  containerLoading: boolean;
  isUploading: boolean;
  userInfo: {
    name: string;
    email: string;
    createdAt: Date;
    publishedBooks: Book[];
    wishlist: [];
    bio: string;
    instagramUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
    dob: string;
    profileImage: string;
  };
}

const initialState: State = {
  isLoggedIn: false,
  books: [],
  containerLoading: false,
  isUploading: false,
  userInfo: {
    name: "",
    email: "",
    createdAt: new Date(),
    wishlist: [],
    bio: "",
    instagramUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    profileImage: "",
    publishedBooks: [],
    dob: "",
  },
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
    setIsUploading: (state, actions) => {
      state.isUploading = actions.payload;
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
    builder.addCase(
      getProfileDetails.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.userInfo.name = action.payload.name;
        state.userInfo.email = action.payload.email;
        state.userInfo.createdAt = action.payload.createdAt;
        state.userInfo.publishedBooks = action.payload.publishedBooks;
        state.userInfo.bio = action.payload.bio;
        state.userInfo.instagramUrl = action.payload.instagramUrl;
        state.userInfo.linkedinUrl = action.payload.linkedinUrl;
        state.userInfo.twitterUrl = action.payload.twitterUrl;
        state.userInfo.profileImage = action.payload.profileImage;
        state.userInfo.wishlist = action.payload.wishlist;
        state.userInfo.dob = action.payload.dob;
      }
    );
  },
});

export const { login, logout, setIsUploading } = bookSlice.actions;

export default bookSlice.reducer;
