import { APPLICATIONS_API_END_POINT } from "@/utilities/constants/constants";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface JobState {
  jobIds: string[];
  loading: boolean;
}

const initialState: JobState = {
  jobIds: [],
  loading: false,
};

// Fetch applied jobs
export const fetchAppliedJobs = createAsyncThunk(
  "appliedJobs/fetch",
  async () => {
    const response = await axios.get(`${APPLICATIONS_API_END_POINT}/get`, {
      withCredentials: true,
    });
    return response.data.jobIds;
  }
);

const appliedJobSlice = createSlice({
  name: "appliedJobs",
  initialState,
  reducers: {
    addAppliedJob: (state, action: PayloadAction<string>) => {
      state.jobIds.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobIds = action.payload;
      })
      .addCase(fetchAppliedJobs.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addAppliedJob } = appliedJobSlice.actions;
export default appliedJobSlice.reducer;
