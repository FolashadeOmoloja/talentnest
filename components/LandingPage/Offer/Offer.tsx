"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    img: "/images/homepage/ai-match.png",
    cardTitle: "AI-Matched Freelancers",
    text: "Our smart system pairs you with talent that fits your exact project needs.",
  },
  {
    img: "/images/homepage/hiring-flow.png",
    cardTitle: "Seamless Hiring Flow",
    text: "From search to onboarding, our platform makes hiring fast and easy.",
  },
  {
    img: "/images/homepage/opportunities.png",
    cardTitle: "Opportunities for All",
    text: "We empower talents of all levels to find meaningful, paid work.",
  },
];

const Offer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const offerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: offerRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], ["-85%", "85%"]);
  return (
    <section ref={offerRef} className="section-container relative">
      <div className="flex flex-col items-center text-center">
        <span className="text-black text-sm tracking-tight font-bold mb-2">
          Hire smarter, work better
        </span>
        <h2 className="font-bold text-[48px] max-w-[540px] bg-text leading-tight max-md:text-[24px] mb-5">
          A better way to connect with top talents
        </h2>
        <p className="text-[20px] max-w-[535px] max-md:text-lg text-[#010D3E]">
          Discover skilled freelancers and match with the right jobs , powered
          by our AI-driven platform designed to simplify hiring and boost
          productivity.
        </p>
      </div>

      <motion.section
        className="md:mt-[112px] mt-[50px] flex max-xlg:flex-wrap max-slg:flex-col justify-center items-center md:gap-16 gap-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {cards.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col justify-center items-center max-xlg:max-w-[420px]"
            variants={itemVariants}
          >
            <div className="mb-11 w-[300px] h-[250px] max-sm:w-[280px]">
              <img src={item.img} alt="card" className="w-full h-full" />
            </div>
            <span className="font-bold text-3xl bg-text-r">
              {item.cardTitle}
            </span>
            <p className="font-semibold text-[#010D3E] leading-7 mt-4 h-[140px]">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.section>
      <motion.img
        src="/images/homepage/puzzle2.png"
        className="absolute bottom-[-60px] left-[30px] w-[100px] max-sm:hidden  z-10"
        style={{ rotate: 45, translateY: translateY }}
      />
    </section>
  );
};

export default Offer;
