"use client";
import TalentNavbar from "@/components/Dashboard/TalentDashboard/TalentNavbar";
import CTABTN from "@/components/Elements/CTA/CTA-Button";
import Link from "next/link";
import { applyJobHandler } from "@/hooks/job-hook";
import { FaArrowLeft } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAppliedJobs } from "@/redux/slices/appliedJobSlice"; // Import fetch function
import { AppDispatch } from "@/redux/store";
import DOMPurify from "dompurify";
import { JOB_API_END_POINT } from "@/utilities/constants/constants";

const DashboardJoblisting = ({ params }: { params: { jobId: string } }) => {
  const dispatch = useDispatch<AppDispatch>();
  const jobPostings = useSelector((state: any) => state.jobPosts.jobPosts);
  const { user } = useSelector((state: any) => state.auth);

  const [jobData, setJobData] = useState<any>(null);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const { jobIds: appliedJobIds, loading: appliedJobsLoading } = useSelector(
    (state: any) => state.appliedJobs
  );
  useEffect(() => {
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  // Try to find job from Redux store first
  useEffect(() => {
    const localJob = jobPostings.find((job: any) => job.slug === params.jobId);

    if (localJob) {
      setJobData(localJob);
      setLoadingJobs(false);
    } else {
      // If not found, fetch from backend
      fetch(`${JOB_API_END_POINT}/getJob/${params.jobId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setJobData(data.job);
          } else {
            setJobData(null);
          }
        })
        .catch((err) => {
          console.error("Error fetching job from backend", err);
          setJobData(null);
        })
        .finally(() => {
          setLoadingJobs(false);
        });
    }
  }, [jobPostings, params.jobId]);

  useEffect(() => {
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  const { onSubmit: applyHandler, loading: applyLoading } = applyJobHandler();
  const jobDataId = jobData?._id ? jobData._id : "";
  const isApplied = appliedJobIds.includes(jobDataId);

  // Fetch applied jobs on component mount
  useEffect(() => {
    dispatch(fetchAppliedJobs());
  }, [dispatch]);
  const sanitizedDescription = DOMPurify.sanitize(
    jobData?.descriptionHtml ? jobData.descriptionHtml : jobData?.description
  );

  return (
    <>
      <TalentNavbar />
      <main className="">
        <section className="section-container relative top-[96px] mt-[50px]  max-w-4xl lg:p-0 mx-auto space-y-8">
          <Link
            href={"/dashboard/jobs"}
            className="flex text-[#010d3e] hover:text-black gap-3 text-xl items-center font-bold"
          >
            <FaArrowLeft />
            <span>Go back</span>
          </Link>

          {/* Header */}
          <div className="space-y-2 smd:text-center">
            <h2 className="text-5xl font-bold text-[#010D3E] mb-5">
              {jobData?.title}
            </h2>
            <div className="flex flex-wrap smd:justify-center gap-4 text-sm text-gray-600">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                📍 {jobData?.location}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                💼 {jobData?.experience}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                🖥 {jobData?.jobProximity}
              </span>
              <span className="bg-blue-100 text-[#001354] px-3 py-1 rounded-full">
                💰 ${jobData?.salaryRange1} - ${jobData?.salaryRange2}
              </span>
            </div>
          </div>

          {/* Main Card */}
          <div className="smd:bg-white rounded-2xl smd:shadow-lg p-8 max-sm:p-4 max-smd:p-0 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Description
              </h2>
              <div className="tracking-[1%] blog-post text-gray-700 text-sm leading-relaxed ">
                <div
                  className="ql-editor template-quill description"
                  dangerouslySetInnerHTML={{
                    __html: sanitizedDescription
                      ? sanitizedDescription
                      : "No description available.",
                  }}
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {jobData?.skills.map((opt: string, idx: number) => (
                  <span
                    key={opt}
                    className="bg-[#010D3E] text-white text-sm px-4 py-1.5 rounded-full"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience & Salary */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Experience
                </h2>
                <p className="text-sm text-gray-700 font-medium">
                  {jobData?.experience}
                </p>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  Salary Range
                </h2>
                <p className="text-sm text-gray-700 font-medium">
                  {" "}
                  ${jobData?.salaryRange1} - ${jobData?.salaryRange2}
                </p>
              </div>
            </div>
          </div>
          {/*button */}
          {appliedJobsLoading ? (
            <p>Loading...</p>
          ) : !isApplied ? (
            <div className="pb-14">
              <CTABTN
                route={""}
                isFunc
                func={() => applyHandler(jobDataId)}
                CTA={applyLoading ? "Applying.." : "Easy Apply"}
                showIcon
              />
            </div>
          ) : (
            <div className="pb-14">
              <CTABTN
                route={""}
                backGround="bg-gray-800 border-gray-600 cursor-not-allowed"
                width="w-[175px]"
                disabled
                CTA={"Already Applied"}
              />
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default DashboardJoblisting;
