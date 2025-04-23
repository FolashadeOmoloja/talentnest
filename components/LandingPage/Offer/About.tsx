import CTABTN from "../../Elements/CTA/CTA-Button";

const About = () => {
  return (
    <section
      className="bg-gradient-to-r from-[#001354] via-[#1a2d6b] to-[#3344a1]
 section-container flex text-white   xlg:py-20   py-16 slg:h-[450px] relative max-slg:flex-col max-slg:items-center"
    >
      <section className="xlg:max-w-[686px] max-w-[516px] max-slg:text-center">
        <h3 className="font-bold text-[48px] max-md:text-[24px] mb-6">
          Top Talents, On Demand. <br className="max-md:hidden" />
          No Strings Attached.
        </h3>
        <p className="font-light leading-7 mb-6 max-w-[400px] max-slg:mx-auto">
          Let TalentNest match you with vetted freelance talents, cut hiring
          time, and keep costs low.
        </p>
        <div className="mb-4 flex max-slg:justify-center max-slg:mb-9">
          <CTABTN
            route={"/hire-talent"}
            CTA="Hire Talent"
            showIcon={true}
            backGround="bg-white"
            color="text-black"
          />
        </div>
      </section>
      <div className="slg:absolute top-[-90px] right-0 xlg:w-[573px] xlg:h-[468px] slg:w-[473px] slg:h-[368px]">
        <img src="/images/homepage/illustration.png" alt="img" className="" />
      </div>
    </section>
  );
};

export default About;
