import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = ({ company }: { company: boolean }) => {
  return (
    <section className="h-svh flex bg-[#eaeefe]">
      <section className="md:basis-1/2 max-md:w-full flex items-center justify-center ">
        <ResetPasswordForm company={company} />
      </section>
      <div className="basis-1/2  bg-gradient-to-r from-[#1944b0]  to-slate-900  relative max-md:hidden centered flex-col overflow-hidden text-white font-extralight">
        <div className="w-[75%]  p-10 max-lg:p-7 rounded-lg shadow-md  backdrop-blur-sm  bg-white/10 ">
          <p className=" text-2xl  font-semibold  font-['georgia'] italic mb-6">
            {company
              ? "Connecting Companies To Global Talents"
              : "Connecting Talents to Global Opportunities"}
          </p>
          <p className="text-sm ">
            {company
              ? "With our platform, businesses can effortlessly connect with top talent across borders, unlocking new levels of innovation, agility, and success."
              : "With our platform, you can easily find and apply for positions that match your skills and aspirations."}
          </p>
        </div>
        <p className="mt-16 text-sm font-medium text-center">
          {company
            ? "Post your job and start connecting with top talents instantly"
            : "Create your profile and get discovered by top companies worldwide."}
        </p>

        <div className=" w-full h-full absolute inset-0 ">
          <img
            src="/images/homepage/signup-bg.svg"
            className=" w-full h-full object-cover opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
