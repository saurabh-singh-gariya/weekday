import { configureStore } from "@reduxjs/toolkit";
import jobListReducer from "./slice/JobListSlice";

export const Appstore = configureStore({
  reducer: {
    jobs: jobListReducer,
  },
});

export default Appstore;
