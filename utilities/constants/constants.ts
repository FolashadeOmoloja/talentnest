const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api/v1"
    : "https://talentnest-backend.onrender.com/api/v1";

export const COMPANY_API_END_POINT = `${BASE_URL}/company`;
export const TALENT_API_END_POINT = `${BASE_URL}/user`;
export const JOB_API_END_POINT = `${BASE_URL}/job`;
export const APPLICATIONS_API_END_POINT = `${BASE_URL}/applicants`;
export const RESET_API_END_POINT = `${BASE_URL}/reset`;
