import DashboardNavbar from "../Navbar/Navbar";

const NavLinks = [
  {
    navItem: "Dashboard",
    href: "/dashboard",
  },
  {
    navItem: "Jobs",
    href: "/dashboard/jobs",
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
