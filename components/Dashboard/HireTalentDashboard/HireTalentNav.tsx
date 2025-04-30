import { MdLogout, MdNotifications } from "react-icons/md";
import DashboardNavbar from "../Navbar/Navbar";
import { FaBriefcase } from "react-icons/fa";

const NavLinks = [
  {
    id: "Jobs",
    navItem: <FaBriefcase />,
    href: "/hire-talent/dashboard/my-jobs",
  },
  {
    id: "Notifications",
    navItem: <MdNotifications />,
    href: "/hire-talent/dashboard/notifications",
  },
  {
    id: "Sign Out",
    navItem: <MdLogout />,
    href: "/hire-talent/sign-out",
  },
];

const HireTalentNav = () => {
  return (
    <>
      <DashboardNavbar NavLinks={NavLinks} company />
    </>
  );
};

export default HireTalentNav;
