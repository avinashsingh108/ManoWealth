import React from "react";

const Popup = ({ onClose, navigate, daysLeft }) => {
  const handleClose = () => {
    onClose();
    navigate("/usersection");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center font-montserrat bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center bg-white p-4 sm:p-8 rounded-lg shadow-md w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%]">
        <p className="text-base sm:text-xl font-medium text-center text-red-600">
          You've already completed the survey. You can take it again after{" "}
          {daysLeft} days.
        </p>
        <button
          onClick={handleClose}
          className="bg-red-500 text-base font-medium sm:text-lg text-white py-1 px-4 mt-4 rounded-md hover:bg-red-600"
        >
          Back to Profile
        </button>
      </div>
    </div>
  );
};

export default Popup;
