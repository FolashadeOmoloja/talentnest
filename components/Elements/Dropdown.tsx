import { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa6";
import { FieldError, UseFormRegister } from "react-hook-form";

interface DropdownProps {
  ItemsArr: string[];
  label: string;
  placeholder?: string;
  name: string;
  required: boolean;
  register: UseFormRegister<any>;
  errors?: FieldError;
  validationRules?: any;
  setValue: (name: string, value: string) => void;
  className?: boolean;
  defaultValue?: string;
  selctedItem2?: string | string[];
}

const Dropdown = ({
  ItemsArr,
  label,
  placeholder,
  name,
  required,
  register,
  errors,
  validationRules,
  setValue,
  className,
  defaultValue,
  selctedItem2,
}: DropdownProps) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  const showOptions = () => {
    setIsOpen(!isOpen);
    setFocus(!focus);
  };

  const handleSelect = (option: string) => {
    setSelectedItem(option);
    setValue(name, option);
    setIsOpen(false);
    setFocus(false);
  };

  useEffect(() => {
    register(name, { required: validationRules });
  }, [register, name, validationRules]);

  //updating selectedItem
  useEffect(() => {
    if (selctedItem2) {
      setSelectedItem(selctedItem2 as string);
    }
  }, [selctedItem2]);

  return (
    <section
      className={`h-full ${className ? "basis-1/2" : "slg:min-w-[450px]"}`}
    >
      <label className="text-gray-900 text-sm font-semibold">
        {label}
        {required && <span className="text-red-600 text-base">*</span>}
      </label>
      <div className="relative sm:h-full h-[50px] sm:basis-1/3 w-full">
        <div
          className={`dropdown-button text-black w-full max-sm:rounded-md h-12 rounded-lg p-[12px] mt-2 ${
            focus ? "border-[#000080]" : "border-gray-200"
          }`}
          onClick={showOptions}
        >
          {selectedItem ? (
            <span>{selectedItem}</span>
          ) : selctedItem2 ? (
            <span>{selctedItem2}</span>
          ) : (
            <span className="text-gray-400 text-sm">{placeholder}</span>
          )}
          <FaCaretDown className="absolute right-[12px] top-[18px]" />
        </div>
        {isOpen && (
          <div className="dropdown-menu custom-scrollbar mt-1 max-h-[200px]">
            {ItemsArr.map((option, optionIdx) => (
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
        <input
          type="hidden"
          value={selectedItem}
          // defaultValue={defaultValue ? defaultValue : ""}
          {...register(name)}
        />
        {errors && (
          <span className="text-red-600 text-sm">{errors.message}</span>
        )}
      </div>
    </section>
  );
};

export default Dropdown;

export const DropdownSelector = ({
  ItemsArr,
  label,
  placeholder,
  name,
  required,
  register,
  errors,
  validationRules,
  setValue,
  className,
  selctedItem2,
}: DropdownProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  const showOptions = () => {
    setIsOpen(!isOpen);
    setFocus(!focus);
  };

  const handleSelect = (option: string) => {
    if (selectedItems.includes(option)) return;

    const newSelectedItems = [...selectedItems, option];
    if (newSelectedItems.length <= 3) {
      setSelectedItems(newSelectedItems);
      setValue(name, newSelectedItems.join(", "));
      setIsOpen(false);
      setFocus(false);
    }
  };

  const handleRemove = (option: string) => {
    const newSelectedItems = selectedItems.filter((item) => item !== option);
    setSelectedItems(newSelectedItems);
    setValue(name, newSelectedItems.join(", "));
  };

  // Handle registration and validation
  useEffect(() => {
    register(name, { required: validationRules });
  }, [register, name, validationRules]);

  // Updating selectedItems based on selctedItem2
  useEffect(() => {
    if (selctedItem2) {
      setSelectedItems([selctedItem2 as string]);
      setValue(name, selctedItem2 as string);
    }
  }, [selctedItem2, setValue, name]);

  return (
    <section
      className={`h-full ${className ? "basis-1/2" : "slg:min-w-[450px]"}`}
    >
      <label className="text-gray-900 text-sm font-semibold">
        {label}
        {required && <span className="text-red-600 text-base">*</span>}
      </label>
      <div className="relative sm:h-full h-[50px] sm:basis-1/3 w-full">
        <div
          className={`dropdown-button text-black w-full max-sm:rounded-md h-12 rounded-lg p-[12px] mt-2 ${
            focus ? "border-[#000080]" : "border-gray-200"
          }`}
          onClick={showOptions}
        >
          {selectedItems.length > 0 ? (
            <span>{selectedItems.join(", ")}</span>
          ) : (
            <span className="text-gray-400 text-sm">{placeholder}</span>
          )}
          <FaCaretDown className="absolute right-[12px] top-[18px]" />
        </div>
        {isOpen && (
          <div className="dropdown-menu custom-scrollbar mt-1 max-h-[200px]">
            {ItemsArr.map((option, optionIdx) => (
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
        <input
          type="hidden"
          value={selectedItems.join(", ")}
          {...register(name)}
        />
        <div className="selected-items mt-2">
          {selectedItems.map((item, index) => (
            <span
              key={index}
              className="selected-item text-sm text-blue-600 mr-2"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="ml-1 text-red-500"
              >
                x
              </button>
            </span>
          ))}
        </div>
        {errors && (
          <span className="text-red-600 text-sm">{errors.message}</span>
        )}
      </div>
    </section>
  );
};
