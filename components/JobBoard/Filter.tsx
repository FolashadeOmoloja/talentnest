import { useState, useEffect } from "react";
import {
  hoursFilter,
  proximityFilter,
  experienceFilter,
} from "@/utilities/constants/searchbarData";
import {
  Jobs,
  IsCheckedState,
  SetState,
  SelectedFilters,
} from "@/utilities/constants/typeDef";

type FilterProps = {
  selectedFilters: SelectedFilters;
  setSelectedFilters: SetState<SelectedFilters>;
  changeIsCheck: SetState<IsCheckedState>;
  isChecked: IsCheckedState;
};

const Filter = ({
  selectedFilters,
  setSelectedFilters,
  changeIsCheck,
  isChecked,
}: FilterProps) => {
  const handleCheckboxChange = (
    filterType: keyof SelectedFilters, // ensure this is strongly typed
    value: string,
    idx: number
  ) => {
    changeIsCheck((prevState) => ({
      ...prevState,
      [idx]: !prevState[idx],
    }));

    setSelectedFilters((prev) => {
      const current = prev[filterType];
      return {
        ...prev,
        [filterType]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  // useEffect(() => {
  //   const newFilteredJobs = jobPosting.filter((job) => {
  //     const hoursMatch = selectedHours.length
  //       ? selectedHours.includes(job.jobHours)
  //       : true;
  //     const proximityMatch = selectedProximity.length
  //       ? selectedProximity.includes(job.jobProximity)
  //       : true;
  //     const experienceMatch = selectedExperience.length
  //       ? selectedExperience.includes(job.experience)
  //       : true;

  //     return hoursMatch && proximityMatch && experienceMatch;
  //   });

  //   setFilteredJobs(newFilteredJobs);
  // }, [selectedHours, selectedProximity, selectedExperience]);

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
                  className="accent-[#010D3E] w-4 h-4 cursor-pointer bg-slate-700"
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
                  className="accent-[#010D3E] w-4 h-4 cursor-pointer bg-slate-700"
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
                  className="accent-[#010D3E] w-4 h-4 cursor-pointer bg-slate-700"
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
