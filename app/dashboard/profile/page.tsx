import TalentProfile from "@/components/Dashboard/Profile/TalentProfile";
import TalentNavbar from "@/components/Dashboard/TalentDashboard/TalentNavbar";

const page = () => {
  return (
    <>
      <TalentNavbar activeItem={0} />
      <TalentProfile />
    </>
  );
};

export default page;
