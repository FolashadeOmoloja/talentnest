import EditJobs from "@/components/Dashboard/HireTalentDashboard/EditJobs";
import HireTalentNav from "@/components/Dashboard/HireTalentDashboard/HireTalentNav";

const EditJobPage = ({ params }: { params: { editId: string } }) => {
  return (
    <>
      <HireTalentNav />
      <EditJobs />
    </>
  );
};

export default EditJobPage;
