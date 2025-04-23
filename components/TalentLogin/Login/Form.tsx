"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginUser } from "@/hooks/login-company-hook";
import { Loader2 } from "lucide-react";

// Define validation rules for each form field
const validationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email address",
    },
  },
  password: {
    required: "This is required",
  },
};

const ForTalentSignInForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();
  const { onSubmit: loginUser, loading } = useLoginUser();

  //add Item to backeend
  const addItem = async (data: any) => {
    if (data) {
      const userData = {
        emailAddress: data.email.trim(),
        password: data.password.trim(),
      };
      await loginUser(userData);
    }
  };

  const onSubmit = (data: any) => {
    addItem(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="md:max-w-[529px] max-slg:p-4">
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
          Welcome back to Frack's workforce
        </h3>
        <p className="text-gray-500 text-sm md:max-w-[400px]">
          Discover exciting roles at the world's best companies, join a top{" "}
          class community, and access exclusive learning opportunities and
          benefits.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="flex formdivs flex-col mb-4 gap-[6px]">
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
        {/* password */}
        <div className="flex formdivs flex-col mb-6 gap-[6px]">
          <label>Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pr-10"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-600 text-sm">{`${errors.password.message}`}</span>
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
              Please wait
            </div>
          ) : (
            "Continue"
          )}
        </button>
      </form>
      <Link
        href={"/retrieve-password"}
        className="text-[#000080] mt-2 font-semibold block text-[15px]"
      >
        Forgot Password?
      </Link>
      <p className="text-sm text-[#667185] mt-6 text-center">
        Don’t have an account?{" "}
        <Link href={"/sign-up"} className="text-black font-semibold">
          Sign up
        </Link>
      </p>
    </section>
  );
};

export default ForTalentSignInForm;
