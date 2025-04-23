"use client";
import CTA from "../LandingPage/Offer/CTA";
import Header from "./Header";
import Review from "./Review";

const TalentNestExperiences = () => {
  return (
    <main>
      <Header />
      <Review />
      <CTA route="hire-talent" cta="Hire Talent" />
    </main>
  );
};

export default TalentNestExperiences;
