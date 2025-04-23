import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";
import { setUser, setLoading } from "../redux/slices/authSlice";
import { COMPANY_API_END_POINT } from "@/utilities/constants/constants";

const useRegisterCompany = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading } = useSelector((store: any) => store.auth);

  const onSubmit = async (companyData: any) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        companyData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const { success, message, company, token } = response.data;

      if (success) {
        // Handle 'Set-Cookie' header if necessary
        const setCookieHeader = response.headers["set-cookie"];
        if (setCookieHeader) {
          Cookies.set("token", setCookieHeader[0]);
        }

        // Set user in Redux
        dispatch(setUser(company));

        // Redirect to the dashboard with `refresh=true` in query params
        router.push("/hire-talent/dashboard?refresh=true");

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

export default useRegisterCompany;
