"use client";
import { useForm } from "react-hook-form";
import CTABTN from "../Elements/CTA/CTA-Button";
import { useSendContactUsMessage } from "@/hooks/reset-password-hook";
import { Loader2 } from "lucide-react";

const Form = () => {
  const { onSubmit: sendMessage, loading } = useSendContactUsMessage();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // Function to handle adding item
  const addItem = async (data: any) => {
    if (data) {
      const userData = {
        name: data.name.trim(),
        email: data.email.trim(),
        company: data.company ? data.company.trim() : null,
        phone: data.phone ? data.phone.trim() : "",
        subject: data.subject ? data.subject.trim() : "",
        message: data.message.trim(),
        approvalCheck: data.approvalCheck,
      };

      sendMessage(userData);
      reset();
    }
  };

  // Submit function for form
  const onSubmit = (data: any) => {
    addItem(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <section className="mb-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="font-semibold text-sm leading-4">
              Name (required)
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              id="name"
              className="contact-input"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500">{String(errors.name.message)}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="company"
              className="font-semibold text-sm leading-4"
            >
              Company (optional)
            </label>
            <input
              type="text"
              {...register("company")}
              id="company"
              className="contact-input"
              placeholder="Your Company's name"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="font-semibold text-sm leading-4">
              Email (required)
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              id="email"
              className="contact-input"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500">{String(errors.email.message)}</p>
            )}
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="phone" className="font-semibold text-sm leading-4">
              Phone (Optional)
            </label>
            <input
              type="tel"
              {...register("phone")}
              id="phone"
              className="contact-input"
              placeholder="Your actual number"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="subject"
              className="font-semibold text-sm leading-4"
            >
              Subject (optional)
            </label>
            <input
              type="text"
              {...register("subject")}
              id="subject"
              className="contact-input"
              placeholder="Choose a subject"
            />
          </div>
        </section>
        <div className="w-full mt-6 flex flex-col gap-2">
          <label htmlFor="message" className="text-sm italic tracking-[0.01em]">
            Message (required)
          </label>
          <textarea
            {...register("message", { required: "Message is required" })}
            id="message"
            placeholder="How can we help you?"
            className="contact-input px-3 h-[176px] resize-none"
          ></textarea>
          {errors.message && (
            <p className="text-red-500">{String(errors.message.message)}</p>
          )}
        </div>
      </section>
      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          {...register("approvalCheck", { required: "Approval is required" })}
          id="approval-check"
          className="rounded-md h-5 w-5"
        />
        <label
          htmlFor="approval-check"
          className="ml-2 text-sm tracking-[0.15em]"
        >
          I’m okay with getting emails and having that activity tracked to
          improve my experience.
        </label>
        {errors.approvalCheck && (
          <p className="text-red-500">{String(errors.approvalCheck.message)}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-[180px] max-xxsm:w-full h-12 bg-white text-[#000080] shadow-sm rounded-lg font-semibold"
        disabled={isSubmitting}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </div>
        ) : (
          "Send message"
        )}
      </button>
      {/* <CTABTN
        route={""}
        CTA="Send message"
        showIcon
        color="text-black"
        backGround="bg-white"
        width="w-[180px]"
      /> */}
    </form>
  );
};

export default Form;
