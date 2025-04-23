"use client";

import { useEffect, useState } from "react";
import JobTable from "./JobTable";
import { activeColumns, JobApplication } from "@/utilities/tableData";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useGetAppliedJobs } from "@/hooks/job-hook";

type IsActiveState = {
  [key: number]: boolean;
};

const MyJobTables = () => {
  const filterArr = ["Active Applications", "Declined", "Hired"];
  const { user } = useSelector((store: any) => store.auth);
  const jobPostings = useSelector((state: any) => state.jobPosts.jobPosts);
  const { appliedJobs, loading } = useGetAppliedJobs();
  const [active, setActive] = useState<IsActiveState>({ [0]: true });
  const [changeTable, setChangeTable] = useState(0);
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

  const activeAppliedJobs = changeTable === 0 ? filterJobs("Under Review") : [];
  const declinedJobs = changeTable === 1 ? filterJobs("declined") : [];
  const hiredJobs = changeTable === 2 ? filterJobs("hired") : [];

  // Function to handle active tab change
  const activeFunc = (idx: number) => {
    const newState: IsActiveState = {};
    filterArr.forEach((_, i) => (newState[i] = i === idx));
    setActive(newState);
    setChangeTable(idx);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="dashboard-container min-h-svh">
      <h2 className="text-2xl font-bold mb-1">
        {mounted && user?.firstName ? `${user.firstName}` : "You can"}, see how
        your application is going
      </h2>
      <span className="text-[#7C8698]">
        This is your complete frack overview
      </span>
      <div className="flex w-full text-[#626263] md:text-lg font-bold mt-16 border-b border-[#CCD2D9]">
        {filterArr.map((item, idx) => (
          <span
            className={`tab ${active[idx] ? "active" : ""} max-sm:h-[50px]`}
            key={idx}
            onClick={() => activeFunc(idx)}
          >
            {item}
          </span>
        ))}
      </div>
      {changeTable === 0 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#000080]" />
        ) : activeAppliedJobs.length === 0 ? (
          <p className="mt-10 text-[#000040] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <JobTable<JobApplication>
            data={activeAppliedJobs}
            columns={activeColumns}
          />
        )
      ) : changeTable === 1 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#000080]" />
        ) : declinedJobs.length === 0 ? (
          <p className="mt-10 text-[#000040] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <JobTable<JobApplication>
            data={declinedJobs}
            columns={activeColumns}
          />
        )
      ) : changeTable === 2 ? (
        hiredJobs.length === 0 ? (
          <p className="mt-10 text-[#000040] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <JobTable<JobApplication> data={hiredJobs} columns={activeColumns} />
        )
      ) : null}
    </section>
  );
};

export default MyJobTables;
