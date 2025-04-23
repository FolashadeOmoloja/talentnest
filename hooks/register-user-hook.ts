import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { setUser, setLoading } from "../redux/slices/authSlice";
import { TALENT_API_END_POINT } from "@/utilities/constants/constants";

const useRegisterTalent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (formData: any) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${TALENT_API_END_POINT}/registerTalent`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const { success, message, talent, token } = response.data;

      if (success) {
        const setCookieHeader = response.headers["set-cookie"];
        if (setCookieHeader) {
          Cookies.set("token", setCookieHeader[0]);
        }

        dispatch(setUser(talent));
        router.push("/dashboard?refresh=true");

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
    loading,
  };
};

export default useRegisterTalent;
