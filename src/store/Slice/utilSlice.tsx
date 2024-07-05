import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "util",
  initialState: {
    drowerLoader: false,
    signUpPopUpStatus: false,
  },
  reducers: {
    startDrowerLoader: (state) => {
      state.drowerLoader = true;
    },
    endDrowerLoader: (state) => {
      state.drowerLoader = false;
    },
    setSignUpPopUpStatus: (state, actions) => {
      state.signUpPopUpStatus = actions.payload;
    },
  },
});

export const { startDrowerLoader, endDrowerLoader, setSignUpPopUpStatus } =
  utilSlice.actions;
export default utilSlice.reducer;
