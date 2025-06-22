export type userObject = {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null; // Use '|' for union types
  phoneNumber: string;
  countryCode: string;
  industry: string;
  emailAddress: string;
  password: string;
  profession: string;
  experienceYears: string;
  experienceLevel: string;
  filename: string;
  resume: string;
  resumeOriginalName: string;
  preference: string;
  country: string;
  accountStatus: string;
  hex: string;
  location: string;
  linkedInUrl: string;
};

export type userCompanyObject = {
  _id: string;
  companyName: string;
  firstName: string;
  lastName: string;
  profileImage: string | null; // Use '|' for union types
  phoneNumber: string;
  countryCode: string;
  industry: string[];
  emailAddress: string;
  password: string;
  companyRole: string;
  preference: string;
  country: string;
  accountStatus: string;
  hex: string;
  location: string;
  linkedInUrl: string;
};

export interface JobPosted {
  _id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  jobProximity: string;
  jobHours: string;
  experience: string;
  salaryRange1: string;
  salaryRange2: string;
  status: string;
  country: string;
  role: string;
  skills: string[];
  company: userCompanyObject;
  applicants?: userObject[];
  description: string;
}

export interface Jobs {
  title: string;
  company: string;
  location: string;
  priceRange: string;
  jobProximity: string;
  jobHours: string;
  experience: string;
  skills: string[];
  role: string;
  department: string;
  country: string;
}
[];

export interface SuccessApplications {
  _id: string;
  job: JobPosted;
  status: string;
  createdAt: string;
  talent: userObject;
}

export type IsOpenState = {
  [key: number]: boolean;
};

export type IsCheckedState = {
  [key: number]: boolean;
};

export type DataItem = {
  label: string;
  options: string[];
  icon: React.ReactNode;
};

export type SelectedFilters = {
  hours: string[];
  proximity: string[];
  experience: string[];
};

export type SelectedSearchFilters = {
  industry: string;
  country: string;
  skills: string;
};
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
