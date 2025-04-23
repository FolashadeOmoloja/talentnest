export const companyValidationRules = {
  firstName: {
    required: "First Name is required",
  },
  lastName: {
    required: "Last Name is required",
  },
  companyName: {
    required: `Your Company's Name is required`,
  },
  profession: {
    required: `Your profession is required`,
  },
  companyRole: {
    required: "Company Role is required",
  },
  location: {
    required: "Location is required",
  },
  country: {
    required: "Country is required",
  },
  preference: {
    required: "This is required",
  },
  industries: {
    required: "This is required",
  },
  privacyConsent: {
    required: "This is required",
  },
  mobileNo: {
    required: "Mobile No. is required",
    pattern: {
      value: /^[0-9]/,
      message: "Invalid mobile phone number",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    },
  },
  url: {
    required: "Your LinkedIn URL is required",
    pattern: {
      value: /^https:\/\/(www\.)?linkedin\.com\/.*$/,
      message: "Invalid LinkedIn URL",
    },
  },

  jobTitle: {
    required: "Job Title is required",
  },
  resume: {
    required: "Please upload your resume",
  },
  role: {
    required: "Role required",
  },
  experience: {
    required: "Experience required",
  },
  level: {
    required: "This is required",
  },
  skills: {
    required: "Please Select a skill",
  },
};

export const userValidationRules = {
  firstName: {
    required: "First Name is required",
  },
  lastName: {
    required: "Last Name is required",
  },
  companyName: {
    required: `Your Company's Name is required`,
  },
  jobTitle: {
    required: "Job Title is required",
  },
  mobileNo: {
    required: "Mobile No. is required",
    pattern: {
      value: /^[0-9]/,
      message: "Invalid phone number",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    },
  },
};
