import HireTalentSignUpForm from "./Form";

const HireTalentSignUp = () => {
  return (
    <section className=" flex">
      <div
        className="basis-1/2 bg-cover bg-no-repeat bg-[#000080] relative max-md:hidden"
        style={{ backgroundImage: "url('/images/homepage/signup-bg3.svg')" }}
      >
        <p className="login-text top-[50px]">
          companies can simply post their requirements on our job board, and
          within moments,they'll be matched with a curated list of highly
          qualified professionals from our extensive network.
        </p>
      </div>
      <section className="md:basis-1/2 max-md:w-full flex justify-center sm:p-[50px]">
        <HireTalentSignUpForm />
      </section>
    </section>
  );
};

export default HireTalentSignUp;
