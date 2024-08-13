import { configureStore } from "@reduxjs/toolkit";
import phoneBookReducer from "./phonebooks/PhoneBookSlice";

export const store = configureStore({
  reducer: {
    phonebooks: phoneBookReducer,
  },
});
