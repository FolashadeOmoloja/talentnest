import { NavLinks } from "@/utilities/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsCaretRightFill } from "react-icons/bs";
import CTABTN from "../../Elements/CTA/CTA-Button";
import { useState } from "react";
import Link from "next/link";
import CustomLink from "@/components/Elements/CustomLink";
import Logo from "@/components/Elements/Logo";

type IsOpenState = {
  [key: number]: boolean;
};

const MainNav = ({ activeItem, user }: { activeItem?: number; user: any }) => {
  const [isOpen, setIsOpen] = useState<IsOpenState>({});

  const toggleDropdown = (idx: number) => {
    setIsOpen((prevState) => {
      const newState: IsOpenState = {};
      newState[idx] = !prevState[idx];
      return newState;
    });
  };
  const router = useRouter();

  const navigate = (href: string, idx: number) => {
    if (href === "nil") {
      toggleDropdown(idx);
    } else {
      router.push(href);
    }
  };

  return (
    <nav className="bg-[#EAEEFE] flex  px-[100px] h-24 max-xlg:px-[50px] max-xslg:hidden">
      <div
        className="h-full flex justify-center items-centeryy"
        onClick={() => router.push("/")}
      >
        <Logo />
      </div>
      <ul className="flex-1 flex justify-center items-center gap-10 max-xlg:gap-[20px] ">
        {NavLinks.map((item, idx) => {
          return (
            <CustomLink
              href={item.href}
              key={item.navItem}
              onClick={() => navigate(item.href, idx)}
              className={`relative cursor-pointer ${
                activeItem === idx
                  ? "text-[#001E80] font-semibold"
                  : "text-black/80"
              }`}
            >
              <div
                className={`hover:text-[#001E80] flex gap-[6px] items-center justify-center transition ${
                  isOpen[idx] ? "text-[#001E80]" : ""
                }`}
              >
                <span>{item.navItem}</span>
                {item.dropDown ? (
                  <BsCaretRightFill
                    fontSize={13}
                    className={`${
                      isOpen[idx]
                        ? "rotate-90 transition-transform duration-[180ms] ease-linear"
                        : ""
                    }  `}
                  />
                ) : null}
              </div>
              {item.dropDown && isOpen[idx] && (
                <ul className="absolute z-20 top-full left-0 mt-2 bg-gradient-to-b from-white via-slate-50  to-[#d2dcff] shadow-lg rounded-lg px-[50px] py-[40px]  w-[27.5rem] flex flex-col gap-7">
                  <span className="font-bold text-lg ">{item.navItem}</span>
                  {Array.isArray(item.dropDownOpt) &&
                    item.dropDownOpt.map((opt, idx) => (
                      <Link href={opt.href} key={idx}>
                        <li className="flex pl-[13px] gap-5 items-center ">
                          <div className="text-2xl text-[#010D3E]">
                            <opt.icon />
                          </div>
                          <div>
                            <span className="font-semibold mb-2">
                              {opt.title}
                            </span>
                            <p className="text-[#7C8698] text-sm">{opt.desc}</p>
                          </div>
                        </li>
                      </Link>
                    ))}
                </ul>
              )}
            </CustomLink>
          );
        })}
      </ul>
      {!user ? (
        <div className="flex items-center  gap-10">
          <button
            className=""
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            Sign In
          </button>
          <CTABTN route="/hire-talent" CTA="Hire Talent" />
        </div>
      ) : (
        <div className="flex items-center  gap-10">
          {user.companyName ? (
            <CTABTN route="/hire-talent/dashboard" CTA="Dashboard" showIcon />
          ) : (
            <CTABTN route="/dashboard" CTA="Dashboard" showIcon />
          )}
        </div>
      )}
    </nav>
  );
};

export default MainNav;
