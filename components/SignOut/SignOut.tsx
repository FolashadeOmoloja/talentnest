"use client";
import FormLogo from "@/components/Elements/FormLogo";
import { useRouter } from "next/navigation";
import React from "react";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
    <section className="flex">
      <div
        className="basis-1/2 bg-cover bg-no-repeat bg-[#000080] relative max-md:hidden"
        style={{ backgroundImage: "url('/images/homepage/signup-bg6.svg')" }}
      >
        <p className="login-text top-[30px] xlg:max-w-[230px] ">
          <span className="font-semibold text-base">
            "Thank You for Visiting Frack!"
          </span>{" "}
          <br />
          We hope you had a productive time. Remember, you can always come back
          and continue where you left off.
        </p>
      </div>
      <section className="md:basis-1/2 max-md:w-full flex items-center justify-center">
        <section className="signup-form h-[100vh]  ">
          <div className="mb-6 xsm:mt-32 mt-20">
            <FormLogo />
            <div className="centered flex-col  mb-20 ">
              <h3 className="text-[#1B1818] font-semibold text-2xl mb-1 text-center">
                We hope to see you again soon!
              </h3>
              <p className="text-gray-500  text-center">
                You are about to log out from this account.
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-10 max-xsm:gap-5">
            <button
              className="login-btn gap-3 cursor-pointer bg-[#00B5E8] hover:bg-[#00B5E8]"
              onClick={handleCancel}
            >
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
      </section>
    </section>
  );
};

export default DashboardSignOut;
