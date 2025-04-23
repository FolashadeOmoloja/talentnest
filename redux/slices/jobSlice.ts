import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    job: null,
    singleJob: null,
    loading: false,
  },
  reducers: {
    setJob: (state, action) => {
      state.job = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setApplyLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setJob, setSingleJob, setApplyLoading } = jobSlice.actions;
export default jobSlice.reducer;
