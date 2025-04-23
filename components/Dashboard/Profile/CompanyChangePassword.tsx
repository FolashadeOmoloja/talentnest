import { useForm } from "react-hook-form";
import { companyValidationRules } from "@/utilities/constants/formValidation";
import { userCompanyObject } from "@/utilities/constants/typeDef";
import { COMPANY_API_END_POINT } from "@/utilities/constants/constants";
import axios from "axios";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const CompanyChangePassword = ({
  changeState,
  user,
}: {
  changeState: (value: number) => void;
  user: userCompanyObject;
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();

  const addItem = async (data: any) => {
    if (data) {
      const updatedData = {
        currentPassword: data.currentPassword.trim(),
        password: data.password.trim(),
      };
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
          toast.success("Password changed successfully!");
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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-[#1B1818] font-semibold text-2xl mb-8">
        Change Password
      </h3>
      <div className="flex formdivs flex-col mb-6 gap-[6px]">
        <label>Current Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your current password"
            className="pr-10"
            {...register("currentPassword", {
              required: "Current password required",
              pattern: companyValidationRules.password.pattern,
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
      <div className="flex formdivs flex-col mb-6 gap-[6px]">
        <label>Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            className="pr-10"
            {...register("password", {
              required: "New Password is required",
              pattern: companyValidationRules.password.pattern,
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
              Please wait. . .
            </div>
          ) : (
            "Change Password"
          )}
        </button>
      </div>
    </form>
  );
};

export default CompanyChangePassword;
