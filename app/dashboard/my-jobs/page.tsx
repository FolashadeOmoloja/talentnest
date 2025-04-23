import MyJobTables from "@/components/Dashboard/TalentDashboard/MyJobTables";
import TalentNavbar from "@/components/Dashboard/TalentDashboard/TalentNavbar";

const MyJobsPage = () => {
  return (
    <>
      <TalentNavbar activeItem={1} />
      <MyJobTables />
    </>
  );
};

export default MyJobsPage;
