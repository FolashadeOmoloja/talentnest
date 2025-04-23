import Navbar from "@/components/LandingPage/Navbar/NavBar";
import Footer from "@/components/LandingPage/Offer/Footer";
import TalentNestExperiences from "@/components/TalentNestExperinces/TalentNestExperiences";

const SucessStoryPage = () => {
  return (
    <>
      <Navbar activeItem={0} />
      <TalentNestExperiences />
      <Footer />
    </>
  );
};

export default SucessStoryPage;
