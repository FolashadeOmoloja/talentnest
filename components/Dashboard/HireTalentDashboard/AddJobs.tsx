"use client";
import Dropdown from "@/components/Elements/Dropdown";
import { useAddJob } from "@/hooks/job-hook";
import { validationRules } from "@/utilities/constants";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const AddJobs = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const { user } = useSelector((store: any) => store.auth);
  const { filter } = useSelector((store: any) => store.content);
  const { onSubmit: addJob, loading } = useAddJob();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState(filter.skills);

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      const updatedSkills = [...skills, skill];
      setSkills(updatedSkills);
      setValue("skills", updatedSkills);
      setNewSkill("");
      setFilteredSuggestions(filter.skills);
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, idx) => idx !== index);
    setSkills(updatedSkills);
    setValue("skills", updatedSkills); // Update the form state with the new skills array
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewSkill(value);
    setFilteredSuggestions(
      filter.skills.filter((item: string) =>
        item.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  const addItem = async (data: any) => {
    if (data) {
      const jobPost = {
        title: data.jobPostTitle.trim(),
        location: data.location.trim(),
        salaryRange1: data.salaryRange1.trim(),
        salaryRange2: data.salaryRange2.trim(),
        jobProximity: data.workMode.trim(),
        jobHours: data.workHours.trim(),
        experience: data.experienceLevel.trim(),
        skills: skills,
        role: data.role.trim(),
        country: data.country.trim(),
        department: data.department.trim(),
        // employmentType,
        description: data.description.trim(),
      };

      await addJob(jobPost);
    }
  };
  const onSubmit = (data: any) => {
    addItem(data);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className="dashboard-container min-h-svh">
      <h2 className="text-2xl font-bold mb-1">
        Welcome, {user?.companyName && mounted ? user?.companyName : ""}! Ready
        to Create a New Job Listing?
      </h2>
      <span className="text-[#7C8698]">
        Efficiently create and manage your job postings.
      </span>
      <section className="flex justify-center w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-sm md:w-[70%] py-8 md:px-16 sm:px-6 px-4 mt-16 max-sm:mt-10 max-sm:py-6"
        >
          <div className="flex   md:text-lg font-bold mt-16  justify-center">
            <span
              className={`tab active max-sm:h-[50px] text-xl w-full xsm:w-[200px]`}
            >
              Job Details
            </span>
          </div>
          <p className="text-gray-500 text-lg mt-9">
            Fill the form below to add a job post
          </p>
          <section className="mt-8">
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Job Post Title <span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter a title for your job post"
                {...register("jobPostTitle", {
                  required: validationRules.jobPostTitle.required,
                })}
              />
              {errors.jobPostTitle && (
                <span className="text-red-600 text-sm">{`${errors.jobPostTitle.message}`}</span>
              )}
            </div>
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Required Role <span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter the role required"
                {...register("role", {
                  required: validationRules.role.required,
                })}
              />
              {errors.role && (
                <span className="text-red-600 text-sm">{`${errors.role.message}`}</span>
              )}
            </div>
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Country <span className="text-red-600 text-base">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter country"
                {...register("country", {
                  required: validationRules.country.required,
                })}
              />
              {errors.country && (
                <span className="text-red-600 text-sm">{`${errors.country.message}`}</span>
              )}
            </div>
            <div className="flex formdivs max-slg:flex-col mb-[20px] gap-[20px]">
              <div className="basis-1/2 flex flex-col gap-[6px]">
                <label>
                  Location e.g (Lagos, Nigeria){" "}
                  <span className="text-red-600 text-base">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter location e.g (Lagos, Nigeria)"
                  {...register("location", {
                    required: validationRules.location.required,
                  })}
                />
                {errors.location && (
                  <span className="text-red-500 text-sm">{`${errors.location.message}`}</span>
                )}
              </div>
              <Dropdown
                ItemsArr={filter.role}
                label="Department"
                placeholder="Select a Department"
                name={"department"}
                required={true}
                register={register}
                errors={errors.department as FieldError}
                validationRules={validationRules.department.required}
                setValue={setValue}
                className
              />
            </div>
            <div className="flex formdivs max-slg:flex-col mb-[20px] gap-[20px]">
              <div className="basis-1/2 flex flex-col gap-[6px]">
                <label>
                  Salary Range ($){" "}
                  <span className="text-red-600 text-base">*</span>
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder=""
                    {...register("salaryRange1", {
                      required: validationRules.salaryRange.required,
                    })}
                  />
                  <input
                    type="number"
                    placeholder=""
                    {...register("salaryRange2", {
                      required: validationRules.salaryRange.required,
                    })}
                  />
                </div>
                {errors.salaryRange && (
                  <span className="text-red-500 text-sm">{`${errors.salaryRange.message}`}</span>
                )}
              </div>
              <Dropdown
                ItemsArr={["On-site", "Hybrid", "Fully Remote", "Remote"]}
                label="Work Mode"
                placeholder="Select a work mode"
                name={"workMode"}
                required={true}
                register={register}
                errors={errors.workMode as FieldError}
                validationRules={validationRules.workMode.required}
                setValue={setValue}
                className
              />
            </div>
            <div className="flex formdivs max-slg:flex-col mb-[20px] gap-[20px]">
              <Dropdown
                ItemsArr={["Intermediate", "Senior level", "C-level"]}
                label="Experience Level"
                placeholder="Select an option"
                name={"experienceLevel"}
                required={true}
                register={register}
                errors={errors.experienceLevel as FieldError}
                validationRules={validationRules.experienceLevel.required}
                setValue={setValue}
                className
              />
              <Dropdown
                ItemsArr={["6", "8", "10", "12"]}
                label="No of working hours (per day)"
                placeholder="Select working hours"
                name={"workHours"}
                required={true}
                register={register}
                errors={errors.workHours as FieldError}
                validationRules={validationRules.workHours.required}
                setValue={setValue}
                className
              />
            </div>
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label>
                Job Description{" "}
                <span className="text-red-600 text-base">*</span>
              </label>
              <textarea
                placeholder="Enter a detailed description for your job post"
                {...register("description", {
                  required: validationRules.description.required,
                  // maxLength: {
                  //   value: 1000,
                  //   message: "Description cannot exceed 1000 words",
                  // },
                })}
                rows={10}
                className="resize-none"
              />
              {errors.description && (
                <span className="text-red-600 text-sm">{`${errors.description.message}`}</span>
              )}
            </div>
            <div className="flex formdivs flex-col mb-4 sm:mb-5 gap-[6px]">
              <label className="text-lg">
                Skills Needed
                <span className="text-red-600 text-base">*</span>
              </label>
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={newSkill}
                  onChange={onChangeHandler}
                  placeholder="Add a skill"
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => addSkill(newSkill)}
                  className="py-2 px-4 bg-[#000080] text-white rounded-md"
                >
                  Add
                </button>
                {newSkill && filteredSuggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-12 max-h-40 overflow-auto  custom-scrollbar">
                    {filteredSuggestions.map(
                      (suggestion: string, index: number) => (
                        <li
                          key={index}
                          className="p-2 hover:bg-[#00008015] cursor-pointer"
                          onClick={() => addSkill(suggestion)}
                        >
                          {suggestion}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
              {errors.skills && (
                <span className="text-red-600 text-sm">{`${errors.skills.message}`}</span>
              )}
              <ul className="mt-2">
                {skills.map((skill, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-[#000080] text-white shadow-sm rounded-lg btn-hover mt-20"
              disabled={isSubmitting}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </div>
              ) : (
                "Add Job"
              )}
            </button>
          </section>
        </form>
      </section>
    </section>
  );
};

export default AddJobs;
