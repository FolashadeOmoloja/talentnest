import { JOB_API_END_POINT } from "@/utilities/constants/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching jobPosts
export const fetchJobs = createAsyncThunk("jobPosts/fetchJobs", async () => {
  const response = await axios.get(`${JOB_API_END_POINT}/get`); // Your API call
  return response.data.jobs;
});

const jobPostsSlice = createSlice({
  name: "jobPosts",
  initialState: {
    jobPosts: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobPosts = action.payload;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default jobPostsSlice.reducer;
