"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useLoginUser } from "@/hooks/login-company-hook";
import { Loader2 } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { useSendVerificationLink } from "@/hooks/reset-password-hook";

// Define validation rules for each form field
const validationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email address",
    },
  },
};

const RetrievePasswordForm = ({ company }: { company: boolean }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();
  const { onSubmit: sendLink, loading } = useSendVerificationLink();

  //add Item to backeend
  const addItem = async (data: any) => {
    const route = company ? "hire-talent/reset-password" : "reset-password";
    if (data) {
      const userData = {
        email: data.email.trim(),
        route: route,
      };
      await sendLink(userData, company);
    }
  };

  const onSubmit = (data: any) => {
    addItem(data);
  };

  return (
    <section className="md:max-w-[529px] max-slg:p-4">
      <div
        onClick={() => router.push("/sign-in")}
        className="flex text-[#000080] gap-3 text-xl items-center font-bold mb-6 cursor-pointer"
      >
        <FaArrowLeft />
        <span>Go back</span>
      </div>
      <div className="mb-6">
        <div
          className="ml-[-35px] cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src={"/images/homepage/frack.png"}
            alt={"logo"}
            width={191}
            height={96}
            quality={100}
            priority
          />
        </div>
        <h3 className="text-[#1B1818] font-semibold text-2xl mb-1">
          Retrieve Password
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="flex formdivs flex-col mb-4 gap-[6px] sm:min-w-[380px] xxsm:min-w-[300px]">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email address"
            {...register("email", {
              required: validationRules.email.required,
              pattern: validationRules.email.pattern,
            })}
          />
          {errors.email && (
            <span className="text-red-600 text-sm">{`${errors.email.message}`}</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-[#000080] text-white shadow-sm rounded-lg hover:shadow-xl hover:bg-[#000099] transition-all duration-300"
          disabled={isSubmitting}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending link...
            </div>
          ) : (
            "Send Link"
          )}
        </button>
      </form>
    </section>
  );
};

export default RetrievePasswordForm;
