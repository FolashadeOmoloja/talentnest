import { FaBriefcase, FaLocationDot, FaStar } from "react-icons/fa6";
import CTABTN from "../Elements/CTA/CTA-Button";
import { GiProgression } from "react-icons/gi";

type filteredJobs = {
  title: string;
  company: string;
  location: string;
  priceRange: string;
  jobProximity: string;
  jobHours: string;
  experience: string;
  skills: string[];
  role: string;
  country: string;
}[];
const JobPosting = ({
  filteredJobs,
  jobPostings,
  mainRoute,
}: {
  filteredJobs: filteredJobs;
  jobPostings: filteredJobs;
  mainRoute?: string;
}) => {
  return (
    <section>
      <h4 className="text-[#7C8698] text-sm font-[500] mb-5">
        Showing {filteredJobs.length} of {jobPostings.length} jobs
      </h4>
      <section className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        {filteredJobs.map((item, idx) => (
          <section
            key={idx}
            className="bg-[#EAEEFE] rounded-xl shadow-md p-6 flex flex-col col-span-1"
          >
            <div className="flex justify-between mb-3 items-center max-xsm:gap-1">
              <h6 className="text-xl font-semibold">{item.title}</h6>
              <CTABTN
                route={`/${mainRoute}/${idx}`}
                CTA="View Job"
                width="w-[138px] rounded-xl h-11 text-sm"
                height="h-[44px]"
                backGround="bg-white"
                color="text-[#010D3E]"
              />
            </div>
            <div className="flex gap-3  mb-7 flex-wrap text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <FaLocationDot />
                <span className="mt-1">{item.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaBriefcase />
                <span className="mt-1">{item.jobProximity}</span>
              </p>
              <p className="flex items-center  gap-2">
                <GiProgression />
                <span className="mt-1">{item.experience}</span>
              </p>

              {/* <span>{item.priceRange}</span> */}
            </div>
            <div className="flex gap-4 flex-wrap">
              {item.skills.map((opt, idx) => (
                <span
                  key={idx}
                  className="text-xs h-8 min-w-32 bg-white rounded-xl flex items-center justify-center px-2 text-[#010D3E] font-semibold"
                >
                  {opt}
                </span>
              ))}
            </div>
          </section>
        ))}
      </section>
    </section>
  );
};

export default JobPosting;
