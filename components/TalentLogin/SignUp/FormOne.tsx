import { useForm } from "react-hook-form";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import PhoneNoInput from "@/components/Elements/PhoneNoInput";
import StepCounter from "@/components/Elements/StepCounter";
import FormLogo from "@/components/Elements/FormLogo";
import { companyValidationRules as validationRules } from "@/utilities/constants/formValidation";
import { setStep1Data } from "@/redux/slices/talentRegistrationSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Define validation rules for each form field

const FormOne = ({
  changeBgState,
  changeActive,
}: {
  changeBgState: (value: string) => void;
  changeActive: (value: number) => void;
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  //add Item
  const dispatch = useDispatch();
  const { step1Data } = useSelector(
    (state: RootState) => state.talentRegistration
  );

  const onSubmit = (data: any) => {
    dispatch(setStep1Data(data));
    changeBgState("url('/images/homepage/signup-bg4.svg')");
    changeActive(2);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="signup-form">
      <div className="mb-6">
        <FormLogo />
        <div className="px-[15px]">
          <StepCounter activeOne />
        </div>
        <h3 className="text-[#1B1818] font-semibold text-2xl mb-1">
          Apply to join Frack’s workforce
        </h3>
        <p className="text-gray-500 text-sm">
          Discover exciting roles at the world's best companies, join a top{" "}
          <br className="max-sm:hidden" />
          class community, and access exclusive learning opportunities and
          benefits.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex formdivs max-sm:flex-col mb-[20px] gap-[20px]">
          <div className="basis-1/2">
            <label>
              First Name <span className="text-red-600 text-base">*</span>
            </label>
            <input
              type="text"
              defaultValue={step1Data?.firstName}
              placeholder="Enter your First Name"
              {...register("firstName", {
                required: validationRules.firstName.required,
              })}
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{`${errors.firstName.message}`}</span>
            )}
          </div>
          {/* Last Name */}
          <div className="basis-1/2">
            <label>
              Last Name <span className="text-red-600 text-base">*</span>
            </label>
            <input
              type="text"
              defaultValue={step1Data?.lastName}
              placeholder="Enter your Last Name"
              {...register("lastName", {
                required: validationRules.lastName.required,
              })}
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{`${errors.lastName.message}`}</span>
            )}
          </div>
        </div>
        {/* Email */}
        <div className="flex formdivs flex-col mb-4 gap-[6px]">
          <label>
            Email Address <span className="text-red-600 text-base">*</span>
          </label>
          <input
            type="email"
            defaultValue={step1Data.email}
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
        {/* Mobile No. */}
        <div className="flex formdivs flex-col mb-4 gap-[6px]">
          <label>
            Phone Number <span className="text-red-600 text-base">*</span>
          </label>
          <PhoneNoInput
            register={register}
            validationRules={validationRules}
            defaultValue={step1Data.mobileNo}
            defaultCode={step1Data.countryCode}
            setValue={setValue}
          />
          {errors.mobileNo && (
            <span className="text-red-600 text-sm">{`${errors.mobileNo.message}`}</span>
          )}
        </div>
        {/*country and state */}
        <div className="flex formdivs max-sm:flex-col mb-[20px] gap-[20px]">
          <div className="basis-1/2">
            <label>
              Country <span className="text-red-600 text-base">*</span>
            </label>
            <input
              type="text"
              defaultValue={step1Data.country}
              placeholder="Enter your country"
              {...register("country", {
                required: validationRules.country.required,
              })}
            />
            {errors.country && (
              <span className="text-red-500 text-sm">{`${errors.country.message}`}</span>
            )}
          </div>
          {/* Last Name */}
          <div className="basis-1/2">
            <label>
              Location (state/city){" "}
              <span className="text-red-600 text-base">*</span>
            </label>
            <input
              type="text"
              defaultValue={step1Data.location}
              placeholder="Enter your location e.g Lagos"
              {...register("location", {
                required: validationRules.location.required,
              })}
            />
            {errors.location && (
              <span className="text-red-500 text-sm">{`${errors.location.message}`}</span>
            )}
          </div>
        </div>
        {/* profession */}
        <div className="flex formdivs flex-col mb-4 gap-[6px]">
          <label>
            Profession <span className="text-red-600 text-base">*</span>
          </label>
          <input
            type="text"
            defaultValue={step1Data.email}
            placeholder="Enter your professional role"
            {...register("profession", {
              required: validationRules.profession.required,
            })}
          />
          {errors.profession && (
            <span className="text-red-600 text-sm">{`${errors.profession.message}`}</span>
          )}
        </div>
        {/* password */}
        <div className="flex formdivs flex-col mb-6 gap-[6px]">
          <label>Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              defaultValue={step1Data.password}
              placeholder="Enter your password"
              className="pr-10"
              {...register("password", {
                required: "Password is required",
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
        <div className="mb-6  ">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="approval-check"
              className="rounded-md h-5 w-5 accent-[#000080]"
              {...register("privacyConsent", {
                required: validationRules.privacyConsent.required,
              })}
            />
            <label
              htmlFor="approval-check"
              className="ml-2 text-sm text-[#667185]"
            >
              By submitting my personal data, I consent to Frack collecting,
              processing, and storing my information.
            </label>
          </div>
          {errors.privacyConsent && (
            <span className="text-red-500 text-sm">{`${errors.privacyConsent.message}`}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full h-12 bg-[#000080] text-white shadow-sm rounded-lg hover:shadow-xl hover:bg-[#000099] transition-all duration-300"
          disabled={isSubmitting}
        >
          Continue
        </button>
      </form>
      <p className="text-sm text-[#667185] mt-6 mb-20 text-center">
        Already have an account?{" "}
        <Link href={"/sign-in"} className="text-black font-semibold ">
          Log in
        </Link>
      </p>
    </section>
  );
};

export default FormOne;
