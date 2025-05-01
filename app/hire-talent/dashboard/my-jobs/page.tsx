import CompanyJobTables from "@/components/Dashboard/HireTalentDashboard/CompanyJobTables";
import HireTalentNav from "@/components/Dashboard/HireTalentDashboard/HireTalentNav";
import HireTalentProfile from "@/components/Dashboard/Profile/HireTalentProfile";

const page = () => {
  return (
    <>
      <HireTalentNav />
      <CompanyJobTables />
    </>
  );
};

export default page;
