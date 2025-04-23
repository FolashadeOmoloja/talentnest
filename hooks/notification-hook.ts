import { setLoading } from "@/redux/slices/authSlice";
import { setApplyLoading } from "@/redux/slices/jobSlice";
import {
  setCompanyNotification,
  setTalentNotification,
} from "@/redux/slices/notificationSlice";
import {
  COMPANY_API_END_POINT,
  TALENT_API_END_POINT,
} from "@/utilities/constants/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const handleSendNotification = () => {
  const { loading } = useSelector((store: any) => store.job);
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (
    id: any,
    senderMessage: string,
    receiverMessage: string,
    meetingUrlLink?: string
  ) => {
    const meetingUrl = meetingUrlLink || null;
    dispatch(setApplyLoading(true));
    try {
      const response = await axios.post(
        `${COMPANY_API_END_POINT}/create-company-notification`,
        {
          senderMessage,
          receiverMessage,
          meetingUrl,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        toast.success(message);
        router.push("/hire-talent/dashboard/notifications");
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
      dispatch(setApplyLoading(false));
    }
  };

  return {
    onSubmit,
    loading,
  };
};

export const useGetCompanyNotifications = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchNotice = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `${COMPANY_API_END_POINT}/get-company-notification`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        dispatch(setCompanyNotification(response.data.notifications));
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch companies";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchNotice();
  }, []);

  return { loading };
};

export const useDeleteCompanyNotificationById = () => {
  const dispatch = useDispatch();
  const onSubmit = async (id: any) => {
    try {
      const response = await axios.delete(
        `${COMPANY_API_END_POINT}/delete-notice/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, notifications } = response.data;

      if (success) {
        dispatch(setCompanyNotification(response.data.notifications));
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
    }
  };

  return {
    onSubmit,
  };
};

export const useDeleteAllCompanyNotifications = () => {
  const { loading } = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const onSubmit = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.delete(
        `${COMPANY_API_END_POINT}/delete-all-notice`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, notifications } = response.data;

      if (success) {
        dispatch(setCompanyNotification(response.data.notifications));
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
    onSubmit,
  };
};

export const useGetTalentNotifications = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((store: any) => store.auth);
  useEffect(() => {
    const fetchNotice = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `${TALENT_API_END_POINT}/get-talent-notification`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        dispatch(setTalentNotification(response.data.notifications));
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch companies";
        toast.error(errorMessage);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchNotice();
  }, []);

  return { loading };
};

export const useDeleteTalentNotificationById = () => {
  const dispatch = useDispatch();
  const onSubmit = async (id: any) => {
    try {
      const response = await axios.delete(
        `${TALENT_API_END_POINT}/delete-notice/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, notifications } = response.data;

      if (success) {
        dispatch(setTalentNotification(response.data.notifications));
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
    }
  };

  return {
    onSubmit,
  };
};

export const useDeleteAllTalentNotifications = () => {
  const dispatch = useDispatch();
  const onSubmit = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.delete(
        `${TALENT_API_END_POINT}/delete-all-notice`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message, notifications } = response.data;

      if (success) {
        dispatch(setTalentNotification(response.data.notifications));
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
    onSubmit,
  };
};
