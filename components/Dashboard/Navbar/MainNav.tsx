"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CTABTN from "@/components/Elements/CTA/CTA-Button";
import UserAvatar from "@/components/Elements/UserAvatar";

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
    <nav className="fixed inset-0 z-30 flex pl-16 pr-[100px] h-24 max-xlg:pr-[50px] max-xlg:pl-[10px] max-md:hidden bg-white">
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <Image
          src={"/images/homepage/frack.png"}
          alt={"logo"}
          width={191}
          height={96}
          quality={100}
          priority
        />
      </div>
      <ul className="flex-1 flex justify-center items-center gap-10 max-xlg:gap-[20px] ">
        {NavLinks.map((item, idx) => {
          return (
            <Link
              key={idx}
              className={`relative cursor-pointer hover:text-[#000080] transition  duration-300 font-[500] text-lg ${
                activeItem === idx ? "text-[#000080] font-semibold" : ""
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
