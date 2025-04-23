import ProfilePhotoHandler from "@/components/Elements/profilePhotoHandler";
import { userCompanyObject, userObject } from "@/utilities/constants/typeDef";
import { FaLinkedin } from "react-icons/fa6";

const LeftSection = ({ user }: { user: userObject }) => {
  return (
    <aside className="basis-[30%] flex flex-col gap-10">
      <div className="bg-white rounded-md h-[680px] flex flex-col px-4 centered ">
        <ProfilePhotoHandler user={user} talent />
        <span className="font-semibold text-3xl mt-8">
          {user.firstName} {user.lastName}
        </span>
        <span className="font-bold text-[#7C8698] mt-6">{user.profession}</span>
        <span className="font-bold text-[#7C8698] mt-6">
          {user.location}, {user.country}
        </span>
        <div className="py-4 px-6 centered bg-[#000080] text-white rounded-md font-semibold mt-11">
          Profile status: {user.accountStatus}
        </div>
      </div>
      <div className="bg-white rounded-md  flex justify-between gap-7 p-6 max-xsm:flex-col max-xsm:gap-4 max-xsm:p-4">
        <span className="text-[#0A66C2] text-3xl">
          <FaLinkedin />
        </span>
        <span className="text-sm text-[#7C8698] font-semibold text-wrap">
          {user.linkedInUrl}
        </span>
      </div>
    </aside>
  );
};

export default LeftSection;

export const HireLeftSection = ({ user }: { user: userCompanyObject }) => {
  return (
    <aside className="basis-[30%] flex flex-col gap-10">
      <div className="bg-white rounded-md h-[680px] flex flex-col px-4 centered ">
        <ProfilePhotoHandler user={user} talent={false} />
        <span className="font-semibold text-3xl mt-8">{user?.companyName}</span>
        <span className="font-bold text-[#7C8698] mt-6">
          {user?.industry.join(",")}
        </span>
        <span className="font-bold text-[#7C8698] mt-6">
          {user?.location}, {user?.country}
        </span>
        <div className="py-4 px-6 centered bg-[#000080] text-white rounded-md font-semibold mt-11">
          Profile status: {user?.accountStatus}
        </div>
      </div>
      <div className="bg-white rounded-md  flex justify-between gap-7 p-6 max-xsm:flex-col max-xsm:gap-4 max-xsm:p-4">
        <span className="text-[#0A66C2] text-3xl">
          <FaLinkedin />
        </span>
        <span className="text-sm text-[#7C8698] font-semibold">
          {user?.linkedInUrl}
        </span>
      </div>
    </aside>
  );
};
