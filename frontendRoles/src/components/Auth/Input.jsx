import React, { ChangeEvent } from 'react';



const Input = ({ label, type = "text", name, value, onChange, error ,placeholder  , isTouched,handleOnBlur}) => {
  
  return (
    <div className="mb-4">
      <label  className="block mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleOnBlur}
        placeholder={placeholder}
        className={`w-full p-2 border border-[#686666] focus:border-[#686666] focus:outline-none`}
      />
      {error &&  isTouched ? <div className="text-red-500 mt-1">{error}</div> : null}
    </div>
  );
};

export default Input;



