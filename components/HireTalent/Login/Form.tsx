import { useForm } from "react-hook-form";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { validationRules } from "@/utilities/constants";
import useLoginCompany from "@/hooks/login-company-hook";
import { Loader2 } from "lucide-react";
import Logo from "@/components/Elements/Logo";
import { useRouter } from "next/navigation";

const HireTalentLoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { onSubmit: loginCompany, loading } = useLoginCompany();

  //add Item to backeend
  const addItem = async (data: any) => {
    if (data) {
      const companyData = {
        emailAddress: data.email.trim(),
        password: data.password.trim(),
      };
      await loginCompany(companyData);
    }
  };

  const onSubmit = (data: any) => {
    addItem(data);
    // router.push("/hire-talent/dashboard");
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const router = useRouter();
  return (
    <section className="md:max-w-[529px] max-sm:p-4 ">
      <div className="mb-6">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Logo />
        </div>

        <h3 className="text-[#010D3E] font-semibold text-2xl mb-2 mt-10">
          Start hiring smarter
        </h3>
        <p className="text-gray-500 text-sm max-w-[350px]">
          TalentNest empowers companies to tap into a worldwide network of
          skilled professionals.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="flex formdivs flex-col mb-4 gap-[6px]">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your work address"
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

        <button type="submit" className="form-btn" disabled={isSubmitting}>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </div>
          ) : (
            "Find Talent"
          )}
        </button>
      </form>
      <Link
        href={"/hire-talent/retrieve-password"}
        className="text-[#010d3e] mt-2 font-semibold block text-[13px]"
      >
        Forgot Password?
      </Link>
      <p className="text-sm text-[#667185] mt-6 text-center">
        Don’t have an account?{" "}
        <Link
          href={"/hire-talent/sign-up"}
          className="text-black font-semibold"
        >
          Sign up
        </Link>
      </p>
    </section>
  );
};

export default HireTalentLoginForm;
