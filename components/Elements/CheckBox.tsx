import React, { useState } from "react";

const StyledCheckbox: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <div
        className={`w-6 h-6 flex items-center justify-center border-2 transition-colors duration-200 ${
          checked ? "bg-[#000080]" : "bg-white"
        } `}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
      <span className="ml-2 text-gray-700">Accept Terms and Conditions</span>
    </label>
  );
};

export default StyledCheckbox;
