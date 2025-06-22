import { useEffect, useState } from "react";
import { useGetAllFilters } from "@/hooks/content-hook";
import { BsCaretRightFill, BsFillBuildingsFill } from "react-icons/bs";
import { FaMapPin, FaToolbox } from "react-icons/fa6";
import {
  DataItem,
  Jobs,
  IsCheckedState,
  IsOpenState,
  SetState,
  SelectedFilters,
  SelectedSearchFilters,
} from "@/utilities/constants/typeDef";
import {
  hoursFilter,
  proximityFilter,
  experienceFilter,
} from "@/utilities/constants/searchbarData";

const JobSearchBar = ({
  setFilteredJobs,
  setSearchFilters,
  setSelectedFilters,
  changeIsCheck,
  jobPostings,
  dropdownBg = "",
}: {
  setSelectedFilters: SetState<SelectedFilters>;
  setSearchFilters: SetState<SelectedSearchFilters>;
  setFilteredJobs: SetState<Jobs[]>;
  changeIsCheck: SetState<IsCheckedState>;
  jobPostings: Jobs[];
  dropdownBg?: string;
  filteredJobs: Jobs[];
}) => {
  const [isOpen, setIsOpen] = useState<IsOpenState>({});

  const { filter } = useGetAllFilters();
  const searchBarData: DataItem[] = [
    {
      label: "Select skill",
      options: filter.skills,
      icon: <FaToolbox />,
    },
    { label: "Select country", options: filter.country, icon: <FaMapPin /> },
    {
      label: "Select Industry",
      options: filter.role,
      icon: <BsFillBuildingsFill />,
    },
  ];

  const [selectedItems, setSelectedItems] = useState(
    searchBarData.map(() => "")
  );

  const showOptions = (idx: number) => {
    setIsOpen((prevState) => {
      const newState: IsOpenState = {};
      newState[idx] = !prevState[idx];
      return newState;
    });
  };

  // const search = () => {
  //   const newFilteredJobArr = filteredJobs.filter((job) => {
  //     const industryMatch = industry
  //       ? job.department.toLowerCase().includes(industry.toLowerCase())
  //       : true;
  //     const countryMatch = country
  //       ? job.country.toLowerCase().includes(country.toLowerCase())
  //       : true;
  //     const skillMatch = skills
  //       ? job.skills.map((s) => s.toLowerCase()).includes(skills.toLowerCase())
  //       : true;
  //     return industryMatch && countryMatch && skillMatch;
  //   });
  //   setFilteredJobs(newFilteredJobArr);
  // };

  // useEffect(() => {
  //   search();
  // }, [industry, country, skills]);

  const handleSelect = (index: number, option: string) => {
    const filterKeys = ["skills", "country", "industry"];
    setSearchFilters((prev) => ({
      ...prev,
      [filterKeys[index]]: option,
    }));

    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = option;
    setSelectedItems(newSelectedItems);
    setIsOpen((prevState) => ({
      ...prevState,
      [index]: false,
    }));
  };

  const reset = () => {
    // 1. Clear all selected filters (checkboxes)
    setSelectedFilters({ hours: [], proximity: [], experience: [] });

    // 2. Clear dropdown filters
    setSearchFilters({ industry: "", country: "", skills: "" });

    // 3. Clear the dropdown selected labels
    setSelectedItems(searchBarData.map(() => ""));

    // 4. Clear checkbox UI state
    changeIsCheck(() => {
      const resetState: IsCheckedState = {};
      [...hoursFilter, ...proximityFilter, ...experienceFilter].forEach(
        (filter) => {
          resetState[filter.idx] = false;
        }
      );
      return resetState;
    });

    // 5. Reset job list
    setFilteredJobs(jobPostings);
  };

  return (
    <section className="flex items-center mb-10 max-sm:mb-7 sm:h-[50px] max-sm:flex-col max-md:gap-7">
      <section className="flex h-full max-sm:flex-col w-full gap-4">
        {searchBarData.map((item, idx) => (
          <div
            key={idx}
            className="relative sm:h-full h-[50px]  sm:basis-1/3 w-full"
          >
            <button
              className={`dropdown-button ${dropdownBg} h-full w-full rounded-xl centered gap-3 max-md:gap-1 max-sm:gap-3 max-md:px-1  ${
                idx == 1 || idx == 2 ? "sm:border-l-0" : ""
              }`}
              onClick={() => showOptions(idx)}
            >
              {item.icon}
              {selectedItems[idx] || item.label}
              <BsCaretRightFill
                fontSize={13}
                className={`${
                  isOpen[idx]
                    ? "rotate-90 transition-transform duration-[180ms] ease-linear"
                    : ""
                }  `}
              />
            </button>
            {isOpen[idx] && (
              <div className="dropdown-menu  special-scrollbar">
                {item.options.map((option, optionIdx) => (
                  <div
                    key={optionIdx}
                    className="dropdown-item "
                    onClick={() => handleSelect(idx, option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          className="sm:h-full h-[50px] shadow-md bg-black sm:basis-1/4 max-sm:w-full text-white rounded-xl cursor-pointer"
          onClick={() => reset()}
        >
          Reset
        </button>
      </section>
    </section>
  );
};

export default JobSearchBar;
