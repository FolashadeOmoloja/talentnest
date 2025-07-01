import DashboardMainNavbar from "./MainNav";
import DashboardMobileNav from "./MobileNav";

type NavLinks = {
  id: string;
  navItem: string | JSX.Element;
  href: string;
}[];

const DashboardNavbar = ({
  NavLinks,
  company = false,
}: {
  NavLinks: NavLinks;
  company?: boolean;
}) => {
  return (
    <>
      <DashboardMainNavbar NavLinks={NavLinks} company={company} />
      <DashboardMobileNav NavLinks={NavLinks} company={company} />
    </>
  );
};

export default DashboardNavbar;
