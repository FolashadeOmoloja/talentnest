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
    <section className="h-svh flex bg-[#eaeefe]">
      <section className="md:basis-1/2 max-md:w-full flex items-center justify-center ">
        <HireTalentLoginForm />
      </section>
      <div className="basis-1/2  bg-gradient-to-r from-[#1944b0]  to-slate-900  relative max-md:hidden centered flex-col overflow-hidden text-white font-extralight">
        <div className="w-[75%]  p-10 max-lg:p-7 rounded-lg shadow-md  backdrop-blur-sm  bg-white/10 ">
          <p className=" text-2xl  font-semibold  font-['georgia'] italic mb-6">
            Connecting Companies To Global Talents
          </p>
          <p className="text-sm ">
            With our platform, businesses can effortlessly connect with top
            talent across borders—unlocking new levels of innovation, agility,
            and success.
          </p>
        </div>
        <p className="mt-16 text-sm font-medium">
          Post your job and start connecting with top talents instantly
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

export default Login;
