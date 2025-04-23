import JobBoard from "@/components/JobBoard/JobBoard";
import Navbar from "@/components/LandingPage/Navbar/NavBar";

const JobPage = () => {
  return (
    <>
      <Navbar activeItem={1} />
      <JobBoard />
    </>
  );
};

export default JobPage;
