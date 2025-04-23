import React from "react";

const StepCounter = ({
  activeOne,
  activeTwo,
  activeThree,
  pastActiveOne,
  pastActiveTwo,
  pastActiveThree,
}: {
  activeOne?: boolean;
  activeTwo?: boolean;
  activeThree?: boolean;
  pastActiveOne?: boolean;
  pastActiveTwo?: boolean;
  pastActiveThree?: boolean;
}) => {
  const active = "text-[#000080] border-[#000080] font-bold border-2";
  const pastActive = "border-none bg-[#000080] text-white";
  return (
    <section>
      <section className="mt-5 mb-10 flex items-center ">
        <div className="relative">
          <div
            className={`step-circle ${activeOne ? active : ""} ${
              pastActiveOne ? pastActive : ""
            }`}
          >
            1
          </div>
          <span className="absolute left-[-50%] mt-[5px] ">Account</span>
        </div>
        <div className="step-line"></div>
        <div className="relative">
          <div
            className={`step-circle ${activeTwo ? active : ""} ${
              pastActiveTwo ? pastActive : ""
            }`}
          >
            2
          </div>
          <span className="absolute left-[-50%] mt-[5px]">Expertise</span>
        </div>
        <div className="step-line"></div>
        <div className="relative">
          <div
            className={`step-circle ${activeThree ? active : ""} ${
              pastActiveThree ? pastActive : ""
            }`}
          >
            3
          </div>
          <span className="absolute left-[-50%] mt-[5px]">Resume</span>
        </div>
      </section>
    </section>
  );
};

export default StepCounter;
