import Header from "@/components/LandingPage/Herosection/Header";
import Navbar from "@/components/LandingPage/Navbar/NavBar";
import About from "@/components/LandingPage/Offer/About";
import CTA from "@/components/LandingPage/Offer/CTA";
import Footer from "@/components/LandingPage/Offer/Footer";
import Offer from "@/components/LandingPage/Offer/Offer";
import TalentPool from "@/components/LandingPage/Offer/TalentPool";
import Testimonials from "@/components/LandingPage/Offer/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Offer />
      <About />
      <TalentPool />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
