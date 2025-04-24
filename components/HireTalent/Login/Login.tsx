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
    <section className="sm:h-[100vh] flex bg-[#eaeefe]">
      <section className="md:basis-1/2 max-md:w-full flex items-center justify-center ">
        <HireTalentLoginForm />
      </section>
      <div className="basis-1/2  bg-gradient-to-r from-[#1944b0]  to-slate-900  relative max-md:hidden centered flex-col overflow-hidden ">
        <p className="text-white text-4xl max-slg:mt-10 font-semibold flex-col centered font-['georgia'] italic slg:absolute slg:top-10">
          <span className="text-xl font-extralight mb-2 ">
            Connecting Companies
          </span>{" "}
          To Global Talents
        </p>
        <div className=" w-full h-full absolute inset-0 ob ">
          <img
            src="/images/homepage/signup-bg.svg"
            className=" w-full h-full object-cover opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
