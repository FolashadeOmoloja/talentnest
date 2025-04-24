"use client";
import { FaFilter } from "react-icons/fa6";
import JobSearchBar from "../Elements/JobSearchBar";
import Filter from "./Filter";
import JobPosting from "./JobPostings";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "@/redux/slices/jobPostSlice";
import { Loader2 } from "lucide-react";
import { AppDispatch } from "@/redux/store";
import CustomHeader, {
  HeaderTitle,
  ParagraphText,
} from "../Elements/CustomHeader";
import Loader from "../Elements/Loader";

type Job = {
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
};

type FilteredJobs = Job[];

type IsCheckedState = {
  [key: number]: boolean;
};

const JobBoard = ({
  className,
  mainRoute = "job-details",
}: {
  className?: string;
  mainRoute?: string;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const jobPostings = useSelector((state: any) => state.jobPosts.jobPosts);
  const loading = useSelector((state: any) => state.jobPosts.loading);
  useEffect(() => {
    dispatch(fetchJobs()); // Only fetch if no jobs are stored
  }, [dispatch]);

  const [filteredJobs, setFilteredJobs] = useState<FilteredJobs>(jobPostings);
  const [newJobPosting, setNewJobPosting] = useState<FilteredJobs>(jobPostings);
  const [isChecked, setIsChecked] = useState<IsCheckedState>({});
  const [showFilter, setShowFilter] = useState(false);

  return (
    <section className={`  mt-0 `}>
      <CustomHeader>
        <div className="flex flex-col items-center justify-center  relative ">
          <HeaderTitle
            title="Building the future of work together."
            className="max-w-[800px]"
          />
          <ParagraphText
            text={
              <p>
                Find the best jobs curated for you, choose your perfect fit.
              </p>
            }
          />
        </div>
      </CustomHeader>
      <section className="section-container">
        <JobSearchBar
          onNewSearch={setNewJobPosting}
          onSearch={setFilteredJobs}
          jobPosting={jobPostings}
          changeIsCheck={setIsChecked}
        />
        <button
          className="text-2xl text-white mb-7 sm:hidden bg-[#010D3E] w-full h-[50px] rounded-lg flex justify-center items-center shadow-md"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter />
        </button>
        <section className="flex flex-col md:flex-row md:h-full gap-10 max-slg:gap-5">
          <div className={`filterDiv max-sm:${showFilter ? "" : "hidden"}`}>
            <Filter
              onFilter={setFilteredJobs}
              jobPostings={newJobPosting}
              isChecked={isChecked}
              changeIsCheck={setIsChecked}
            />
          </div>
          {!loading ? (
            <div className="flex-grow md:pl-5 pb-5 overflow-y-auto">
              <JobPosting
                filteredJobs={filteredJobs}
                jobPostings={jobPostings}
                mainRoute={mainRoute}
              />
            </div>
          ) : (
            <section className="flex  mt-10 justify-center w-full">
              <Loader />
            </section>
          )}
        </section>
      </section>
    </section>
  );
};

export default JobBoard;
