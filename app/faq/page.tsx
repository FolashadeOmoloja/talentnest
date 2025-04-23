import GridSection from "@/components/FAQ/GridSection";
import Header from "@/components/FAQ/Header";
import Navbar from "@/components/LandingPage/Navbar/NavBar";
import CTA from "@/components/LandingPage/Offer/CTA";
import Footer from "@/components/LandingPage/Offer/Footer";

const FAQPage = () => {
  return (
    <>
      <Navbar activeItem={2} />
      <Header />
      <GridSection />
      <CTA showTwoCta />
      <Footer />
    </>
  );
};

export default FAQPage;
