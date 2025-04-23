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
    <section className="xsm:h-[100vh] flex">
      <div
        className="basis-1/2 bg-cover bg-no-repeat bg-[#000080] relative max-md:hidden"
        style={{ backgroundImage: "url('/images/homepage/signup-bg2.svg')" }}
      >
        <p className="login-text max-xlg:top-[50px] ">
          <span className="font-semibold text-base">
            Our AI-driven platform streamlines the process
          </span>{" "}
          <br />
          making it easier and more efficient than ever before. Gone are the
          days of sifting through countless resumes and conducting endless
          interviews.
        </p>
      </div>
      <section className="md:basis-1/2 max-md:w-full flex items-center justify-center">
        <ForTalentSignInForm />
      </section>
    </section>
  );
};

export default ForTalentSignIn;
