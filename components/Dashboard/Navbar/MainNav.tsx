"use client";

import { useRouter } from "next/navigation";
import UserAvatar from "@/components/Elements/UserAvatar";
import Logo from "@/components/Elements/Logo";
import { useSelector } from "react-redux";
import { MdNotificationsActive } from "react-icons/md";

type NavLinks = {
  id: string;
  navItem: string | JSX.Element;
  href: string;
}[];

const DashboardMainNavbar = ({
  NavLinks,
  company = false,
}: {
  NavLinks: NavLinks;
  company?: boolean;
}) => {
  const router = useRouter();
  const { talentNotifications } = useSelector(
    (store: any) => store.notification
  );
  const { companyNotifications } = useSelector(
    (store: any) => store.notification
  );
  return (
    <nav className="fixed inset-0 max-w-[2400px] mx-auto z-30 flex justify-between px-[100px] h-24 max-xlg:px-[50px]  max-md:hidden bg-[#EAEEFE]">
      <div
        className="cursor-pointer flex items-center"
        onClick={() =>
          router.push(company ? "/hire-talent/dashboard" : "/dashboard")
        }
      >
        <Logo />
      </div>
      <div className="flex items-center  gap-7 ">
        <ul className="centered gap-7 ">
          {NavLinks.map((item, idx) => {
            return (
              <div
                className="dash-nav relative"
                key={idx}
                onClick={() => router.push(item.href)}
              >
                {item.id === "Notifications" &&
                (talentNotifications.length > 0 ||
                  companyNotifications.length > 0) ? (
                  <div>
                    <MdNotificationsActive />
                    <div className="w-4 h-4 text-[10px] centered rounded-full bg-[#010D3E] text-white absolute -top-0.5 -right-0.5">
                      {company
                        ? companyNotifications.length
                        : talentNotifications.length}
                    </div>
                  </div>
                ) : (
                  item.navItem
                )}
              </div>
            );
          })}
        </ul>
        <UserAvatar />
      </div>
    </nav>
  );
};

export default DashboardMainNavbar;
