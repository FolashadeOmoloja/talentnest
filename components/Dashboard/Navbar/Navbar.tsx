import DashboardMainNavbar from "./MainNav";
import DashboardMobileNav from "./MobileNav";

type NavLinks = {
  navItem: string;
  href: string;
}[];

type DropDown = {
  navItem: string;
  icon: string;
  href: string;
}[];

const DashboardNavbar = ({
  activeItem,
  NavLinks,
  DropDown,
  buttonLink,
  buttonCta,
}: {
  activeItem?: number;
  NavLinks: NavLinks;
  DropDown: DropDown;
  buttonLink: string;
  buttonCta: string;
}) => {
  return (
    <>
      <DashboardMainNavbar
        activeItem={activeItem}
        NavLinks={NavLinks}
        buttonLink={buttonLink}
        buttonCta={buttonCta}
        DropDown={DropDown}
      />
      <DashboardMobileNav
        NavLinks={NavLinks}
        buttonLink={buttonLink}
        buttonCta={buttonCta}
        DropDown={DropDown}
      />
    </>
  );
};

export default DashboardNavbar;
