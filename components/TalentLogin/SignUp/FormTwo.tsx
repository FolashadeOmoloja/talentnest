import { FieldError, useForm } from "react-hook-form";
import StepCounter from "@/components/Elements/StepCounter";
import Dropdown from "@/components/Elements/Dropdown";
import { FaArrowLeft } from "react-icons/fa6";
import FormLogo from "@/components/Elements/FormLogo";
import { useDispatch, useSelector } from "react-redux";
import { setStep2Data } from "@/redux/slices/talentRegistrationSlice";
import { companyValidationRules as validationRules } from "@/utilities/constants/formValidation";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useGetAllFilters } from "@/hooks/content-hook";

const FormTwo = ({
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

  //add Item to backeend
  const dispatch = useDispatch();
  const { step2Data } = useSelector(
    (state: RootState) => state.talentRegistration
  );
  const { filter } = useGetAllFilters();

  useEffect(() => {
    if (step2Data) {
      setValue("role", step2Data.role);
      setValue("experience", step2Data.experience);
      setValue("skills", step2Data.skills);
      setValue("level", step2Data.level);
      setValue("preference", step2Data.preference);
      setValue("url", step2Data.url);
    }
  }, [step2Data, setValue]);

  const onSubmit = (data: any) => {
    dispatch(setStep2Data(data));
    changeBgState("url('/images/homepage/signup-bg5.svg')");
    changeActive(3);
  };

  return (
    <section className="signup-form">
      <div className="mb-6">
        <FormLogo />
        <div className="px-[15px]">
          <StepCounter activeTwo pastActiveOne />
        </div>
        <h3 className="text-[#1B1818] font-semibold text-2xl mb-1">
          Professional expertise
        </h3>
        <p className="text-gray-500 text-sm">
          Let us match you with the greatest companies in the world.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Dropdown
          ItemsArr={filter.role}
          label="Department"
          placeholder="Select your department"
          name={"role"}
          required={true}
          register={register}
          errors={errors.role as FieldError}
          validationRules={validationRules.role.required}
          setValue={setValue}
          selctedItem2={step2Data.role}
        />
        <Dropdown
          ItemsArr={[
            "2-4 years",
            "4-6 years",
            "6-8 years",
            "8-10 years",
            "above 10 years",
          ]}
          label="Total years of work experience"
          placeholder={"Select years of work experience"}
          name={"experience"}
          required={true}
          register={register}
          errors={errors.experience as FieldError}
          validationRules={validationRules.experience.required}
          setValue={setValue}
          selctedItem2={step2Data.experience}
        />
        <Dropdown
          ItemsArr={filter.skills}
          label="Primary skill"
          placeholder="Select a skill"
          name={"skills"}
          required={true}
          register={register}
          errors={errors.skills as FieldError}
          validationRules={validationRules.skills.required}
          setValue={setValue}
          selctedItem2={step2Data.skills}
        />
        <Dropdown
          ItemsArr={["Intermediate", "Senior", "C-level"]}
          label="Current experience level"
          placeholder="Select your experience level"
          name={"level"}
          required={true}
          register={register}
          setValue={setValue}
          errors={errors.level as FieldError}
          validationRules={validationRules.level.required}
          selctedItem2={step2Data.level}
        />

        <Dropdown
          ItemsArr={["On Site", "Hybrid", "Remote", "Fully Remote"]}
          label="Work mode preference"
          placeholder="Select your preference"
          name={"preference"}
          required={true}
          register={register}
          errors={errors.preference as FieldError}
          validationRules={validationRules.preference.required}
          setValue={setValue}
          selctedItem2={step2Data.preference}
        />

        {/* linkedin url */}
        <div className="flex formdivs flex-col mb-4 gap-[6px]">
          <label>
            linkedin url <span className="text-red-600 text-base">*</span>
          </label>
          <input
            type="url"
            defaultValue={step2Data.url}
            placeholder="Enter linkedin url"
            {...register("url", {
              required: validationRules.url.required,
              pattern: validationRules.url.pattern,
            })}
          />
          {errors.url && (
            <span className="text-red-600 text-sm">{`${errors.url.message}`}</span>
          )}
        </div>
        <div className="mb-12 flex gap-10 max-xsm:gap-5">
          <div
            className="login-btn centered gap-3 cursor-pointer icon-animate"
            onClick={() => {
              changeActive(1);
              changeBgState("url('/images/homepage/signup-bg3.svg')");
            }}
          >
            <FaArrowLeft /> <span>Back</span>
          </div>
          <button type="submit" className="login-btn" disabled={isSubmitting}>
            Continue
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormTwo;
