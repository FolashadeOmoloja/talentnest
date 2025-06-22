"use client";
import { FaFilter } from "react-icons/fa6";
import JobSearchBar from "../Elements/JobSearchBar";
import Filter from "./Filter";
import JobPosting from "./JobPostings";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "@/redux/slices/jobPostSlice";
import { AppDispatch } from "@/redux/store";
import CustomHeader, {
  HeaderTitle,
  ParagraphText,
} from "../Elements/CustomHeader";
import Loader from "../Elements/Loader";
import {
  IsCheckedState,
  JobPosted,
  Jobs,
  SelectedFilters,
  SelectedSearchFilters,
} from "@/utilities/constants/typeDef";

const JobBoard = ({
  mainRoute = "job-details",
  background = "bg-[#EAEEFE]",
  option = "bg-white text-[#010D3E]",
  filterBg = "",
  ctaBg = "bg-white",
  ctaColor = "text-[#010D3E]",
  dropdownBg = "",
}: {
  mainRoute?: string;
  background?: string;
  option?: string;
  filterBg?: string;
  ctaBg?: string;
  ctaColor?: string;
  dropdownBg?: string;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const jobPostings = useSelector((state: any) => state.jobPosts.jobPosts);
  const loading = useSelector((state: any) => state.jobPosts.loading);
  useEffect(() => {
    dispatch(fetchJobs()); // Only fetch if no jobs are stored
  }, [dispatch]);
  useEffect(() => {
    setFilteredJobs(jobPostings);
  }, [jobPostings]);
  const [filteredJobs, setFilteredJobs] = useState<Jobs[]>(jobPostings);
  const [isChecked, setIsChecked] = useState<IsCheckedState>({});
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    hours: [],
    proximity: [],
    experience: [],
  });

  const [searchFilters, setSearchFilters] = useState<SelectedSearchFilters>({
    industry: "",
    country: "",
    skills: "",
  });

  useEffect(() => {
    const newFilteredJobs = jobPostings.filter((job: JobPosted) => {
      const hoursMatch = selectedFilters.hours.length
        ? selectedFilters.hours.includes(job.jobHours)
        : true;
      const proximityMatch = selectedFilters.proximity.length
        ? selectedFilters.proximity.includes(job.jobProximity)
        : true;
      const experienceMatch = selectedFilters.experience.length
        ? selectedFilters.experience.includes(job.experience)
        : true;
      const industryMatch = searchFilters.industry
        ? job.department
            .toLowerCase()
            .includes(searchFilters.industry.toLowerCase())
        : true;
      const countryMatch = searchFilters.country
        ? job.country
            .toLowerCase()
            .includes(searchFilters.country.toLowerCase())
        : true;
      const skillsMatch = searchFilters.skills
        ? job.skills
            .map((s) => s.toLowerCase())
            .includes(searchFilters.skills.toLowerCase())
        : true;

      return (
        hoursMatch &&
        proximityMatch &&
        experienceMatch &&
        industryMatch &&
        countryMatch &&
        skillsMatch
      );
    });

    setFilteredJobs(newFilteredJobs);
  }, [selectedFilters, searchFilters]);

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
          setFilteredJobs={setFilteredJobs}
          jobPostings={jobPostings}
          changeIsCheck={setIsChecked}
          dropdownBg={dropdownBg}
          filteredJobs={jobPostings}
          setSelectedFilters={setSelectedFilters}
          setSearchFilters={setSearchFilters}
        />
        <button
          className="text-2xl text-white mb-7 sm:hidden bg-[#010D3E] w-full h-[50px] rounded-lg flex justify-center items-center shadow-md"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter />
        </button>
        <section className="flex flex-col md:flex-row md:h-full gap-10 max-slg:gap-5">
          <div
            className={`filterDiv ${filterBg} max-sm:${
              showFilter ? "" : "hidden"
            }`}
          >
            <Filter
              isChecked={isChecked}
              changeIsCheck={setIsChecked}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>
          {!loading ? (
            <div className="flex-grow md:pl-5 pb-5 overflow-y-auto">
              <JobPosting
                filteredJobs={filteredJobs}
                jobPostings={jobPostings}
                mainRoute={mainRoute}
                background={background}
                option={option}
                ctaBg={ctaBg}
                ctaColor={ctaColor}
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
