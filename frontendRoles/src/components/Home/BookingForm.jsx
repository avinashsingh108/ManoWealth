import React, { useState } from "react";
import Header from "./Header";
const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    date: "",
    counsellor: "",
    timeSlot: "",
  });

  const doctors = [
    {
      name: "Dr. Pankaj Kumar, MBBS, MD",
      slots: [
        "Sat 10.00 am-10.30 am",
        "Sat 10.30 am-11.00 am",
        "Sat 11.00 am-11.30 am",
        "Sun 10.30 am-11.00 am",
        "Sun 2.00 pm-2.30 pm",
        "Sun 1.30 pm-2.00 pm",
        "Wed 10.00 am-10.30 am",
        "Wed 10.30 am-11.00 am",
        "Wed 2.00 pm-2.30 pm",
      ],
    },
    {
      name: "Dr. Rajvardhan Bhanwar, MBBS, MD",
      slots: [
        "Sat 4.00 pm-4.30 pm",
        "Sat 4.30 pm-5.00 pm",
        "Sat 5.00 pm-5.30 pm",
        "Sun 5.00 pm-5.30 pm",
        "Sun 5.30 pm-6.00 pm",
        "Sun 6.00 pm-6.30 pm",
        "Wed 4.00 pm-4.30 pm",
        "Wed 4.30 pm-5.00 pm",
        "Wed 5.00 pm-5.30 pm",
      ],
    },
    {
      name: "Dr. Karandeep Paul, MBBS, MD",
      slots: [
        "Sat 4.00 pm-4.30 pm",
        "Sat 4.30 pm-5.00 pm",
        "Sat 5.00 pm-5.30 pm",
        "Sun 5.00 pm-5.30 pm",
        "Sun 5.30 pm-6.00 pm",
        "Sun 6.00 pm-6.30 pm",
        "Wed 4.00 pm-4.30 pm",
        "Wed 4.30 pm-5.00 pm",
        "Wed 5.00 pm-5.30 pm",
      ],
    },
    {
      name: "Dr. Minakshi Dhar, MBBS, MD, PGD",
      slots: [
        "Sat 4.00 pm-4.30 pm",
        "Sat 4.30 pm-5.00 pm",
        "Sat 5.00 pm-5.30 pm",
        "Sun 4.00 pm-4.30 pm",
        "Sun 4.30 pm-5.00 pm",
        "Sun 5.00 pm-5.30 pm",
        "Wed 4.00 pm-4.30 pm",
        "Wed 4.30 pm-5.00 pm",
        "Wed 5.00 pm-5.30 pm",
      ],
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen flex items-center mt-6 justify-center bg-blue-200">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Booking Appointment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="fullName">
              Enter Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="mobileNumber">
              Enter Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">
              Enter Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1" htmlFor="counsellor">
              Choose Counsellor
            </label>
            <select
              id="counsellor"
              name="counsellor"
              value={formData.counsellor}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Counsellor</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="timeSlot">
              Choose Time Slot
            </label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select Time Slot</option>
              {formData.counsellor &&
                doctors
                  .find((doc) => doc.name === formData.counsellor)
                  ?.slots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default BookingForm;
