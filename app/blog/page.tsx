import Blog from "@/components/Blog/Blog";
import Navbar from "@/components/LandingPage/Navbar/NavBar";
import Footer from "@/components/LandingPage/Offer/Footer";
import Testimonials from "@/components/LandingPage/Offer/Testimonials";

const BlogPage = () => {
  return (
    <>
      <Navbar activeItem={2} />
      <Blog />
      <Footer />
    </>
  );
};

export default BlogPage;
