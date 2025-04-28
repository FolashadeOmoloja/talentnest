"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CTABTN from "@/components/Elements/CTA/CTA-Button";
import UserAvatar from "@/components/Elements/UserAvatar";
import Logo from "@/components/Elements/Logo";

type NavLinks = {
  navItem: string;
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
  return (
    <nav className="fixed inset-0 z-30 flex pl-16 pr-[100px] h-24 max-xlg:pr-[50px] max-xlg:pl-[10px] max-md:hidden bg-[#EAEEFE]">
      <div
        className="cursor-pointer flex items-center"
        onClick={() => router.push("/")}
      >
        <Logo />
      </div>
      <ul className="flex-1 flex justify-center items-center gap-10 max-xlg:gap-[20px] ">
        {NavLinks.map((item, idx) => {
          return (
            <Link
              key={idx}
              className={`relative cursor-pointer hover:text-[#001354] transition  duration-300 font-[500] text-lg ${
                activeItem === idx ? "text-[#001354] font-semibold" : ""
              }`}
              href={item.href}
            >
              <span className="">{item.navItem}</span>
            </Link>
          );
        })}
      </ul>
      <div className="flex items-center  gap-10">
        <CTABTN route={buttonLink} CTA={buttonCta} />
        <UserAvatar dropDown={DropDown} />
      </div>
    </nav>
  );
};

export default DashboardMainNavbar;
