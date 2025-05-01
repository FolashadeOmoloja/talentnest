"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout/DashboardLayout";
import HireTalentNav from "@/components/Dashboard/HireTalentDashboard/HireTalentNav";
import { useGetAllFilters } from "@/hooks/content-hook";
import {
  useGetAllCompanyEmployed,
  useGetCompanyJobs,
  useGetAllActiveApp,
} from "@/hooks/job-hook";
import { JobPosted, userObject } from "@/utilities/constants/typeDef";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { FaPeopleGroup, FaPersonCircleCheck } from "react-icons/fa6";
import { IoDocuments } from "react-icons/io5";
import { useSelector } from "react-redux";

interface Application {
  job: JobPosted;
  talent: userObject;
}

const page = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const refresh = searchParams.get("refresh");

    if (refresh) {
      // Remove the `?refresh=true` from the URL without reloading the page
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [searchParams]);

  const { jobs } = useGetCompanyJobs();
  const { filter } = useGetAllFilters();
  const { user } = useSelector((store: any) => store.auth);
  const getFilter = filter;

  // Function to filter jobs based on status
  const filterJobs = (status: string) => {
    return jobs.filter((job) =>
      //@ts-ignore
      job.status?.toLowerCase().includes(status.toLowerCase())
    );
  };

  // Recalculate the jobs when `jobs` or `changeTable` changes
  const openedJobs = jobs.length != 0 ? filterJobs("open") : [];
  const closedJobs = jobs.length != 0 ? filterJobs("closed") : [];
  const { successApplications } = useGetAllCompanyEmployed();
  const { activeApplications, interviewApplications } = useGetAllActiveApp();

  const uniqueJobs: JobPosted[] = [];
  const uniqueTalents: userObject[] = [];

  // Create sets to track IDs and ensure uniqueness
  const jobIds = new Set<string>();
  const talentIds = new Set<string>();

  successApplications.forEach((application: Application) => {
    // Check for job duplicates
    if (!jobIds.has(application.job._id)) {
      jobIds.add(application.job._id);
      uniqueJobs.push(application.job);
    }

    // Check for talent duplicates
    if (!talentIds.has(application.talent._id)) {
      talentIds.add(application.talent._id);
      uniqueTalents.push(application.talent);
    }
  });

  // const companyAnalytics = [
  //   {
  //     analtyticsTitle: "Total Job Offers",
  //     stats: jobs.length != 0 ? jobs.length : 0,
  //     desc: `${openedJobs.length} open job listings`,
  //   },
  //   {
  //     analtyticsTitle: "Total Applicants",
  //     stats: activeApplications.length != 0 ? activeApplications.length : 0,
  //     desc: "Active Applicants for jobs",
  //   },
  //   {
  //     analtyticsTitle: "Talent Interviews", //notifications
  //     stats:
  //       interviewApplications.length != 0 ? interviewApplications.length : 0,
  //     desc: "Active Interviews for jobs",
  //   },
  //   {
  //     analtyticsTitle: "Employed Talents",
  //     stats: uniqueTalents.length != 0 ? uniqueTalents.length : 0,
  //     desc: `${uniqueJobs.length != 0 ? uniqueJobs.length : 0} Job Categories`,
  //   },
  // ];
  const companyAnalytics = [
    {
      analtyticsTitle: "Total Job Offers",
      stats: jobs.length != 0 ? jobs.length : 0,
      desc: <BiSolidBadgeCheck />,
    },
    {
      analtyticsTitle: "Total Applicants",
      stats: activeApplications.length != 0 ? activeApplications.length : 0,
      desc: <IoDocuments />,
    },
    {
      analtyticsTitle: "Talent Interviews", //notifications
      stats:
        interviewApplications.length != 0 ? interviewApplications.length : 0,
      desc: <FaPeopleGroup />,
    },
    {
      analtyticsTitle: "Employed Talents",
      stats: uniqueTalents.length != 0 ? uniqueTalents.length : 0,
      desc: <FaPersonCircleCheck />,
    },
  ];
  return (
    <>
      <HireTalentNav />
      <DashboardLayout
        dashInfo="Ready to hire your next talent?"
        analytics={companyAnalytics}
        link1="/hire-talent/dashboard/add-job"
        link2="/hire-talent/dashboard/my-jobs"
        link3="/hire-talent/dashboard/talents"
        cardDesc1={"Build your dream team with the best talents"}
        cardDesc2={
          openedJobs.length == 0
            ? "You have no active job listing."
            : `${openedJobs.length} open job listing${
                openedJobs.length == 1 ? "" : "s"
              }`
        }
        cardDesc3={
          uniqueTalents.length == 0
            ? "No hires yet but don't worry, TalentNest is here to help you."
            : `${uniqueTalents.length} successful hire${
                uniqueTalents.length == 1 ? "" : "s"
              }`
        }
        cardTitle1="Post a job +"
        cardTitle2="Your Nest Job Listings"
        cardTitle3="Sucessful Hires"
        status1={user?.accountStatus ? user?.accountStatus : "Loading"}
        status2={user?.preference ? user?.preference : "Loading"}
        user={user?.companyName ? user?.companyName : ""}
        userId={user?._id}
        company
      />
    </>
  );
};

export default page;
