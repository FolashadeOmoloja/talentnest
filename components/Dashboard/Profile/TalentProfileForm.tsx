import PhoneNoInput from "@/components/Elements/PhoneNoInput";
import { useForm } from "react-hook-form";
import { validationRules } from "@/utilities/constants";
import Dropdown from "@/components/Elements/Dropdown";
import { userObject } from "@/utilities/constants/typeDef";
import axios from "axios";
import { TALENT_API_END_POINT } from "@/utilities/constants/constants";
import { toast } from "sonner";
import { useState } from "react";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const TalentProfileForm = ({
  changeState,
  user,
}: {
  changeState: (value: number) => void;
  user: userObject;
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
  } = useForm();
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);
  const { loading } = useSelector((store: any) => store.auth);
  const { filter } = useSelector((store: any) => store.content);
  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFileSizeError(`File size should not exceed ${MAX_FILE_SIZE_MB}MB`);
      } else {
        setFileSizeError(null);
      }
    }
  };

  const addItem = async (data: any) => {
    const updatedData: Record<string, any> = {};

    // Loop over the form data and check for changes
    if (data.firstName !== user.firstName)
      updatedData["firstName"] = data.firstName;
    if (data.lastName !== user.lastName)
      updatedData["lastName"] = data.lastName;
    if (data.email !== user.emailAddress)
      updatedData["emailAddress"] = data.email;
    if (
      data.mobileNo !== user.phoneNumber ||
      data.countryCode !== user.countryCode
    ) {
      updatedData["phoneNumber"] = data.mobileNo.replace(/^0+/, "");
      updatedData["countryCode"] = data.countryCode;
    }
    if (data.experienceLevel !== user.experienceLevel)
      updatedData["experienceLevel"] = data.experienceLevel;
    if (data.experience !== user.experienceYears)
      updatedData["experienceYears"] = data.experience;
    if (data.role !== user.industry) updatedData["industry"] = data.role;
    if (data.preference !== user.preference)
      updatedData["preference"] = data.preference;
    if (data.resume && data.resume[0]) updatedData["file"] = data.resume[0];

    if (Object.keys(updatedData).length > 0) {
      try {
        dispatch(setLoading(true));
        const formData = new FormData();
        for (const key in updatedData) {
          formData.append(key, updatedData[key]);
        }

        const response = await axios.put(
          `${TALENT_API_END_POINT}/profile/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        const { talent } = response.data;
        if (response.data.success) {
          dispatch(setUser(talent));
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
    if (!fileSizeError) {
      addItem(data);
    } else {
      toast.error(fileSizeError);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex formdivs max-slg:flex-col mb-[20px] gap-[20px]">
        <div className="basis-1/2">
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
        <div className="basis-1/2">
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
      <div className="flex flex-col gap-4">
        <div className="flex max-sslg:flex-col gap-[20px] ">
          <Dropdown
            ItemsArr={["Senior", "Intermediate", "C-level"]}
            label="Experience Level"
            placeholder={user.experienceLevel}
            name={"experienceLevel"}
            required={false}
            register={register}
            setValue={setValue}
            className
            defaultValue={user.experienceLevel}
            selctedItem2={user.experienceLevel}
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
            placeholder={user.experienceYears}
            name={"experience"}
            required={false}
            register={register}
            setValue={setValue}
            className
            defaultValue={user.experienceYears}
            selctedItem2={user.experienceYears}
          />
        </div>
        <div className="flex max-sslg:flex-col gap-[20px] ">
          <Dropdown
            ItemsArr={filter.role}
            label="Industry"
            placeholder="Engineering"
            name={"role"}
            required={false}
            register={register}
            setValue={setValue}
            defaultValue={user.industry}
            selctedItem2={user.industry}
            className
          />
          <Dropdown
            ItemsArr={["On Site", "Hybrid", "Fully Remote", "Remote"]}
            label="Work Mode Preference"
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
        <div>
          <label className="text-sm font-semibold">
            Resume(.pdf, .doc, .docx) Max 2mb
            <span className="text-red-600 text-base">*</span>
          </label>

          {!isEditingResume ? (
            <div className="relative">
              <a href={user.resume} target="_blank">
                {user.resumeOriginalName || "No resume uploaded"}
              </a>
              <button
                type="button"
                className="text-[#000080] slg:absolute right-0 top-0 block"
                onClick={() => setIsEditingResume(true)}
              >
                Edit Resume
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="file"
                accept=".pdf, .doc, .docx"
                className="h-full w-full file:text-white file:rounded-md file:cursor-pointer file:border-0 file:p-2 file:bg-[#000080] mt-[6px] text-sm file:mr-6"
                {...register("resume", {
                  required: validationRules.resume.required,
                  onChange: (e) => handleFileChange(e),
                })}
              />
              {fileSizeError && (
                <div className="text-red-600 text-sm">{fileSizeError}</div>
              )}
              <button
                type="button"
                className="text-red-500  mt-1 slg:absolute right-0"
                onClick={() => setIsEditingResume(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 flex gap-10 max-xsm:gap-5">
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

export default TalentProfileForm;
