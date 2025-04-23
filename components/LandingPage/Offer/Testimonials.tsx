"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    text: "“TalentNest helped us find a highly skilled developer in less than 48 hours. The platform made the hiring process smooth and stress-free. We'll definitely be back for our next project!”",
    name: "Amaka O.",
    title: "CTO at SwiftPay",
  },
  {
    text: "“I landed my first international client through TalentNest. The onboarding was seamless, and the platform keeps everything organized.”",
    name: "Tunde A.",
    title: "Senior Marketing Specialist",
  },
  {
    text: "“We’ve tried other platforms, but TalentNest stands out. The quality of talent, the intuitive interface, and the support team make it our go-to for hiring.”",
    name: "Rebecca M.",
    title: "HR Manager at CloudStone",
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  return (
    <section
      className={`section-container flex  max-xslg:gap-7 max-slg:gap-14 max-slg:items-center max-slg:text-center  max-slg:flex-col justify-between`}
    >
      <h3
        className={`max-w-[500px] font-bold text-[48px]  bg-text leading-tight max-md:text-[24px]`}
      >
        Trusted by clients and talents worldwide
      </h3>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="max-w-[632px] relative h-[250px] max-md:w-full"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <section className="flex flex-col max-md:text-wrap text-[#010D3E]">
              <p className="mb-5 leading-[29.4px] text-left tracking-[0.05em] max-sm:text-sm text-black max-slg:text-center">
                {testimonial.text}
              </p>
              <span className="font-bold mb-1">{testimonial.name}</span>
              <span className={` text-sm font-semibold`}>
                {testimonial.title}
              </span>
            </section>
          </SwiperSlide>
        ))}
        <div className="flex  gap-5 md:text-2xl text-lg mt-4 absolute bottom-0 right-0 max-slg:left-[45%] z-20">
          <button className="swiper-button-prev cursor-pointer">
            <FaArrowLeft />
          </button>
          <button className="swiper-button-next cursor-pointer">
            <FaArrowRight />
          </button>
        </div>
      </Swiper>
    </section>
  );
};

export default Testimonials;
