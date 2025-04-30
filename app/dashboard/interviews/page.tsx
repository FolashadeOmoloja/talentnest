"use client";

import { activeColumns, JobApplication } from "@/utilities/tableData";
import { useSelector } from "react-redux";
import { useGetAppliedJobs } from "@/hooks/job-hook";
import JobTable from "@/components/Dashboard/TalentDashboard/JobTable";
import TalentNavbar from "@/components/Dashboard/TalentDashboard/TalentNavbar";
import { useState, useEffect } from "react";

const MyJobTables = () => {
  const { user } = useSelector((store: any) => store.auth);
  const jobPostings = useSelector((state: any) => state.jobPosts.jobPosts);

  const { appliedJobs } = useGetAppliedJobs();
  const mergedJobs = appliedJobs
    .map((appliedJob: any) => {
      const jobPosting = jobPostings.find(
        (job: any) => job._id === appliedJob.job
      );
      if (jobPosting) {
        return {
          ...jobPosting,
          status: appliedJob.status,
        };
      }
      return null;
    })
    .filter((job: any) => job !== null);

  // Function to filter jobs based on status
  const filterJobs = (status: string) => {
    return mergedJobs.filter((job: { status: string }) =>
      job.status.toLowerCase().includes(status.toLowerCase())
    );
  };

  const interviews = appliedJobs.length != 0 ? filterJobs("Interview") : [];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <TalentNavbar />
      <section className="dashboard-container min-h-svh">
        <h2 className="text-2xl font-bold mb-1">
          {mounted && user?.firstName ? `${user.firstName} ` : ""}, stay on
          track with your Interviews
        </h2>

        <span className="text-[#7C8698]">Track your TalentNest Interviews</span>

        <div className="flex w-full text-[#626263] md:text-lg font-bold mt-16 border-b-[3px] border-[#010D3E]">
          <span
            className={`tab active max-sm:h-[50px]`}
            style={{ justifyContent: "flex-start" }}
          >
            Your Nest Interviews
          </span>
        </div>
        {interviews.length === 0 ? (
          <p className="mt-10 text-[#000040] italic text-2xl">
            Nothing yet, keep applying!
          </p>
        ) : (
          <JobTable<JobApplication> data={interviews} columns={activeColumns} />
        )}
      </section>
    </>
  );
};

export default MyJobTables;
