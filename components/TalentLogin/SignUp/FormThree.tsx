import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineUploadFile } from "react-icons/md";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import StepCounter from "@/components/Elements/StepCounter";
import Dropdown from "@/components/Elements/Dropdown";
import { BiSolidFileDoc } from "react-icons/bi";
import FormLogo from "@/components/Elements/FormLogo";
import { companyValidationRules as validationRules } from "@/utilities/constants/formValidation";
import { useDispatch, useSelector } from "react-redux";
import { setStep3Data } from "@/redux/slices/talentRegistrationSlice";
import { RootState } from "@/redux/store";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const FormThree = ({
  changeBgState,
  changeActive,
  setResume,
}: {
  changeBgState: (value: string) => void;
  changeActive: (value: number) => void;
  setResume: (value: File | null) => void;
}) => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { step3Data } = useSelector(
    (state: RootState) => state.talentRegistration
  );

  useEffect(() => {
    if (step3Data) {
      setValue("channel", step3Data.channel);
    }
  }, [step3Data, setValue]);

  const onSubmit = (data: any) => {
    dispatch(setStep3Data({ channel: data.channel }));
    setResume(data.resume);
    changeBgState("url('/images/homepage/signup-bg6.svg')");
    changeActive(4);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setFileSizeError(`File size should not exceed ${MAX_FILE_SIZE_MB}MB`);
        setFileUrl(null);
        setFileName(null);
        setFileType(null);
        setValue("resume", null);
      } else {
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        setFileName(file.name);
        setFileType(file.type);
        setFileSizeError(null);
      }
    }
  };

  const clearFile = () => {
    setFileUrl(null);
    setFileName(null);
    setFileType(null);
    setValue("resume", null);
    setFileSizeError(null);
  };

  return (
    <section className="signup-form">
      <div className="mb-6">
        <FormLogo />
        <div className="px-[15px]">
          <StepCounter activeThree pastActiveTwo pastActiveOne />
        </div>
        <h3 className="text-[#1B1818] font-semibold text-2xl mb-1">
          Upload your resume
        </h3>
        <p className="text-gray-500 text-sm">
          This will form the basis of your Frack profile, which can be updated
          any time
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="w-full h-[220px] border-2 border-[#CACCCF] rounded-lg border-dashed relative centered">
          <input
            type="file"
            accept=".pdf, .doc, .docx"
            className="h-full w-full opacity-0 absolute top-0"
            {...register("resume", {
              required: validationRules.resume.required,
            })}
            onChange={handleFileChange}
          />
          {fileUrl ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              {fileType === "application/pdf" ? (
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                  <div className="w-full h-full ">
                    <Viewer fileUrl={fileUrl} />
                  </div>
                </Worker>
              ) : (
                <div className="flex flex-col items-center">
                  <BiSolidFileDoc className="text-[100px] text-[#000080]" />
                  <span className="text-sm w-[80%] text-center">
                    {fileName}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#f4f6fa] sm:w-[325px] w-[80%] h-[178px] rounded-md centered flex-col text-center gap-3">
              <MdOutlineUploadFile className="text-[38px]" />
              <span className="font-bold text-lg">Upload your resume</span>
              <p className="text-sm">
                Drop your file here (PDF, DOC, DOCX) or{" "}
                <span className="text-[#000080] font-bold">Browse</span>
                <br />
                Max file size: 2MB
              </p>
            </div>
          )}
        </div>
        {fileSizeError ? (
          <div className="text-red-600 text-sm">{fileSizeError}</div>
        ) : fileUrl ? (
          <button
            type="button"
            className=" bg-[#000080] text-white h-[40px] font-semibold xxsm:w-[100px] text-sm rounded-md"
            onClick={clearFile}
          >
            Change File
          </button>
        ) : errors.resume ? (
          <span className="text-red-600 text-sm">
            Please upload your resume
          </span>
        ) : null}
        <Dropdown
          ItemsArr={["Twitter", "Whatsapp", "LinkedIn", "Referral"]}
          label="How did you hear about Frack? (optional)"
          placeholder="Select an option"
          name={"channel"}
          required={false}
          register={register}
          setValue={setValue}
          selctedItem2={step3Data.channel}
        />
        <div className="mb-14 mt-14 max-sm:mt-10 flex gap-10 max-xsm:gap-5">
          <div
            className="login-btn centered gap-3 cursor-pointer icon-animate"
            onClick={() => {
              changeActive(2);
              changeBgState("url('/images/homepage/signup-bg4.svg')");
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

export default FormThree;
