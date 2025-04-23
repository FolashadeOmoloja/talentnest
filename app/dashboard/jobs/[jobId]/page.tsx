"use client";
import TalentNavbar from "@/components/Dashboard/TalentDashboard/TalentNavbar";
import CTABTN from "@/components/Elements/CTA/CTA-Button";
import Link from "next/link";
import { applyJobHandler } from "@/hooks/job-hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAppliedJobs } from "@/redux/slices/appliedJobSlice"; // Import fetch function
import { AppDispatch } from "@/redux/store";

const DashboardJoblisting = ({ params }: { params: { jobId: string } }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Fetch job postings and applied job IDs
  const jobPostings = useSelector((state: any) => state.jobPosts.jobPosts);
  const { jobIds: appliedJobIds, loading: appliedJobsLoading } = useSelector(
    (state: any) => state.appliedJobs
  );

  const jobData = jobPostings[parseInt(params.jobId)];
  const { onSubmit: applyHandler, loading: applyLoading } = applyJobHandler();
  const jobDataId = jobData?._id ?? ""; // Use optional chaining here
  const isApplied = appliedJobIds.includes(jobDataId);

  // Fetch applied jobs on component mount
  useEffect(() => {
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  return (
    <>
      <TalentNavbar activeItem={1} />
      <main className="section-container relative top-[96px] mt-[50px]">
        <Link
          href={"/dashboard/jobs"}
          className="flex text-[#000080] gap-3 text-xl items-center font-bold"
        >
          <FaArrowLeft />
          <span>Go back</span>
        </Link>
        <h3 className="text-[52px] max-md:text-[38px] max-sm:text-3xl font-bold text-[#111013] md:max-w-[500px] leading-[72px] mb-9 mt-10">
          {jobData?.title}
        </h3>
        <div className="flex md:gap-7 gap-4  md:text-lg flex-wrap md:mb-[100px] mb-[50px]">
          <span>{jobData?.location}</span>
          <span>
            ${jobData?.salaryRange1} - ${jobData?.salaryRange2}
          </span>
          <span>{jobData?.jobProximity}</span>
          <span>{jobData?.experience} level</span>
        </div>
        <section>
          <span className="md:text-2xl text-lg font-bold mb-4 inline-block">
            Description
          </span>
          <p className="tracking-[0.02em] leading-6 text-[#161519]">
            {jobData?.description}
          </p>
        </section>
        <div>
          <span className="mt-20 mb-4 md:text-2xl text-lg font-bold inline-block">
            Skills
          </span>
          <div className="flex gap-4 flex-wrap mb-16">
            {jobData?.skills.map((opt: string, idx: number) => (
              <span
                key={idx}
                className="text-sm h-11 min-w-32 bg-[#000080] rounded-md flex items-center justify-center px-2 text-white font-semibold"
              >
                {opt}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="mb-4 md:text-2xl text-lg font-bold inline-block">
            Experience
          </span>
          <span className="block md:text-lg">{jobData?.experience} level</span>
        </div>
        <div className="my-14">
          <span className="mb-4 md:text-2xl font-bold inline-block ">
            Salary Range
          </span>
          <span className="block md:text-lg">
            ${jobData?.salaryRange1} - ${jobData?.salaryRange2}
          </span>
        </div>

        {appliedJobsLoading ? (
          <p>Loading...</p>
        ) : !isApplied ? (
          <div className="pb-14">
            <CTABTN
              route={""}
              isFunc
              func={() => applyHandler(jobDataId)}
              CTA={applyLoading ? "Applying.." : "Apply"}
              showIcon
            />
          </div>
        ) : (
          <div className="pb-14">
            <CTABTN
              route={""}
              backGround="bg-gray-600 border-gray-600 cursor-not-allowed"
              width="w-[175px]"
              disabled
              CTA={"Already Applied"}
            />
          </div>
        )}
      </main>
    </>
  );
};

export default DashboardJoblisting;
