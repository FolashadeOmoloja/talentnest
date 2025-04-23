import PhoneNoInput from "@/components/Elements/PhoneNoInput";
import { FieldError, useForm } from "react-hook-form";
import { companyValidationRules as validationRules } from "@/utilities/constants/formValidation";
import Dropdown, { DropdownSelector } from "@/components/Elements/Dropdown";
import { userCompanyObject } from "@/utilities/constants/typeDef";
import { COMPANY_API_END_POINT } from "@/utilities/constants/constants";
import axios from "axios";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { industriesArr } from "@/utilities/constants/searchbarData";
import { Loader2 } from "lucide-react";

const CompanyProfileForm = ({
  changeState,
  user,
}: {
  changeState: (value: number) => void;
  user: userCompanyObject;
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  const addItem = async (data: any) => {
    const updatedData: Record<string, any> = {};

    // Loop over the form data and check for changes
    if (data.companyName !== user.companyName)
      updatedData["companyName"] = data.companyName;
    if (data.firstName !== user.firstName)
      updatedData["firstName"] = data.firstName;
    if (data.lastName !== user.lastName)
      updatedData["lastName"] = data.lastName;
    if (data.role !== user.companyRole)
      updatedData["companyRole"] = data.companyRole;
    if (data.preference !== user.preference)
      updatedData["preference"] = data.preference;
    if (data.email !== user.emailAddress)
      updatedData["emailAddress"] = data.email;
    if (
      data.mobileNo !== user.phoneNumber ||
      data.countryCode !== user.countryCode
    ) {
      updatedData["phoneNumber"] = data.mobileNo.replace(/^0+/, "");
      updatedData["countryCode"] = data.countryCode;
    }

    if (data.industries !== user.industry) {
      let industriesArray;

      // Check if data.industries is a string and can be split
      if (typeof data.industries === "string") {
        industriesArray = data.industries
          .split(",")
          .map((industry: string) => industry.trim());
      } else if (Array.isArray(data.industries)) {
        // If it's already an array, just use it directly
        industriesArray = data.industries;
      } else {
        // Handle the case where data.industries is undefined or another type
        industriesArray = [];
      }

      updatedData["industry"] = industriesArray;
    }

    if (Object.keys(updatedData).length > 0) {
      try {
        dispatch(setLoading(true));
        const response = await axios.put(
          `${COMPANY_API_END_POINT}/profile/update`,
          updatedData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        const { company } = response.data;
        if (response.data.success) {
          dispatch(setUser(company));
          changeState(0);
          toast.success("Profile updated successfully!");
        } else {
          toast.error(response.data.message);
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occurred");
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      toast.info("No changes to update");
    }
  };

  const onSubmit = (data: any) => {
    addItem(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex formdivs flex-col mb-4 gap-[6px]">
        <label>
          Company Name <span className="text-red-600 text-base">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your company Name"
          defaultValue={user.companyName}
          {...register("companyName", {
            required: validationRules.companyName.required,
          })}
        />
      </div>
      <div className="flex formdivs max-slg:flex-col mb-[20px] gap-[20px]">
        <div className="basis-1/2 flex flex-col  gap-[6px]">
          <label>
            First Name <span className="text-red-600 text-base">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your First Name"
            defaultValue={user.firstName}
            {...register("firstName", {
              required: validationRules.firstName.required,
            })}
          />
        </div>
        {/* Last Name */}
        <div className="basis-1/2 flex flex-col  gap-[6px]">
          <label>
            Last Name <span className="text-red-600 text-base">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your Last Name"
            defaultValue={user.lastName}
            {...register("lastName", {
              required: validationRules.lastName.required,
            })}
          />
        </div>
      </div>
      <div className="flex max-sslg:flex-col gap-[20px] mb-4 ">
        <div className="flex formdivs flex-col  gap-[6px] basis-1/2">
          <label>
            Role <span className="text-red-600 text-base">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your company role"
            defaultValue={user.companyRole}
            {...register("role", {
              required: validationRules.role.required,
            })}
          />
        </div>
        <Dropdown
          ItemsArr={["On Site", "Hybrid", "Fully Remote", "Remote"]}
          label="Work Culture"
          placeholder="Remote"
          name={"preference"}
          required={false}
          register={register}
          setValue={setValue}
          defaultValue={user.preference}
          selctedItem2={user.preference}
          className
        />
      </div>

      {/* Email */}
      <div className="flex formdivs flex-col mb-4 gap-[6px]">
        <label>
          Email Address <span className="text-red-600 text-base">*</span>
        </label>
        <input
          type="email"
          defaultValue={user.emailAddress}
          placeholder="Enter your email address"
          {...register("email", {
            required: validationRules.email.required,
            pattern: validationRules.email.pattern,
          })}
        />
      </div>
      {/* Mobile No. */}
      <div className="flex formdivs flex-col mb-4 gap-[6px]">
        <label>
          Phone Number <span className="text-red-600 text-base">*</span>
        </label>
        <PhoneNoInput
          register={register}
          validationRules={validationRules}
          defaultValue={user.phoneNumber}
          defaultCode={user.countryCode}
          setValue={setValue}
        />
      </div>
      <br className="mb-4" />
      {/* industry */}
      <DropdownSelector
        ItemsArr={industriesArr}
        label="Select industry that best represent your company (max 3)"
        placeholder="Choose up to 3 industries"
        name="industries"
        required={true}
        register={register}
        errors={errors.industries as FieldError}
        validationRules={{
          required: "At least one industry must be selected",
        }}
        setValue={setValue}
        selctedItem2={user.industry}
        className={false}
      />
      <br className="mb-2" />

      <div className="mt-16 flex gap-10 max-xsm:gap-5">
        <div
          className="login-btn centered gap-3 cursor-pointer icon-animate"
          onClick={() => changeState(0)}
        >
          Cancel
        </div>
        <button type="submit" className="login-btn" disabled={isSubmitting}>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </div>
          ) : (
            "Update Profile"
          )}
        </button>
      </div>
    </form>
  );
};

export default CompanyProfileForm;
