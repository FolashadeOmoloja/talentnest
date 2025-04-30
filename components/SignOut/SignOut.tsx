"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Logo from "../Elements/Logo";
import { TALENT_API_END_POINT } from "@/utilities/constants/constants";

interface DashboardSignOutProps {
  END_POINT: string;
}

const DashboardSignOut: React.FC<DashboardSignOutProps> = ({ END_POINT }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);
  const handleSignOut = async () => {
    try {
      dispatch(setLoading(true));
      const res = await axios.get(`${END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        router.push("/");
        toast.success(res.data.message);
      }
    } catch (error: any) {
      const errMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      toast.error(errMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <section className="h-svh flex bg-[#eaeefe]">
      <section className="md:basis-1/2 max-md:w-full centered flex-col p-10">
        <div className="centered flex-col mb-6">
          <Logo />
          <h3 className="text-[#010D3E] font-semibold text-2xl mb-2 mt-10">
            See you again soon!
          </h3>
          <p className="text-gray-500 text-sm max-w-[350px] text-center">
            You're about to sign out of your account. Come back anytime to pick
            up where you left off.
          </p>
        </div>

        <div className="mt-4 flex gap-10 max-xsm:gap-5 w-full max-w-[500px]">
          <button className="form-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="login-btn" onClick={handleSignOut}>
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </div>
            ) : (
              "Sign Out"
            )}
          </button>
        </div>
      </section>
      <div className="basis-1/2  bg-gradient-to-r from-[#1944b0]  to-slate-900  relative max-md:hidden centered flex-col overflow-hidden text-white font-extralight">
        <div className="w-[75%]  p-10 max-lg:p-7 rounded-lg shadow-md  backdrop-blur-sm  bg-white/10 ">
          <p className=" text-2xl  font-semibold  font-['georgia'] italic mb-6">
            {END_POINT === TALENT_API_END_POINT
              ? "Thanks for stopping by TalentNest!"
              : "Thanks for trusting TalentNest!"}
          </p>
          <p className="text-sm ">
            {END_POINT === TALENT_API_END_POINT
              ? "Feel free to return anytime to pick up where you left off and continue your journey."
              : "Feel free to return anytime and continue building your dream team."}
          </p>
        </div>

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

export default DashboardSignOut;
