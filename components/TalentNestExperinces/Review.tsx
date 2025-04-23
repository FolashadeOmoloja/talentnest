"use client";
import { useGetAllReviews } from "@/hooks/content-hook";
import { motion } from "framer-motion";
import React from "react";
import Loader from "../Elements/Loader";

interface Reviews {
  _id: string;
  fullname: string;
  role: string;
  review: string;
  createdAt: string;
}
const Review = () => {
  const { loading, review } = useGetAllReviews();
  const firstColumn = review.slice(0, 3);
  const secondColumn = review.slice(3, 6);
  const thirdColumn = review.slice(6, 9);
  const Reviews = ({
    reviewArr,
    className,
    duration,
  }: {
    reviewArr: [Reviews];
    className?: string;
    duration?: number;
  }) => (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: duration || 10,
          ease: "linear",
        }}
        className={`flex flex-col gap-y-5 items-center pb-6`}
      >
        {[...new Array(2)].map((_, idx) => (
          <React.Fragment key={idx}>
            {reviewArr.map((item: Reviews, idx: number) => (
              <div
                className="bg-[#eaeefe54]  flex flex-col p-7 rounded-[20px]  lg:basis-[30%] max-md:w-full w-[350px]  gap-10 max-xxsm:h-full shadow-md"
                key={idx}
              >
                <p className="tracking-[1.5%] ">“{item.review}”</p>
                <div className="flex items-center gap-4">
                  <div className="rounded-full flex centered w-[60px] h-[60px] bg-[#010D3E]">
                    <span className="text-lg font-bold text-white">
                      {item.fullname[0]}
                    </span>
                  </div>
                  <div className="text-sm text-[#010D3E] flex flex-col gap-1">
                    <span>{item.fullname}</span>
                    <span className="font-semibold">@{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
  return (
    <section className="section-container">
      <h4 className="text-center font-semibold text-5xl bg-text  mb-14 ">
        Testimonials
      </h4>
      {loading ? (
        <section className="flex items-center justify-center w-full">
          <Loader />
        </section>
      ) : (
        <section className="flex flex-wrap gap-5 justify-center [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <Reviews reviewArr={firstColumn} duration={15} />
          <Reviews reviewArr={secondColumn} duration={19} />
          <Reviews reviewArr={thirdColumn} duration={17} />
        </section>
      )}
    </section>
  );
};

export default Review;
