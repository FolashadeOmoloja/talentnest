import CTA from "../LandingPage/Offer/CTA";
import Testimonials from "../LandingPage/Offer/Testimonials";
import Form from "./Form";

const MainContent = () => {
  return (
    <main className="bg-[#000080] mt-[151px] max-slg:mt-[50px] pt-1 max-slg:pb-[30px] relative max-lg:top-[96px]">
      <section className="section-container top-0 flex max-lg:flex-col text-white gap-10  xslg:justify-between ">
        <div>
          <h3 className="font-bold text-2xl">Talk to us.</h3>
          <p className="mt-4 text-wrap">
            Fill in this form or send us an e-mail with your inquiry.
          </p>
        </div>
        <Form />
      </section>
      <Testimonials color="text-white" textCenter={false} top="top-0" />
      <section className=" relative slg:top-14 mb-[150px] max-slg:mb-[50px] ">
        <CTA
          color="text-white"
          btnBg="bg-white"
          btnColor="text-[#000080]"
          bg="bg-contact-bg"
          top="top-0"
        />
      </section>
    </main>
  );
};

export default MainContent;
