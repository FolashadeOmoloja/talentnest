"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout/DashboardLayout";
import TalentNavbar from "@/components/Dashboard/TalentDashboard/TalentNavbar";
import { useGetAppliedJobs } from "@/hooks/job-hook";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
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
  const declinedJobs = appliedJobs.length != 0 ? filterJobs("declined") : [];
  const interviews = appliedJobs.length != 0 ? filterJobs("Interview") : [];
  const hiredJobs = appliedJobs.length != 0 ? filterJobs("hired") : [];

  const talentAnalytics = [
    {
      analtyticsTitle: "Active Job Applications",
      stats: activeAppliedJobs.length,
      desc: `A Total of ${activeAppliedJobs.length} application${
        activeAppliedJobs.length == 0 ? "" : "s"
      }`,
    },
    {
      analtyticsTitle: "Total Applications",
      stats: appliedJobs.length ? appliedJobs.length : 0,
      desc: `active job Applications`,
    },
    {
      analtyticsTitle: "Active Interviews",
      stats: interviews.length,
      desc: "Scheduled Interviews",
    },
    {
      analtyticsTitle: "Total Offers",
      stats: hiredJobs.length,
      desc: `${declinedJobs.length} Rejected Offer`,
    },
  ];

  return (
    <>
      <TalentNavbar activeItem={0} />
      <DashboardLayout
        dashInfo="This is the breakdown of your application info"
        analytics={talentAnalytics}
        link2="/dashboard/my-jobs"
        link1="/dashboard/profile"
        status1={user?.accountStatus ? user?.accountStatus : "Loading"}
        status2={user?.preference ? user?.preference : "Loading"}
        className="max-xslg:h-[230px] max-md:h-[200px]"
      />
    </>
  );
};

export default page;
