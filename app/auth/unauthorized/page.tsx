// pages/unauthorized.js

import Navbar from "@/components/LandingPage/Navbar/NavBar";
import Footer from "@/components/LandingPage/Offer/Footer";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <>
      <Navbar />
      <section className="flex flex-col justify-center items-center h-[70vh] text-center max-lg:top-[96px] relative">
        <h1 className="sm:text-[130px] text-8xl font-bold  text-red-500 mb-4">
          403
        </h1>
        <p className="text-2xl  mb-8">
          Uh-oh! You don’t have permission to access this page.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#000080] text-white font-semibold rounded btn-hover "
        >
          Go to Home
        </Link>
      </section>
      <Footer />
    </>
  );
};

export default Unauthorized;
