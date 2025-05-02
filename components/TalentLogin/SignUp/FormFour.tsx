import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getRandomColor } from "@/utilities/constants";
import useRegisterTalent from "@/hooks/register-user-hook";
import { Loader2 } from "lucide-react";
import Logo from "@/components/Elements/Logo";

interface TalentRegistrationData {
  firstName: string;
  lastName: string;
  mobileNo: string;
  countryCode: string;
  email: string;
  password: string;
  country: string;
  location: string;
  url: string;
  experience: string;
  profession: string;
  level: string;
  role: string;
  preference: string;
  skills: string;
  resume: File;
  privacyConsent: boolean;
  channel?: string;
}

const FormFour = ({ resume }: { resume: File | null }) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { onSubmit: registerTalent, loading } = useRegisterTalent();

  const { step1Data, step2Data, step3Data } = useSelector(
    (state: RootState) => state.talentRegistration
  );

  // Function to add item to the backend
  const addItem = async () => {
    const hexCode = getRandomColor();

    const data: Partial<TalentRegistrationData> = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
    };

    const formData = new FormData();

    // Append all other fields with a fallback for undefined values
    formData.append("firstName", data.firstName?.trim() || "");
    formData.append("lastName", data.lastName?.trim() || "");
    formData.append(
      "phoneNumber",
      data.mobileNo?.trim().replace(/^0+/, "") || ""
    );
    formData.append("countryCode", data.countryCode?.trim() || "");
    formData.append("emailAddress", data.email?.trim() || "");
    formData.append("profession", data.profession?.trim() || "");
    formData.append("password", data.password?.trim() || "");
    formData.append("country", data.country?.trim() || "");
    formData.append("hex", hexCode || "");
    formData.append("location", data.location?.trim() || "");
    formData.append("linkedInUrl", data.url?.trim() || "");
    formData.append("experienceYears", data.experience?.trim() || "");
    formData.append("experienceLevel", data.level?.trim() || "");
    formData.append("industry", data.role?.trim() || "");
    formData.append("preference", data.preference?.trim() || "");
    formData.append("skills", data.skills?.trim() || "");
    formData.append("privacyConsent", data.privacyConsent ? "true" : "false");
    formData.append("channel", data.channel?.trim() || "");

    //@ts-ignore
    if (resume && resume.length > 0) {
      //@ts-ignore
      formData.append("file", resume[0]); // Access the first file in the FileList
    }

    await registerTalent(formData);
  };

  // Handle form submission
  const onSubmit = () => {
    addItem();
  };

  return (
    <section className="signup-form h-[100vh]">
      <div className="mb-6 xsm:mt-36 mt-16">
        <div className="cursor-pointer  flex justify-center">
          <Logo />
        </div>
        <div className="centered flex-col ">
          <h3 className="text-[#010D3E] font-semibold text-2xl  mb-2 mt-7 text-center">
            Congratulations 🎉!
          </h3>
          <p className="text-gray-500 text-sm text-center">
            You're all set! Your registration is complete, and you've been added
            to the waitlist.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit" className="form-btn" disabled={isSubmitting}>
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </div>
          ) : (
            "Continue"
          )}
        </button>
      </form>
    </section>
  );
};

export default FormFour;
