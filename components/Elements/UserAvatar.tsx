import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import ClientProvider from "../Client/ClientProvider";

const UserAvatar = () => {
  const { user } = useSelector((store: any) => store.auth);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <ClientProvider>
      <div
        className="centered max-xsm:justify-start gap-4 cursor-pointer relative"
        onClick={toggleDropdown}
      >
        <div className="w-[51px] h-[51px] rounded-full overflow-hidden shadow-sm">
          {user?.profileImage ? (
            <img
              src={user?.profileImage}
              alt="Profile"
              className="object-center object-cover w-full h-full"
            />
          ) : (
            <div
              className={`w-full h-full text-white text-2xl font-bold centered`}
              style={{ background: user?.hex }}
            >
              {user?.firstName[0]}
            </div>
          )}
        </div>
      </div>
    </ClientProvider>
  );
};

export default UserAvatar;
