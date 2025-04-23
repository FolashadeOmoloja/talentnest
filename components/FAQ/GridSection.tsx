"use client";

import { useGetAllFaqs } from "@/hooks/content-hook";
import Loader from "../Elements/Loader";
import { FaHandshakeAngle, FaLightbulb } from "react-icons/fa6";
import { FaGlobeAfrica, FaShieldAlt } from "react-icons/fa";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { PiHandCoinsFill } from "react-icons/pi";

interface Faqs {
  _id: string;
  img: string;
  question: string;
  answer: string;
  createdAt: string;
}

const GridSection = () => {
  const { loading, faq } = useGetAllFaqs();
  const iconArr = [
    <FaShieldAlt />,
    <FaLightbulb />,
    <BsFillSuitcaseLgFill />,
    <FaGlobeAfrica />,
    <FaHandshakeAngle />,
    <PiHandCoinsFill />,
  ];
  return (
    <section className="px-[100px] max-xlg:px-[50px] max-lg:px-9 max-sm:px-4 relative max-lg:top-[96px] py-[151px] max-slg:py-[50px] bg-white">
      {loading ? (
        <section className="flex items-center justify-center w-full">
          <Loader />
        </section>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {faq.map((item: Faqs, idx: number) => (
            <div
              key={idx}
              className="flex flex-col gap-5 col-span-1 border border-[#E1E4EA] shadow-md p-5 rounded-2xl bg-[#EAEEFE]"
            >
              <div className="rounded-full w-14 h-14 text-2xl text-[#010D3E] border border-[#010D3E] flex items-center justify-center">
                {iconArr[idx % iconArr.length]}
              </div>
              <span className="font-semibold text-lg md:h-[56px]">
                {item.question}
              </span>
              <p className="text-sm text-[#545E6E] leading-6">{item.answer}</p>
            </div>
          ))}
        </section>
      )}
    </section>
  );
};

export default GridSection;
