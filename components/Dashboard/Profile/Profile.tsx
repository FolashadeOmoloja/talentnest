import { userCompanyObject, userObject } from "@/utilities/constants/typeDef";
import LeftSection, { HireLeftSection } from "./LeftSection";
import ProfileDetails from "./ProfileDetails";

const Profile = ({
  skillsBool,
  user,
  skillsArr,
}: {
  skillsBool: boolean;
  user: object;
  skillsArr: [string];
}) => {
  return (
    <section className="dashboard-container min-h-svh flex max-md:flex-col gap-14 max-slg:gap-8">
      {skillsBool ? (
        <LeftSection user={user as userObject} />
      ) : (
        <HireLeftSection user={user as userCompanyObject} />
      )}
      <ProfileDetails
        skillsBool={skillsBool}
        user={user as userObject}
        skillsArr={skillsArr}
      />
    </section>
  );
};

export default Profile;
