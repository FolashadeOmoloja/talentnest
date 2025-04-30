"use client";
import { useState } from "react";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import FormFour from "./FormFour";

const SignUpStep1 = () => {
  const [bgImage, setBgImage] = useState(
    "url('/images/homepage/signup-bg2.svg')"
  );
  const [active, setActive] = useState(1);
  const [resume, setResume] = useState<File | null>(null);
  return (
    // <section className="flex">
    //   <div
    //     className="basis-1/2 bg-cover bg-no-repeat bg-[#010D3E] relative max-md:hidden"
    //     style={{ backgroundImage: bgImage }}
    //   >
    //     <p className="login-text top-[30px] xlg:max-w-[230px] ">
    //       <span className="font-semibold text-base">
    //         {active === 4
    //           ? "Welcome to TalentNest!"
    //           : " Our AI-driven platform streamlines the process"}
    //       </span>{" "}
    //       <br />
    //       making it easier and more efficient than ever before. Gone are the
    //       days of sifting through countless resumes and conducting endless
    //       interviews.
    //     </p>
    //   </div>
    //   <section className="md:basis-1/2 max-md:w-full flex items-center justify-center">
    //     {active === 1 && (
    //       <FormOne changeBgState={setBgImage} changeActive={setActive} />
    //     )}
    //     {active === 2 && (
    //       <FormTwo changeBgState={setBgImage} changeActive={setActive} />
    //     )}
    //     {active === 3 && (
    //       <FormThree
    //         changeBgState={setBgImage}
    //         changeActive={setActive}
    //         setResume={setResume}
    //       />
    //     )}
    //     {active === 4 && <FormFour resume={resume} />}
    //   </section>
    // </section>
    <section className=" flex bg-[#eaeefe]">
      <section className="md:basis-1/2 max-md:w-full flex items-center justify-center ">
        {active === 1 && (
          <FormOne changeBgState={setBgImage} changeActive={setActive} />
        )}
        {active === 2 && (
          <FormTwo changeBgState={setBgImage} changeActive={setActive} />
        )}
        {active === 3 && (
          <FormThree
            changeBgState={setBgImage}
            changeActive={setActive}
            setResume={setResume}
          />
        )}
        {active === 4 && <FormFour resume={resume} />}
      </section>
      <div className="basis-1/2  bg-gradient-to-r from-[#1944b0]  to-slate-900  relative max-md:hidden pt-28 flex items-center flex-col overflow-hidden text-white font-extralight">
        <div className="w-[75%]  p-10 max-lg:p-7 rounded-lg shadow-md  backdrop-blur-sm  bg-white/10 ">
          <p className=" text-2xl  font-semibold  font-['georgia'] italic mb-6">
            {active === 1 && "Connecting Talents to Global Opportunities"}
            {active === 2 &&
              "Personalize your profile to showcase your strengths, skills, and experience."}
            {active === 3 &&
              "Get matched with roles that align with your goals and career journey."}
            {active === 4 &&
              "Land opportunities, build relationships, and grow with every project."}
          </p>
          <p className="text-sm ">
            With our platform, you can easily find and apply for positions that
            match your skills and aspirations
          </p>
        </div>
        <p className="mt-16 text-sm font-medium text-center">
          Create your profile and get discovered by top companies worldwide.
        </p>

        <DotProgress activeItem={active} />

        <div className=" w-full h-full absolute inset-0 ">
          <img
            src="/images/homepage/signup-bg.svg"
            className=" w-full h-full object-cover opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

export default SignUpStep1;

type DotProgressProps = {
  activeItem: number; // starts from 1
  total?: number;
};

const DotProgress: React.FC<DotProgressProps> = ({ activeItem, total = 4 }) => {
  return (
    <div className="flex items-center gap-4  rounded-full">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`w-2 h-2 mt-10 rounded-full transition-all duration-300 ${
            activeItem === i + 1 ? "bg-white" : "bg-white/30"
          }`}
        />
      ))}
    </div>
  );
};
