import { Column } from "react-table";
import {
  userObject,
  JobPosted,
  SuccessApplications,
} from "./constants/typeDef";
import CTABTN from "@/components/Elements/CTA/CTA-Button";
import { DownloadResumeBotton } from "@/components/Elements/ProfileBox";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setJob } from "@/redux/slices/jobSlice";
import { useEditJob } from "@/hooks/job-hook";
import { FaBriefcase, FaLocationDot, FaMapPin } from "react-icons/fa6";
import { BsBuildingFillGear, BsCashStack } from "react-icons/bs";

type Company = {
  companyName: string;
};

export interface JobApplication {
  title: string;
  jobProximity: string;
  location: string;
  company: Company;
  priceRange: string;
  status: string;
  salaryRange1: string;
  salaryRange2: string;
}

export const activeColumns: Column<JobApplication>[] = [
  {
    Header: "",
    accessor: "title",
    Cell: ({ row }: { row: { original: JobApplication } }) => {
      return <span>{row.original.title}</span>;
    },
  },
  {
    Header: "",
    accessor: "jobProximity",
    Cell: ({ row }: { row: { original: JobApplication } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2">
            <FaMapPin color="#010D3E" />
            {row.original.jobProximity}
          </span>
          <span className="flex items-center gap-2">
            <FaLocationDot color="#010D3E" />
            {row.original.location}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "priceRange",
    Cell: ({ row }: { row: { original: JobApplication } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2">
            <FaBriefcase color="#010D3E" />
            {row.original.company.companyName}
          </span>
          <span className="flex items-center gap-2">
            <BsCashStack color="#010D3E" />${row.original.salaryRange1} - $
            {row.original.salaryRange2}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "status",
    Cell: ({ row }: { row: { original: JobApplication } }) => {
      return (
        <button className="w-[138px] h-[50px] bg-[#D8D8D8] text-gray-500 text-sm rounded-md">
          {row.original.status}
        </button>
      );
    },
  },
];

export const companyActiveColumns: Column<JobPosted>[] = [
  {
    Header: "",
    accessor: "title",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return <span>{row.original.title}</span>;
    },
  },
  {
    Header: "",
    accessor: "department",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2">
            <BsBuildingFillGear color="#010D3E" />
            {row.original.department}
          </span>
          <span className="flex items-center gap-2">
            <FaLocationDot color="#010D3E" />
            {row.original.location}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "employmentType",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2">
            <FaMapPin color="#010D3E" />
            {row.original.jobProximity}
          </span>
          <span className="flex items-center gap-2">
            <BsCashStack color="#010D3E" />${row.original.salaryRange1} - $
            {row.original.salaryRange2}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "applicants",
    Cell: ({ row }: { row: { index: number; original: JobPosted } }) => {
      const dispatch = useDispatch();
      const router = useRouter();
      const editJob = (data: any, idx: number) => {
        dispatch(setJob(data));
        router.push(`/hire-talent/dashboard/my-jobs/edit-job/${idx}`);
      };
      return (
        <CTABTN
          route={``}
          isFunc
          func={() => editJob(row.original, row.index)}
          CTA="Edit Job"
          height2="h-[50px] text-sm"
        />
      );
    },
  },
];

export const closedJobsColumns: Column<JobPosted>[] = [
  {
    Header: "",
    accessor: "title",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return <span>{row.original.title}</span>;
    },
  },
  {
    Header: "",
    accessor: "department",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2">
            <BsBuildingFillGear color="#010D3E" />
            {row.original.department}
          </span>
          <span className="flex items-center gap-2">
            <FaLocationDot color="#010D3E" />
            {row.original.location}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "employmentType",
    Cell: ({ row }: { row: { original: JobPosted } }) => {
      return (
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2">
            <FaMapPin color="#010D3E" />
            {row.original.jobProximity}
          </span>
          <span className="flex items-center gap-2">
            <BsCashStack color="#010D3E" />${row.original.salaryRange1} - $
            {row.original.salaryRange2}
          </span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "applicants",
    Cell: ({ row }: { row: { index: number; original: JobPosted } }) => {
      const { onSubmit: updateJob } = useEditJob();

      const dispatch = useDispatch();
      const router = useRouter();
      const changeStatus = async (id: any, idx: any, data: any) => {
        const updatedStatus: Record<string, any> = {};
        updatedStatus["status"] = "Open";

        // Call the API to update job status
        await updateJob(updatedStatus, id);
        dispatch(setJob(data));
        router.push(`/hire-talent/dashboard/my-jobs/open-job/${idx}`);
      };

      return (
        <CTABTN
          route={``}
          isFunc
          func={() => changeStatus(row.original._id, row.index, row.original)}
          CTA="Reopen Job"
          height2="h-[50px] text-sm"
          backGround="bg-[#000000]"
        />
      );
    },
  },
];

export const hiredCandidatesColumn: Column<SuccessApplications>[] = [
  {
    Header: "",
    accessor: "job",
    Cell: ({ row }: { row: { original: SuccessApplications } }) => {
      return (
        <div className="flex flex-col gap-2">
          <span>{row.original.job.title}</span>
        </div>
      );
    },
  },
  {
    Header: "",
    accessor: "talent",
    Cell: ({ row }: { row: { original: SuccessApplications } }) => {
      return (
        <section className="flex flex-col gap-3 ">
          <div className="p-7">
            <div
              className="border border-[#010D3E] rounded-full overflow-hidden "
              style={{ width: "50px", height: "50px" }}
            >
              {row.original.talent.profileImage ? (
                <img
                  src={row.original.talent.profileImage}
                  alt=" "
                  className="object-cover w-full h-full"
                />
              ) : (
                <section
                  className={`w-[50px] h-[50px]  text-xl text-white  font-bold centered bg-[#010D3E]`}
                >
                  {row.original.talent.firstName[0]}
                </section>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Name: </span>{" "}
              {row.original.talent.firstName}
              {row.original.talent.lastName}
            </p>
            <p>
              <span className="font-semibold">
                Profession: {row.original.talent.profession}
              </span>
            </p>
          </div>
        </section>
      );
    },
  },
  {
    Header: "",
    accessor: "status",
    Cell: ({ row }: { row: { original: SuccessApplications } }) => {
      return (
        <div className="flex flex-col gap-2">
          <p>
            {" "}
            <span className="font-semibold">Industry: </span>
            {row.original.talent.industry}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Level: </span>
            {row.original.talent.experienceLevel}
          </p>
          <p>
            {" "}
            <span className="font-semibold">Experience: </span>
            {row.original.talent.experienceYears}
          </p>
          <p>
            <span className="font-semibold">Location: </span>
            {row.original.talent.location}, {row.original.talent.country}{" "}
          </p>
        </div>
      );
    },
  },
];
