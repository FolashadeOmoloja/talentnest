"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const CustomHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <header
      className={`section-container mt-0  pt-[100px] pb-[50px] max-slg:pt-[50px] bg-[#EAEEFE] bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183dc2a8,#EAEEFE_66%)] ${className}`}
    >
      <section className="flex flex-col items-center mb-6  text-[#161519] text-center relative">
        {children}
        <motion.img
          animate={{ translateY: [-30, 30], rotate: [40, 50] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 3,
            ease: "easeInOut",
          }}
          src="/images/homepage/nest.png"
          className="absolute bottom-[70px] left-0 w-[150px] h-[150px] max-lg:hidden"
        />
        <motion.img
          animate={{ translateY: [-30, 30], rotate: [360, 50] }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 3,
            ease: "easeInOut",
          }}
          src="/images/homepage/nest.png"
          className="absolute top-[100px] right-0 w-[100px] h-[100px] rotate-[0deg] max-lg:hidden"
        />
      </section>
    </header>
  );
};

export default CustomHeader;

export const HeaderTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => (
  <h2
    className={`font-bold text-[64px] bg-text  max-sm:text-[40px] leading-tight mb-2 ${className}`}
    style={{
      textShadow: "2px 4px 6px rgba(0, 0, 0, 0.4)",
    }}
  >
    {title}
  </h2>
);

export const ParagraphText = ({ text }: { text: ReactNode }) => (
  <div className="max-w-[700px] tracking-[1.5%] text-[#010D3E] sm:text-xl text-base font-medium">
    {text}
  </div>
);
