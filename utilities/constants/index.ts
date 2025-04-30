import { BsChatSquareTextFill } from "react-icons/bs";
import { FaQuestionCircle } from "react-icons/fa";
import { FaPeopleLine, FaUserPlus } from "react-icons/fa6";
import { GiNestEggs } from "react-icons/gi";
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
export const NavLinks = [
  {
    navItem: "Nest For Companies",
    href: "nil",
    dropDown: true,
    dropDownOpt: [
      {
        icon: FaPeopleLine,
        title: "Hire Talent",
        desc: "Top-tier talent, zero hassle",
        href: "/hire-talent",
      },
      {
        icon: GiNestEggs,
        title: "TalentNest Experiences",
        desc: "Real Stories from Our Community",
        href: "/talentnest-experiences",
      },
    ],
  },
  {
    navItem: "Nest For Talents",
    href: "nil",
    dropDown: true,
    dropDownOpt: [
      {
        icon: MdOutlineScreenSearchDesktop,
        title: "Find Job",
        desc: "Your next big opportunity starts here",
        href: "/jobs",
      },
      {
        icon: FaUserPlus,
        title: "Sign In",
        desc: "Access Your Nest Profile",
        href: "/sign-in",
      },
    ],
  },
  {
    navItem: "NestHub",
    href: "nil",
    dropDown: true,
    dropDownOpt: [
      {
        icon: BsChatSquareTextFill,
        title: "Blog",
        desc: "Your guide to thriving on TalentNest.",
        href: "/blog",
      },
      {
        icon: FaQuestionCircle,
        title: "Faq",
        desc: "TalentNest's frequently asked questions.",
        href: "/faq",
      },
    ],
  },
  {
    navItem: "Nest HelpDesk",
    href: "/help-desk",
    dropDown: false,
    icon: IoIosChatbubbles,
    desc: "Need help? We’re here for you.",
  },
];

export const validationRules = {
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
  url: {
    required: "Your LinkedIn URL is required",
    pattern: {
      value: /^https:\/\/(www\.)?linkedin\.com\/.*$/,
      message: "Invalid LinkedIn URL",
    },
  },
  role: {
    required: "Role required",
  },
  experience: {
    required: "Experience required",
  },
  resume: {
    required: "Please upload your resume",
  },
  jobPostTitle: {
    required: "Job Post Title is required",
  },
  country: {
    required: "This is required",
  },
  location: {
    required: "Please enter a  location",
  },
  department: {
    required: "Please enter a  department",
  },
  salaryRange: {
    required: "Complete salary range",
  },
  workMode: {
    required: "Work Mode required",
  },
  workHours: {
    required: "Please select an option",
  },
  experienceLevel: {
    required: "Please select an option",
  },
  description: {
    required: "Job description is required",
    // maxLength: {
    //   value: 10000,
    //   message: "Description cannot exceed 3000 words",
    // },
  },
};

const colorPalette = [
  "#010D3E", // Navy
  "#283742", // Gunmetal
  // "#00509E", // Lighter blue
  // "#87CEEB", // Sky blue
  // "#1E90FF", // Dodger blue

  "#A9A9A9", // Dark gray
  // "#B0C4DE", // Light steel blue
];

export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  return colorPalette[randomIndex];
}

// export function formatTimeDifference(timestamp: string): string {
//   const now = new Date();
//   const notificationTime = new Date(timestamp);
//   const diffInSeconds = Math.floor(
//     (now.getTime() - notificationTime.getTime()) / 1000
//   );

//   const days = Math.floor(diffInSeconds / (3600 * 24));
//   const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
//   const minutes = Math.floor((diffInSeconds % 3600) / 60);
//   const seconds = diffInSeconds % 60;

//   if (days > 0) {
//     return `${days} day${days > 1 ? "s" : ""} ago`;
//   } else if (hours > 0) {
//     return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//   } else if (minutes > 0) {
//     return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
//   } else {
//     return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
//   }
// }

export function formatTimeDifference(timestamp: string): string {
  const date = new Date(timestamp);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${weekday} ${day}${daySuffix} ${month}, ${year}`;
}
