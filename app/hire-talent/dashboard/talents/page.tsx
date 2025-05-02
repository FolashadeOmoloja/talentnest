"use client";

import { useEffect, useState } from "react";
import { hiredCandidatesColumn } from "@/utilities/tableData";
import { SuccessApplications } from "@/utilities/constants/typeDef";
import { useGetAllCompanyEmployed } from "@/hooks/job-hook";
import { useSelector } from "react-redux";
import JobTable from "@/components/Dashboard/TalentDashboard/JobTable";
import HireTalentNav from "@/components/Dashboard/HireTalentDashboard/HireTalentNav";

const page = () => {
  const { successApplications } = useGetAllCompanyEmployed();
  const { user } = useSelector((store: any) => store.auth);
  const hiredCandidates = successApplications || [];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <HireTalentNav />
      <section className="dashboard-container min-h-svh">
        <h2 className="text-2xl font-bold mb-1 bg-text">
          {mounted && user?.companyName ? `${user.companyName}` : "You can"},
          see your successful hires
        </h2>
        <span className="text-[#7C8698]">
          Here's a list of all the candidates you have successfully hired.
        </span>
        <div className="flex w-full text-[#010D3E] md:text-lg font-bold mt-16 border-b-[3px] border-[#010D3E]">
          <span
            className={`tab active max-sm:h-[50px]`}
            style={{ justifyContent: "flex-start" }}
          >
            Employed Talents
          </span>
        </div>

        {hiredCandidates.length === 0 ? (
          <p className="mt-10 text-[#000040] italic text-2xl">
            No data available at the moment.
          </p>
        ) : (
          <JobTable<SuccessApplications>
            data={hiredCandidates}
            columns={hiredCandidatesColumn}
          />
        )}
      </section>
    </>
  );
};

export default page;
