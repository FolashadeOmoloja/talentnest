"use client";

import { useEffect, useState } from "react";
import JobTable from "../TalentDashboard/JobTable";
import { companyActiveColumns, closedJobsColumns } from "@/utilities/tableData";
import { JobPosted } from "@/utilities/constants/typeDef";
import { useGetCompanyJobs } from "@/hooks/job-hook";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { handleSendNotification } from "@/hooks/notification-hook";

type IsActiveState = {
  [key: number]: boolean;
};

const CompanyJobTables = () => {
  const filterArr = ["Active Jobs", "Closed Jobs"];
  const { jobs, loading } = useGetCompanyJobs();
  const [active, setActive] = useState<IsActiveState>({ 0: true });
  const [changeTable, setChangeTable] = useState(0);
  const { user } = useSelector((store: any) => store.auth);
  const { onSubmit: createNotice, loading: noticeLoading } =
    handleSendNotification();

  // Function to filter jobs based on status
  const filterJobs = (status: string) => {
    return jobs.filter((job) =>
      //@ts-ignore
      job.status?.toLowerCase().includes(status.toLowerCase())
    );
  };

  // Recalculate the jobs when `jobs` or `changeTable` changes
  const openedJobs = changeTable === 0 ? filterJobs("open") : [];
  const closedJobs = changeTable === 1 ? filterJobs("closed") : [];

  const activeFunc = (idx: number) => {
    const newState: IsActiveState = {};
    filterArr.forEach((_, i) => (newState[i] = i === idx));
    setActive(newState);
    setChangeTable(idx); // Change the table based on active tab index
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = () => {
    const meetingUrl = "";

    const senderMessage = `
 ${user.companyName} has requested a meeting with TalentNest.
  `;
    const receiverMessage = `You’ve successfully requested a meeting with TalentNest! We’ll get back to you soon to confirm the details.`;

    createNotice(user._id, senderMessage, receiverMessage, meetingUrl);
  };

  return (
    <section className="dashboard-container min-h-svh">
      <h2 className="text-2xl font-bold mb-1 bg-text">
        {mounted && user?.companyName ? `${user.companyName}` : "You can"},
        Track Your Recruitment Progress
      </h2>
      <span className="text-gray-500">
        Here's a full overview of your active and inactive job listings.
      </span>
      <div className="flex w-full text-gray-500 md:text-lg font-bold mt-16 border-b border-gray-500">
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
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
        ) : openedJobs.length === 0 ? (
          <p className="mt-10 text-[#000040] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <JobTable<JobPosted>
            data={openedJobs}
            columns={companyActiveColumns}
          />
        )
      ) : changeTable === 1 ? (
        loading ? (
          <Loader2 className=" h-14 w-14 animate-spin ml-10 mt-10 text-[#010D3E]" />
        ) : closedJobs.length === 0 ? (
          <p className="mt-10 text-[#000040] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <JobTable<JobPosted> data={closedJobs} columns={closedJobsColumns} />
        )
      ) : null}
      <button
        onClick={onSubmit}
        className="py-4 px-6 max-w-[350px] mt-10 bg-[#010D3E] text-white rounded-md font-semibold btn-hover max-md:text-sm max-sm:px-4 max-sm:font-medium"
      >
        {noticeLoading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Requesting Meeting. . .
          </div>
        ) : (
          "Request For Meeting with TalentNest"
        )}
      </button>
      <p className="text-gray-600 text-sm mb-4 italic">
        (Request for a meeting with TalentNest to discuss job details)
      </p>
    </section>
  );
};

export default CompanyJobTables;
