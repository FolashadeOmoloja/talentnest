import AddJobs from "@/components/Dashboard/HireTalentDashboard/AddJobs";
import HireTalentNav from "@/components/Dashboard/HireTalentDashboard/HireTalentNav";
import React from "react";

const page = () => {
  return (
    <>
      <HireTalentNav activeItem={0} />
      <AddJobs />
    </>
  );
};

export default page;
