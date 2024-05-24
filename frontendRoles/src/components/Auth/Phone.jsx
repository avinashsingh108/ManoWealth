// Phone.tsx

import React from 'react';
import Select from './Select';


const Phone =  ({
  countryOptions,
  selectedCountry,
  onCountryChange,
  phoneNumber,
  onPhoneNumberChange,
  handleOnBlur,
  errors,
  touched,
}) => { 
  return (
    <div className="flex flex-col mb-2">
      <label className="mb-2">Phone</label>

      <div className="flex items-center">
        <div className="flex-col ">
      
            <Select
              options={countryOptions}
              onChange={onCountryChange}
              value={ selectedCountry}
            />
   
        </div>

        <div className="flex-col w-full">
          <div className="">
            <input
              type="tel"
              value={phoneNumber}
              onChange={onPhoneNumberChange}
              placeholder="Enter phone number"
              className="w-full border border-l-0 border-[#686666] px-3 py-1.5 outline-none"
              onBlur={handleOnBlur}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {touched.phoneNumber?.countryCode && errors.phoneNumber?.countryCode && (
          <div className="text-red-500 break-words w-1/4">
            {errors.phoneNumber.countryCode}
          </div>
        )}
        {touched.phoneNumber?.number && errors.phoneNumber?.number && (
          <div className="text-red-500">{errors.phoneNumber.number}</div>
        )}
      </div>
    </div>
  );
};

export default Phone;
