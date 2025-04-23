import { setLoading, setUser } from "@/redux/slices/authSlice";
import {
  COMPANY_API_END_POINT,
  TALENT_API_END_POINT,
} from "@/utilities/constants/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const uploadTalentProfilePhoto = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);
  const handleProfilePhotoUpload = async (file: File) => {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("file", file); // The field name should match your backend setup

    try {
      const response = await axios.post(
        `${TALENT_API_END_POINT}/update/profile-photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const { success, message, talent } = response.data;
      if (success) {
        // Set user in Redux
        dispatch(setUser(talent));
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return {
    handleProfilePhotoUpload,
    loading,
  };
};

export const uploadCompanyProfilePhoto = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);
  const handleProfilePhotoUpload = async (file: File) => {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("file", file); // The field name should match your backend setup

    try {
      const response = await axios.post(
        `${COMPANY_API_END_POINT}/update/profile-photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const { success, message, company } = response.data;
      if (success) {
        // Set user in Redux
        dispatch(setUser(company));
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return {
    handleProfilePhotoUpload,
    loading,
  };
};
