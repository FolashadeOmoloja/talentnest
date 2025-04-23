"use client";
import CTABTN from "@/components/Elements/CTA/CTA-Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Header = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);
  return (
    <header
      ref={heroRef}
      className="section-container mt-0 pb-[50px]  bg-cover bg-center bg-no-repeat bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_66%)] w-full  flex max-lg:flex-col"
    >
      <div className="basis-1/2 flex flex-col mt-[80px] max-md:mt-[10px] items-start gap-7">
        <SmallBox />
        <h1
          className="font-bold text-[64px] bg-text tracking-tight max-sm:text-[40px]"
          style={{
            WebkitTextStroke: "1px black",
            textShadow: "2px 4px 6px rgba(0, 0, 0, 0.4)",
          }}
        >
          Discover the Right Talent in Time
        </h1>
        <p className="text-[#010D3E] text-xl font-medium">
          Our AI-powered platform connects companies with top talents, and helps
          those talents find jobs where they truly shine.
        </p>
        <div className="flex items-center gap-5 font-bold">
          <CTABTN
            route="/hire-talent"
            width="px-4"
            rounded="rounded-[10px]"
            CTA="Hire Talent"
          />
          <CTABTN
            route="/sign-in"
            rounded="none"
            backGround="bg-transparent"
            color="text-black"
            showIcon
            CTA="Find Jobs"
            width="px-0"
          />
        </div>
      </div>

      <div className="relative basis-1/2">
        <motion.img
          src="/images/homepage/nest.png"
          className="absolute top-0 w-[130px] h-[130px] rotate-[45deg] max-lg:hidden"
          style={{ translateY: translateY }}
        />
        <motion.img
          src="/images/homepage/nest.png"
          className="absolute bottom-[-170px] right-0 w-[250px] h-[250px] rotate-[225deg] max-md:w-[80px] max-md:h-[80px] max-lg:bottom-[-70px]  max-lg:w-[180px] max-lg:h-[180px]"
          style={{ rotate: 30, translateY: translateY }}
        />
        <img
          src="/images/homepage/nest.png"
          className="absolute bottom-[70px] left-0 w-[80px] h-[80px] max-lg:hidden"
        />
        <img
          src="/images/homepage/nest.png"
          className="absolute top-[100px] right-0 w-[100px] h-[100px] rotate-[0deg] max-lg:hidden"
        />
        <motion.img
          animate={{ translateY: [-30, 30] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 3,
            ease: "easeInOut",
          }}
          src="/images/homepage/puzzle-bg.png"
          className="mt-10 max-lg:mx-auto"
        />
      </div>
    </header>
  );
};

export default Header;

const SmallBox = () => {
  return (
    <div className="xsm:w-[350px] flex items-center justify-between bg-white/10  rounded-full px-4 py-2 font-semibold shadow-md backdrop-blur-md border border-white/80 max-xsm:text-[12px] max-xsm:gap-2">
      <span className="bg-white text-[#010D3E] text-xs font-bold px-2 py-0.5 rounded-full">
        FASTEST WAY
      </span>
      <span>Find Your Perfect Hire</span>
      <span>🌐</span>
    </div>
  );
};
