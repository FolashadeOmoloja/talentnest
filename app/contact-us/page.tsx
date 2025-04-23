import ContactHeader from "@/components/Contact/ContactHeader";
import MainContent from "@/components/Contact/MainContent";
import Navbar from "@/components/LandingPage/Navbar/NavBar";
import Footer from "@/components/LandingPage/Offer/Footer";

const ContactUs = () => {
  return (
    <>
      <Navbar activeItem={4} />
      <ContactHeader />
      <MainContent />
      <Footer />
    </>
  );
};

export default ContactUs;
