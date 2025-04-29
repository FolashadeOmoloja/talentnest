import DashboardMainNavbar from "./MainNav";
import DashboardMobileNav from "./MobileNav";

type NavLinks = {
  id: string;
  navItem: string | JSX.Element;
  href: string;
}[];

const DashboardNavbar = ({ NavLinks }: { NavLinks: NavLinks }) => {
  return (
    <>
      <DashboardMainNavbar NavLinks={NavLinks} />
      <DashboardMobileNav NavLinks={NavLinks} />
    </>
  );
};

export default DashboardNavbar;
