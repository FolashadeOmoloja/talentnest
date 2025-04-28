import { FaBriefcase } from "react-icons/fa6";
import DashboardNavbar from "../Navbar/Navbar";
import { MdNotifications } from "react-icons/md";

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
];

const DropDown = [
  {
    navItem: "Notifications",
    icon: "/images/dashboard/icon1.svg",
    href: "/dashboard/notifications",
  },
  {
    navItem: "Sign Out",
    icon: "/images/dashboard/icon2.svg",
    href: "/sign-out",
  },
];

const TalentNavbar = ({ activeItem }: { activeItem?: number }) => {
  return (
    <>
      <DashboardNavbar
        activeItem={activeItem}
        NavLinks={NavLinks}
        DropDown={DropDown}
        buttonCta="My Jobs"
        buttonLink="/dashboard/my-jobs"
      />
    </>
  );
};

export default TalentNavbar;
