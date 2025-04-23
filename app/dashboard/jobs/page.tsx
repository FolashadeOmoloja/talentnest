import TalentNavbar from "@/components/Dashboard/TalentDashboard/TalentNavbar";
import JobBoard from "@/components/JobBoard/JobBoard";

const TalentJobPage = () => {
  return (
    <>
      <TalentNavbar activeItem={1} />
      <JobBoard className="relative top-[96px]" mainRoute="./dashboard/jobs" />
    </>
  );
};

export default TalentJobPage;
