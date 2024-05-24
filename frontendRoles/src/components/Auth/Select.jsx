import React, { useEffect, useState } from 'react';

const Select = ({ options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (selectedOption) => {
    onChange(selectedOption);
    setSelectedValue(selectedOption);
    setIsOpen(false);
  };

  useEffect(() => {
    onChange(selectedValue);
  }, [value]);

  return (
    <div className="relative inline-block text-left border-[#686666]">
      <div>
        <span
          className={`border-[#686666] cursor-pointer inline-flex items-center px-4 py-2 border bg-white text-sm font-medium text-gray-700 focus:outline-none `}
          onClick={handleToggle}
        >
          {selectedValue.label}
          <svg
            className={`ml-2 -mr-0.5 h-4 w-4 ${isOpen ? '-rotate-180' : 'rotate-0'} transition-transform`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 bg-white ring-1 ring-black ring-opacity-5 cursor-pointer">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-[#862d42] hover:text-white ${
                  selectedValue && selectedValue.value === option.value ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  handleOptionClick(option)}}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
