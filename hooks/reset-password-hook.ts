import { setLoading } from "@/redux/slices/authSlice";
import { RESET_API_END_POINT } from "@/utilities/constants/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const useSendVerificationLink = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (data: any, company: boolean) => {
    dispatch(setLoading(true));

    try {
      let response;
      if (!company) {
        response = await axios.post(
          `${RESET_API_END_POINT}/forgot-password`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axios.post(
          `${RESET_API_END_POINT}/forgot-company-password`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      const errMessage =
        error.response?.data?.message ||
        error.message ||
        "Error sending reset link. Please try again";
      toast.error(errMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    onSubmit,
    loading,
  };
};

export const useResetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (data: any, company: boolean) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${RESET_API_END_POINT}/update-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        if (company) {
          router.push("/hire-talent");
        } else {
          router.push("/sign-in");
        }
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      const errMessage =
        error.response?.data?.message ||
        error.message ||
        "Error sending reset link. Please try again";
      toast.error(errMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    onSubmit,
    loading,
  };
};

export const useSendContactUsMessage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (data: any) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${RESET_API_END_POINT}/send-contact-email`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      const errMessage =
        error.response?.data?.message ||
        error.message ||
        "Error sending. Please try again";
      toast.error(errMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    onSubmit,
    loading,
  };
};
