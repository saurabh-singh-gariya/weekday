import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchJobList = createAsyncThunk(
  "jobList/fetchJobList",
  async (offset, { rejectWithValue }) => {
    try {
      const URL = "https://api.weekday.technology/adhoc/getSampleJdJSON";
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = JSON.stringify({
        limit: 10,
        offset,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      const response = await fetch(URL, requestOptions);
      if (!response) {
        throw new Error("Failed to fetch Jobs");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      rejectWithValue(error?.message ?? "Error While loading Jobs");
    }
  }
);

const initialState = {
  jobList: [],
  loading: false,
  error: null,
};

export const jobListSlice = createSlice({
  name: "jobList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchJobList.pending, (state, action) => {
      const newState = { ...state, loading: true };
      state = newState;
    });
    builder.addCase(fetchJobList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchJobList.fulfilled, (state, action) => {
      state.loading = false;
      state.jobList = [...state.jobList, ...action.payload.jdList];
    });
  },
});

export default jobListSlice.reducer;
