import HireTalentNav from "@/components/Dashboard/HireTalentDashboard/HireTalentNav";
import HireTalentProfile from "@/components/Dashboard/Profile/HireTalentProfile";

const page = () => {
  return (
    <>
      <HireTalentNav activeItem={0} />
      <HireTalentProfile />
    </>
  );
};

export default page;
