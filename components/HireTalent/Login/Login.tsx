"use client";
import { useEffect } from "react";
import HireTalentLoginForm from "./Form";
import { setUser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the 'loggedOut' cookie is present
    const loggedOut = Cookies.get("loggedOut");

    if (loggedOut) {
      // If the user has been logged out, set the user to null
      dispatch(setUser(null));
      console.log("done");
      // Remove the cookie once it's handled
      Cookies.remove("loggedOut");
    }
  }, [dispatch]); // Dependency array includes dispatch
  return (
    <section className="sm:h-[100vh] flex">
      <div
        className="basis-1/2 bg-cover bg-no-repeat bg-[#000080] relative max-md:hidden"
        style={{ backgroundImage: "url('/images/homepage/signup-bg1.svg')" }}
      >
        <p className="login-text">
          Access Talent with a simple Login We help organizations around the
          world harness the power of great talent to drive their success.
        </p>
      </div>
      <section className="md:basis-1/2 max-md:w-full flex items-center justify-center">
        <HireTalentLoginForm />
      </section>
    </section>
  );
};

export default Login;
