import { FaBriefcase } from "react-icons/fa6";
import DashboardNavbar from "../Navbar/Navbar";
import { MdLogout, MdNotifications } from "react-icons/md";

const NavLinks = [
  {
    id: "Jobs",
    navItem: <FaBriefcase />,
    href: "/dashboard/jobs",
  },
  {
    id: "Notifications",
    navItem: <MdNotifications />,
    href: "/dashboard/notifications",
  },
  {
    id: "Sign Out",
    navItem: <MdLogout />,
    href: "/sign-out",
  },
];

const TalentNavbar = () => {
  return (
    <>
      <DashboardNavbar NavLinks={NavLinks} />
    </>
  );
};

export default TalentNavbar;
