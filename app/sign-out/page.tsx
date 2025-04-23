import DashboardSignOut from "@/components/SignOut/SignOut";
import { TALENT_API_END_POINT } from "@/utilities/constants/constants";

const page = () => {
  return (
    <>
      <DashboardSignOut END_POINT={TALENT_API_END_POINT} />
    </>
  );
};

export default page;
