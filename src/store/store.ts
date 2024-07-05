import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import utilReducer from "./Slice/utilSlice";
import bookReducer from "./Slice/bookSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    util: utilReducer,
    book: bookReducer,
  },
});
export type RootState = ReturnType<typeof import("./store").default.getState>;
export type AppDispatch = typeof import("./store").default.dispatch;
export default store;
