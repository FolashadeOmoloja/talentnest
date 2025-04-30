"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout/DashboardLayout";
import TalentNavbar from "@/components/Dashboard/TalentDashboard/TalentNavbar";
import { useGetAppliedJobs } from "@/hooks/job-hook";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FaClipboardList, FaHandshake, FaNewspaper } from "react-icons/fa6";
import { IoDocuments } from "react-icons/io5";
import { useSelector } from "react-redux";

const page = () => {
  const searchParams = useSearchParams();
  const { user } = useSelector((store: any) => store.auth);

  useEffect(() => {
    const refresh = searchParams.get("refresh");

    if (refresh) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [searchParams]);

  const { appliedJobs } = useGetAppliedJobs();
  const filterJobs = (status: string) => {
    return appliedJobs.filter((job: { status: string }) =>
      job.status.toLowerCase().includes(status.toLowerCase())
    );
  };

  const activeAppliedJobs =
    appliedJobs.length != 0 ? filterJobs("Under Review") : [];
  const interviews = appliedJobs.length != 0 ? filterJobs("Interview") : [];
  const hiredJobs = appliedJobs.length != 0 ? filterJobs("hired") : [];

  const talentAnalytics = [
    {
      analtyticsTitle: "Active Applications",
      stats: activeAppliedJobs.length,
      desc: <FaNewspaper />,
    },
    {
      analtyticsTitle: "Total Applications",
      stats: appliedJobs.length ? appliedJobs.length : 0,
      desc: <IoDocuments />,
    },
    {
      analtyticsTitle: "Scheduled Interviews",
      stats: interviews.length,
      desc: <FaClipboardList />,
    },
    {
      analtyticsTitle: "Offers Received",
      stats: hiredJobs.length,
      desc: <FaHandshake />,
    },
  ];

  return (
    <>
      <TalentNavbar />
      <DashboardLayout
        dashInfo="Ready to land your next opportunity?"
        analytics={talentAnalytics}
        link1="/dashboard/my-jobs"
        link2="/dashboard/interviews"
        link3="/dashboard/offers"
        status1={user?.accountStatus ? user?.accountStatus : "Loading"}
        status2={user?.preference ? user?.preference : "Loading"}
        cardDesc1={
          activeAppliedJobs.length == 0
            ? "No active applications yet."
            : `A Total of ${activeAppliedJobs.length} active application${
                activeAppliedJobs.length == 1 ? "" : "s"
              }`
        }
        cardDesc2={
          interviews.length == 0
            ? "   No interviews scheduled yet."
            : `You have ${interviews.length} scheduled interview${
                interviews.length == 1 ? "" : "s"
              }`
        }
        cardDesc3={
          hiredJobs.length == 0
            ? "No offers yet."
            : `You have ${hiredJobs.length} offer${
                hiredJobs.length == 1 ? "" : "s"
              }`
        }
        cardTitle1="Your Applications"
        cardTitle2="Scheduled Interviews"
        cardTitle3="Offers"
        user={user?.firstName ? user?.firstName : ""}
      />
    </>
  );
};

export default page;
