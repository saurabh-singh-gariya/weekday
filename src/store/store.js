import { configureStore } from "@reduxjs/toolkit";
import jobListReducer from "./slice/JobListSlice";

export const Appstore = configureStore({
  reducer: {
    jobList: jobListReducer,
  },
});

export default Appstore;
