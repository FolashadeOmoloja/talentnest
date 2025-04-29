import { NavLinks } from "@/utilities/constants";
import React, { useState } from "react";
import { BsCaretRightFill } from "react-icons/bs";
import { HiMiniBars3BottomLeft, HiMiniChevronDown } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import CTABTN from "../../Elements/CTA/CTA-Button";
import { useRouter } from "next/navigation";
import Logo from "@/components/Elements/Logo";

type IsOpenState = {
  [key: number]: boolean;
};

const MobileNav = ({ user }: any) => {
  const router = useRouter();
  const [isOpenDropdown, setisOpenDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCol, setIsOpenCol] = useState<IsOpenState>({});

  const toggleDropdown = () => {
    setisOpenDropdown(!isOpenDropdown);
  };
  const toggleCollapsible = (idx: number) => {
    setIsOpenCol((prev) => {
      const newState: IsOpenState = {};
      newState[idx] = !prev[idx];
      return newState;
    });
  };
  return (
    <nav className="xslg:hidden relative  ">
      <section className="fixed inset-0 flex justify-between items-center h-24 px-9 max-sm:px-4 max-sm:flex-row-reverse bg-[#EAEEFE] z-40">
        {isOpen ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            <ImCross className="text-3xl text-[#001354] " />
          </button>
        ) : (
          <button onClick={() => setIsOpen(!isOpen)}>
            <HiMiniBars3BottomLeft className="text-3xl text-[#001354] " />
          </button>
        )}
        <div
          className="h-full flex justify-center items-center"
          onClick={() => router.push("/")}
        >
          <Logo />
        </div>
        <ul className=" flex justify-center items-center gap-10 max-xlg:gap-[20px] max-sm:hidden ">
          <li
            onClick={() => {
              toggleDropdown();
            }}
            className="relative nav-links  cursor-pointer"
          >
            <div
              className={`text-[#001354] flex gap-[6px] items-center justify-center transition`}
            >
              <span>Sign Up</span>
              <BsCaretRightFill
                fontSize={13}
                className={`${
                  isOpenDropdown
                    ? "rotate-90 transition-transform duration-[180ms] ease-linear"
                    : ""
                }  `}
              />
            </div>
            {isOpenDropdown &&
              (!user ? (
                <ul className="absolute top-full left-[-50%] mt-2 bg-[#EAEEFE] shadow-md rounded-lg p-[20px] w-[8rem] flex flex-col gap-7">
                  <li
                    onClick={() => {
                      router.push("/hire-talent");
                    }}
                  >
                    Hire Talent
                  </li>
                  <li
                    onClick={() => {
                      router.push("/sign-in");
                    }}
                  >
                    Sign In
                  </li>
                </ul>
              ) : (
                <ul className="absolute top-full left-[-50%] mt-2 bg-[#EAEEFE] shadow-md rounded-lg p-[20px] w-[8rem] flex flex-col gap-7 font-bold text-[#001354]">
                  <li
                    onClick={() => {
                      router.push(
                        `${
                          user.companyName
                            ? "/hire-talent/dashboard"
                            : "/dashboard"
                        }`
                      );
                    }}
                  >
                    Dashboard
                  </li>
                </ul>
              ))}
          </li>
        </ul>
      </section>
      {
        <section
          className={`${
            isOpen ? "translate-y-0 opacity-1" : "-translate-y-full opacity-0"
          } navItem`}
        >
          {NavLinks.map((item, idx) => (
            <ul
              className={`flex flex-col ${
                isOpenCol[idx] ? "gap-6" : "gap-14"
              } mb-8`}
              key={idx}
            >
              <li
                className="sm:text-lg font-semibold text-[#001354] flex justify-between cursor-pointer"
                onClick={() => {
                  toggleCollapsible(idx);
                }}
              >
                <span>{item.navItem}</span>
                <span>
                  <HiMiniChevronDown />
                </span>
              </li>
              <ul
                className={`flex flex-col gap-6  ${
                  isOpenCol[idx] ? "flex" : "hidden"
                }`}
              >
                {item.dropDownOpt ? (
                  item.dropDownOpt.map((opt, idx) => (
                    <li
                      key={idx}
                      className="flex pl-[13px] gap-5 items-center cursor-pointer"
                      onClick={() => {
                        router.push(opt.href);
                      }}
                    >
                      <div className="text-2xl text-[#010D3E]">
                        <opt.icon />
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold mb-2">{opt.title}</span>
                        <p className="text-[#7C8698] ">{opt.desc}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li
                    className="flex pl-[13px] gap-5 items-center cursor-pointer"
                    onClick={() => {
                      router.push(item.href);
                    }}
                  >
                    <div className="text-2xl text-[#010D3E]">
                      <item.icon />
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold mb-2 text-sm">
                        {item.navItem}
                      </span>
                      <p className="text-[#7C8698] ">{item.desc}</p>
                    </div>
                  </li>
                )}
              </ul>
            </ul>
          ))}
          {!user ? (
            <div className="flex flex-col sm:hidden   gap-4">
              <button
                className="bg-[#22CCED] h-[55px] rounded-[6px] font-semibold"
                onClick={() => {
                  router.push("/sign-in");
                }}
              >
                Sign In
              </button>
              <CTABTN width="w-full" route="/hire-talent" CTA="Hire Talent" />
            </div>
          ) : (
            <div className="flex flex-col sm:hidden   gap-4">
              <CTABTN
                width="w-full"
                route={
                  user.companyName ? "/hire-talent/dashboard" : "/dashboard"
                }
                CTA="Dashboard"
              />
            </div>
          )}
        </section>
      }
    </nav>
  );
};

export default MobileNav;
