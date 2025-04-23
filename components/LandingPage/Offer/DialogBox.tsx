import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaCheckCircle } from "react-icons/fa";

const tabs: Record<
  string,
  {
    subtitle: string;
    title: string;
    image: string;
    description: string;
    bullets: string[];
  }
> = {
  "AI Matching Time": {
    subtitle: "TalentNest helps your company hire faster",
    title: "Trusted by Over 2,000+ Companies Worldwide",
    image: "/images/homepage/dashboard.svg",
    description:
      "Automatically match the best candidates to your roles based on skills",
    bullets: [
      "Smart Matching Technology",
      "End-to-End Hiring Tools",
      "Diverse Talent Pool",
    ],
  },
  "Exclusive Job Access": {
    subtitle: "For freelancers who aim higher",
    title: "Work with Verified Companies Only",
    image: "/images/homepage/talentdash.svg",
    description:
      "We curate job listings from vetted companies, so you can focus on doing what you love with peace of mind.",
    bullets: [
      "Access exclusive job postings",
      "No more job scams or ghosting",
      "Client credibility guaranteed",
    ],
  },
  "Seamless Hiring Process": {
    subtitle: "Let your next hire be just a few clicks away",
    title: "Simplified Workflow from Search to Hire",
    image: "/images/homepage/easyhire.svg",
    description:
      "From shortlisting to final contract, TalentNest streamlines your hiring journey to save you time.",
    bullets: [
      "One-click candidate shortlisting",
      "Built-in interview scheduling",
      "Progress tracking dashboard",
    ],
  },
  "Easy Apply": {
    subtitle: "No more complex forms and redundant info",
    title: "Apply to Jobs in Seconds",
    image: "/images/homepage/easyapply.svg",
    description:
      "Our platform makes it easy for freelancers to showcase skills and apply to relevant jobs instantly.",
    bullets: [
      "Pre-filled applications",
      "Auto-matching with job requirements",
      "Notifications when you're shortlisted",
    ],
  },
};

const TabContent = ({ selectedTab }: { selectedTab: string }) => {
  const data = tabs[selectedTab];

  return (
    <motion.div
      key={selectedTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex w-full gap-10 max-md:flex-col"
    >
      <div className="md:w-1/2 min-h-[300px] p-5 flex items-center justify-center rounded-xl bg-[#D2DCFF] shadow-md md:min-h-[453px]">
        <img src={data.image} className="w-full h-full" />
      </div>
      <div className="md:w-1/2 p-6 rounded-xl bg-[#EAEEFE] bg-opacity-50 backdrop-blur-sm">
        <p className="text-sm text-[#001E80] font-semibold mb-2">
          {data.subtitle}
        </p>
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4 max-w-[300px]">
          {data.title}
        </h2>
        <p className="text-[#010D3E] max-w-[400px] mb-10">{data.description}</p>
        <ul className="space-y-3 text-sm text-[#010D3E]">
          {data.bullets.map((bullet, index) => (
            <li key={index} className="flex gap-2 items-center">
              <FaCheckCircle className="text-[#001e80af] text-base" /> {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function MatchingTabs() {
  const tabLabels = [
    "AI Matching Time",
    "Exclusive Job Access",
    "Seamless Hiring Process",
    "Easy Apply",
  ];

  const [activeTab, setActiveTab] = useState(tabLabels[0]);

  return (
    <div className="p-10 max-slg:px-0 bg-white min-h-screen flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-2 sm:space-x-4 mb-8">
        {tabLabels.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-5 py-2 rounded-full border border-gray-200 text-sm max-md:text-xs font-medium transition min-w-[172px] max-sm:min-w-[140px] max-sm:px-3 max-sm:py-1.5",
              activeTab === tab
                ? "bg-[#001E80] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full">
        <AnimatePresence mode="wait">
          <TabContent key={activeTab} selectedTab={activeTab} />
        </AnimatePresence>
      </div>
    </div>
  );
}
