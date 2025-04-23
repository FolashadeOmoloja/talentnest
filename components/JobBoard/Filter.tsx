import { useState, useEffect } from "react";
import {
  hoursFilter,
  proximityFilter,
  experienceFilter,
} from "@/utilities/constants/searchbarData";

type Job = {
  title: string;
  company: string;
  location: string;
  priceRange: string;
  jobProximity: string;
  jobHours: string;
  experience: string;
  skills: string[];
  role: string;
  department: string;
  country: string;
};

type IsCheckedState = {
  [key: number]: boolean;
};

type FilterProps = {
  jobPostings: Job[];
  onFilter: (filteredJobs: Job[]) => void;
  changeIsCheck: React.Dispatch<React.SetStateAction<IsCheckedState>>;
  isChecked: IsCheckedState;
};

const Filter = ({
  jobPostings,
  onFilter,
  changeIsCheck,
  isChecked,
}: FilterProps) => {
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [selectedProximity, setSelectedProximity] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);

  const handleCheckboxChange = (
    filterType: string,
    value: string,
    idx: number
  ) => {
    changeIsCheck((prevState) => ({
      ...prevState,
      [idx]: !prevState[idx],
    }));

    const updateState = (
      currentState: string[],
      setState: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
      if (currentState.includes(value)) {
        setState(currentState.filter((item) => item !== value));
      } else {
        setState([...currentState, value]);
      }
    };

    if (filterType === "hours") {
      updateState(selectedHours, setSelectedHours);
    } else if (filterType === "proximity") {
      updateState(selectedProximity, setSelectedProximity);
    } else if (filterType === "experience") {
      updateState(selectedExperience, setSelectedExperience);
    }
  };

  useEffect(() => {
    const filteredJobs = jobPostings.filter((job) => {
      const hoursMatch = selectedHours.length
        ? selectedHours.includes(job.jobHours)
        : true;
      const proximityMatch = selectedProximity.length
        ? selectedProximity.includes(job.jobProximity)
        : true;
      const experienceMatch = selectedExperience.length
        ? selectedExperience.includes(job.experience)
        : true;

      return hoursMatch && proximityMatch && experienceMatch;
    });

    onFilter(filteredJobs);
  }, [
    selectedHours,
    selectedProximity,
    selectedExperience,
    jobPostings,
    onFilter,
  ]);

  return (
    <section>
      <ul>
        <li>
          <span className="mb-6 inline-block font-semibold">Job Hrs</span>
          <ul>
            {hoursFilter.map((item) => (
              <li key={item.idx} className="mb-2 flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={isChecked[item.idx]}
                  className="accent-[#000080] w-4 h-4 cursor-pointer bg-slate-700"
                  onChange={() =>
                    handleCheckboxChange("hours", item.item, item.idx)
                  }
                />
                <span className="text-sm flex ">{item.item} hours</span>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <span className="mb-6 mt-[26px] inline-block font-semibold">
            Job Proximity
          </span>
          <ul>
            {proximityFilter.map((item) => (
              <li key={item.idx} className="mb-2 flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={isChecked[item.idx]}
                  className="accent-[#000080] w-4 h-4 cursor-pointer bg-slate-700"
                  onChange={() =>
                    handleCheckboxChange("proximity", item.item, item.idx)
                  }
                />
                <span className="text-sm flex ">{item.item}</span>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <span className="mb-6 mt-[26px] inline-block font-semibold">
            Experience
          </span>
          <ul>
            {experienceFilter.map((item) => (
              <li key={item.idx} className="mb-2 flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={isChecked[item.idx]}
                  className="accent-[#000080] w-4 h-4 cursor-pointer bg-slate-700"
                  onChange={() =>
                    handleCheckboxChange("experience", item.item, item.idx)
                  }
                />
                <span className="text-sm flex ">{item.item}</span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </section>
  );
};

export default Filter;
