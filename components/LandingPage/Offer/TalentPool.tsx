"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import MatchingTabs from "./DialogBox";
import { useRef } from "react";

const TalentPool = () => {
  const poolRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: poolRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);
  return (
    <section className="section-container " ref={poolRef}>
      <div className="flex flex-col items-center text-center">
        <span className="text-black text-sm tracking-tight font-bold mb-2">
          Built for companies and talents alike
        </span>
        <h2 className="font-bold text-[48px] max-w-[540px] bg-text leading-tight max-md:text-[24px] mb-5">
          Smarter connections, stronger opportunities
        </h2>
        <p className="text-[20px] max-w-[535px] max-md:text-lg text-[#010D3E]">
          TalentNest bridges the gap between growing businesses and top
          freelancers, matching the right skills to the right roles through
          intelligent, AI-driven solutions.
        </p>
      </div>
      <MatchingTabs />
      {/* <motion.img
        src="/images/homepage/nest.png"
        className="absolute bottom-0 right-[70px] w-[150px] h-[150px] max-md:w-[80px] max-md:h-[80px] max-xslg:right-0"
        style={{ rotate: 300, translateY: translateY }}
      /> */}
    </section>
  );
};

export default TalentPool;
