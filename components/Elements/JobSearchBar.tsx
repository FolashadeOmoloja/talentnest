import { useEffect, useState } from "react";
import {
  hoursFilter,
  proximityFilter,
  experienceFilter,
} from "@/utilities/constants/searchbarData";
import { useGetAllFilters } from "@/hooks/content-hook";
import { BsCaretRightFill, BsFillBuildingsFill } from "react-icons/bs";
import { FaMapPin, FaToolbox } from "react-icons/fa6";

type IsOpenState = {
  [key: number]: boolean;
};
type filteredJobs = {
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
}[];

type IsCheckedState = {
  [key: number]: boolean;
};

type DataItem = {
  label: string;
  options: string[];
  icon: React.ReactNode;
};

const JobSearchBar = ({
  onSearch,
  jobPosting,
  onNewSearch,
  changeIsCheck,
}: {
  onSearch: React.Dispatch<React.SetStateAction<filteredJobs>>;
  onNewSearch: React.Dispatch<React.SetStateAction<filteredJobs>>;
  changeIsCheck: React.Dispatch<React.SetStateAction<IsCheckedState>>;
  jobPosting: filteredJobs;
}) => {
  const [isOpen, setIsOpen] = useState<IsOpenState>({});
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");

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

  const search = () => {
    const newFilteredJobArr = jobPosting.filter((job) => {
      return (
        job.department.toLowerCase().includes(role.toLowerCase()) &&
        job.country.toLowerCase().includes(location.toLowerCase()) &&
        job.skills.some((skill) =>
          skill.toLowerCase().includes(skills.toLowerCase())
        )
      );
    });
    onSearch(newFilteredJobArr);
    onNewSearch(newFilteredJobArr);
  };

  useEffect(() => {
    search();
  }, [role, location, skills]);

  const handleSelect = (index: number, option: string) => {
    if (index == 0) {
      setSkills(option);
    } else if (index == 1) {
      setRole(option);
    }
    if (index == 2) {
      setLocation(option);
    }

    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = option;
    setSelectedItems(newSelectedItems);
    setIsOpen((prevState) => ({
      ...prevState,
      [index]: false,
    }));
  };

  const reset = () => {
    setSelectedItems(searchBarData.map(() => ""));
    onSearch(jobPosting);
    onNewSearch(jobPosting);
    changeIsCheck(() => {
      const resetState: IsCheckedState = {};
      hoursFilter
        .concat(proximityFilter)
        .concat(experienceFilter)
        .forEach((filter) => {
          resetState[filter.idx] = false;
        });
      return resetState;
    });
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
              className={`dropdown-button h-full w-full rounded-xl centered gap-3 max-md:gap-1 max-sm:gap-3 max-md:px-1  ${
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
