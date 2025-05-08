import CTABTN from "../../Elements/CTA/CTA-Button";

const CTA = ({
  route = "/sign-in",
  cta = "Get Started",
  showTwoCta = false,
  addPadding = false,
}: {
  route?: string;
  cta?: string;
  showTwoCta?: boolean;
  addPadding?: boolean;
}) => {
  return (
    <section
      className={`section-container ${
        addPadding && "pt-[50px] pb-[130px]"
      } flex flex-col items-center text-center bg-gradient-to-b from-white  to-[#d2dcff] pb-[50px] md:pb-[100px]`}
    >
      <h3
        className={`font-bold text-[48px] max-w-[540px] bg-text leading-tight max-md:text-[24px] mb-5`}
      >
        Join TalentNest for free today!{" "}
      </h3>
      <p className="leading-tight text-[#010D3E] text-lg text-semibold max-w-[500px]">
        Your talent deserves to shine, let TalentNest connect you with the right
        opportunities without hassles and stress.
      </p>
      {showTwoCta ? (
        <div className="mt-8 flex items-center gap-5 font-bold">
          <CTABTN route="/hire-talent" CTA="Hire Talent" />
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
      ) : (
        <div className="mt-8 max-md:justify-center flex">
          <CTABTN route={route} CTA={cta} showIcon={true} />
        </div>
      )}
    </section>
  );
};

export default CTA;
