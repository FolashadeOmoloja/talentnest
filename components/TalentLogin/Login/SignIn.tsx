"use client";
import { useDispatch } from "react-redux";
import ForTalentSignInForm from "./Form";
import { setUser } from "@/redux/slices/authSlice";
import { useEffect } from "react";
import Cookies from "js-cookie";

const ForTalentSignIn = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedOut = Cookies.get("loggedOut");

    if (loggedOut) {
      dispatch(setUser(null));
      console.log("done");
      Cookies.remove("loggedOut");
    }
  }, [dispatch]);
  return (
    <section className="h-svh flex bg-[#eaeefe]">
      <section className="md:basis-1/2 max-md:w-full flex items-center justify-center ">
        <ForTalentSignInForm />
      </section>
      <div className="basis-1/2  bg-gradient-to-r from-[#1944b0]  to-slate-900  relative max-md:hidden centered flex-col overflow-hidden text-white font-extralight">
        <div className="w-[75%]  p-10 max-lg:p-7 rounded-lg shadow-md  backdrop-blur-sm  bg-white/10 ">
          <p className=" text-2xl  font-semibold  font-['georgia'] italic mb-6">
            Connecting Talents to Global Opportunities
          </p>
          <p className="text-sm ">
            With our platform, you can easily find and apply for positions that
            match your skills and aspirations.
          </p>
        </div>
        <p className="mt-16 text-sm font-medium text-center">
          Create your profile and get discovered by top companies worldwide.
        </p>

        <div className=" w-full h-full absolute inset-0 ">
          <img
            src="/images/homepage/signup-bg.svg"
            className=" w-full h-full object-cover opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

export default ForTalentSignIn;
