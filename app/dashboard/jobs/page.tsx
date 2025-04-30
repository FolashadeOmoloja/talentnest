import TalentNavbar from "@/components/Dashboard/TalentDashboard/TalentNavbar";
import JobBoard from "@/components/JobBoard/JobBoard";

const TalentJobPage = () => {
  return (
    <>
      <TalentNavbar />
      <JobBoard
        option="bg-[#010D3E] text-white"
        mainRoute="./dashboard/jobs"
        background="bg-white"
        filterBg="bg-white"
        ctaBg="bg-[#010D3E]"
        ctaColor="text-white"
        dropdownBg="bg-white"
      />
    </>
  );
};

export default TalentJobPage;
