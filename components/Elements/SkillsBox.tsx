import { useState } from "react";
import axios from "axios";
import { FaTrashCan } from "react-icons/fa6";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { TALENT_API_END_POINT } from "@/utilities/constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/slices/authSlice";
import { useGetAllFilters } from "@/hooks/content-hook";

interface SkillsProps {
  initialSkills: string[];
}

const SkillsBox: React.FC<SkillsProps> = ({ initialSkills }) => {
  const [skillsArr, setSkillsArr] = useState<string[]>(initialSkills);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((store: any) => store.auth);
  const { filter } = useGetAllFilters();

  const handleUpdateSkills = async (skills: string[], action: string) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${TALENT_API_END_POINT}/update/skills`,
        { skills, action }, // Pass skills and action
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { success, message, skills: updatedSkills, talent } = response.data;
      if (success) {
        setSkillsArr(updatedSkills);
        dispatch(setUser(talent));

        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSelect = (option: string) => {
    if (skillsArr.length < 6 && !skillsArr.includes(option)) {
      const updatedSkills = [...skillsArr, option];
      setSkillsArr(updatedSkills);
      handleUpdateSkills(updatedSkills, "add"); // Pass "add" action
    }
    setIsOpen(false);
  };

  const handleRemoveSkill = (idx: number) => {
    const skillToRemove = skillsArr[idx];
    const updatedSkills = skillsArr.filter((_, i) => i !== idx);
    setSkillsArr(updatedSkills);
    handleUpdateSkills([skillToRemove], "remove"); // Pass "remove" action
  };

  return (
    <section className="bg-white rounded-md mt-10 p-9 max-slg:p-7 max-sm:px-4">
      <div className="flex justify-between text-[#000080] font-bold text-lg relative">
        <span className="text-[#1B2C42]">Skills</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={skillsArr.length >= 6 || loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Add"}
        </button>
        {isOpen && (
          <div className="dropdown-menu custom-scrollbar max-w-[270px] max-h-[200px] font-normal right-0 text-sm text-black top-6">
            {filter.skills.map((option: any, optionIdx: number) => (
              <div
                key={optionIdx}
                className="dropdown-item"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <ul className="text-[#7C8698] font-medium mt-8 flex flex-col gap-3">
        {skillsArr.map((item, idx) => (
          <li
            className="flex justify-between cursor-pointer items-center"
            key={idx}
          >
            <span>{item}</span>
            <span
              className="text-sm text-[#000080]"
              onClick={() => handleRemoveSkill(idx)}
            >
              <FaTrashCan />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-red-600 font-semibold">
        (Max. of 6 core skills)
      </p>
    </section>
  );
};

export default SkillsBox;
