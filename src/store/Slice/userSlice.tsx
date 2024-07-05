import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../asyncReducres/fetch";

const initialState = {
  name: "",
  email: "",
  password: "",
  _id: "",
  profileImage: "",
  wishlist: [],
  wishlistArray: [],
  bio: "",
  instagramUrl: "",
  linkedinUrl: "",
  twitterUrl: "",
  createdAt: "",
  updatedAt: "",
  publishedBooks: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (_state, action) => {
      Object.assign(_state, action.payload);
    });
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
