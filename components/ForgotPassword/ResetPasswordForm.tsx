"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { RESET_API_END_POINT } from "@/utilities/constants/constants";
import { useResetPassword } from "@/hooks/reset-password-hook";

const validationRules = {
  password: {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    },
  },
};

const ResetPasswordForm = ({ company }: { company: boolean }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isValidToken, setIsValidToken] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      axios
        .get(`${RESET_API_END_POINT}/verify-token?token=${token}`)
        .then((response) => {
          setIsValidToken(true);
          setMessage(response.data.message || "Token is valid");
        })
        .catch((error) => {
          setMessage(error.response?.data?.message || "An error occurred");
        });
    }
  }, [token]);

  const { onSubmit: resetPassword, loading } = useResetPassword();

  //add Item to backeend
  const addItem = async (data: any) => {
    if (data) {
      const userData = {
        token: token,
        newPassword: data.password.trim(),
        company: company,
      };
      await resetPassword(userData, company);
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
        {isValidToken ? (
          <div className="ml-[-35px] cursor-pointer">
            <Image
              src={"/images/homepage/frack.png"}
              alt={"logo"}
              width={191}
              height={96}
              quality={100}
              priority
            />
          </div>
        ) : (
          <div className="ml-[-35px] w-full centered cursor-pointer">
            <Image
              src={"/images/homepage/frack.png"}
              alt={"logo"}
              width={191}
              height={96}
              quality={100}
              priority
            />
          </div>
        )}
        {isValidToken ? (
          <h3 className="text-[#1B1818] font-semibold text-2xl mb-1">
            Reset Password
          </h3>
        ) : (
          <h3 className="text-red-500 font-semibold text-3xl mb-1 w-full text-center">
            {message}
          </h3>
        )}
        {!isValidToken && (
          <Link
            href={
              company ? "/hire-talent/retrieve-password" : "/retrieve-password"
            }
          >
            <div className="xsm:w-[300px] centered w-full h-12 bg-[#000080] text-white shadow-sm rounded-lg hover:shadow-xl hover:bg-[#000099] transition-all duration-300 mt-9">
              Resend Link
            </div>
          </Link>
        )}
      </div>
      {isValidToken && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex formdivs flex-col mb-4 gap-[6px] sm:min-w-[380px] xxsm:min-w-[300px]">
            <label>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="pr-10"
                {...register("password", {
                  required: validationRules.password.required,
                  pattern: validationRules.password.pattern,
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
                Sending link...
              </div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      )}
    </section>
  );
};

export default ResetPasswordForm;
