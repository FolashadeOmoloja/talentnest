// talentRegistrationSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface StepsData {
  firstName: string;
  lastName: string;
  mobileNo: string;
  countryCode: string;
  email: string;
  password: string;
  country: string;
  location: string;
  url: string;
  profession: string;
  experience: string;
  level: string;
  role: string;
  preference: string;
  skills: string;
  privacyConsent: boolean;
  resume: File;
  channel?: string;
}

interface TalentRegistrationState {
  step1Data: Partial<StepsData>; // Partial allows some fields to be optional
  step2Data: Partial<StepsData>;
  step3Data: Partial<StepsData>;
  step4Data: Partial<StepsData>;
}

const initialState: TalentRegistrationState = {
  step1Data: {},
  step2Data: {},
  step3Data: {},
  step4Data: {},
};

const talentRegistrationSlice = createSlice({
  name: "talentRegistration",
  initialState,
  reducers: {
    setStep1Data(state, action) {
      state.step1Data = action.payload;
    },
    setStep2Data(state, action) {
      state.step2Data = action.payload;
    },
    setStep3Data(state, action) {
      state.step3Data = action.payload;
    },
    setStep4Data(state, action) {
      state.step4Data = action.payload;
    },
  },
});

export const { setStep1Data, setStep2Data, setStep3Data, setStep4Data } =
  talentRegistrationSlice.actions;

export default talentRegistrationSlice.reducer;
