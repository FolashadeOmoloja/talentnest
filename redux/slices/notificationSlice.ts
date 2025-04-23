import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    companyNotifications: [],
    talentNotifications: [],
  },
  reducers: {
    setCompanyNotification: (state, action) => {
      state.companyNotifications = action.payload;
    },
    setTalentNotification: (state, action) => {
      state.talentNotifications = action.payload;
    },
  },
});

export const { setTalentNotification, setCompanyNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
