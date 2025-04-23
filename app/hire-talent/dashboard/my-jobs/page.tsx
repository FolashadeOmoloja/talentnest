import CompanyJobTables from "@/components/Dashboard/HireTalentDashboard/CompanyJobTables";
import HireTalentNav from "@/components/Dashboard/HireTalentDashboard/HireTalentNav";
import HireTalentProfile from "@/components/Dashboard/Profile/HireTalentProfile";

const page = () => {
  return (
    <>
      <HireTalentNav activeItem={1} />
      <CompanyJobTables />
    </>
  );
};

export default page;
