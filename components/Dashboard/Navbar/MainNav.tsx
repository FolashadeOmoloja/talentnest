"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CTABTN from "@/components/Elements/CTA/CTA-Button";
import UserAvatar from "@/components/Elements/UserAvatar";
import Logo from "@/components/Elements/Logo";
import { FaBriefcase } from "react-icons/fa6";
import { useSelector } from "react-redux";

type NavLinks = {
  id: string;
  navItem: string | JSX.Element;
  href: string;
}[];

type DropDown = {
  navItem: string;
  icon: string;
  href: string;
}[];

const DashboardMainNavbar = ({
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
  const router = useRouter();
  const { talentNotifications } = useSelector(
    (store: any) => store.notification
  );
  return (
    <nav className="fixed inset-0 z-30 flex justify-between px-[100px] h-24 max-xlg:px-[50px]  max-md:hidden bg-[#EAEEFE]">
      <div
        className="cursor-pointer flex items-center"
        onClick={() => router.push("/dashboard")}
      >
        <Logo />
      </div>
      <div className="flex items-center  gap-7 ">
        <ul className="centered gap-7 ">
          {NavLinks.map((item, idx) => {
            return (
              <div
                className="dash-nav"
                key={idx}
                onClick={() => router.push(item.href)}
              >
                {item.id}
                {item.navItem}
              </div>
            );
          })}
        </ul>
        <UserAvatar dropDown={DropDown} />
      </div>
    </nav>
  );
};

export default DashboardMainNavbar;
