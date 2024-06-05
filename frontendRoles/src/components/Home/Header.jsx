import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  // console.log('path is ' ,pathname)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleConsultClick = () => {
    setShowPopup(true);
  };

  const handleSubmit = () => {
    toast.success("Appointment booked successfully!");  
    setShowPopup(false);
  };

  return (
    <div className="absolute top-0 bg-white font-bold font-montserrat pt-1 sm:px-6 flex flex-wrap justify-between md:justify-between items-center w-full max-w-screen">
      <div className="mx-1 sm:mx-2 rounded-full sm:mb-0.5 flex p-0.5">
        <img
          src="/img/logo.jfif"
          alt="logo"
          className="h-8 sm:h-16 ml-0 lg:ml-6 xl:ml-32"
        />
      </div>
      <div className="flex">
        {!token && (
          <div>
            <button
              onClick={() => {
                navigate("/");
              }}
              className=" px-3 py-1 sm:px-6 sm:py-2 rounded-full text-xs font-extrabold sm:text-base mr-1 sm:mr-4 sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Home
            </button>
          </div>
        )}

        <div
          className="relative mr-1 sm:mr-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {token ? (
            <button
              className=" px-3 py-1 sm:px-6 sm:py-2 rounded-full text-xs font-extrabold sm:text-base sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? "true" : "false"}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
                localStorage.removeItem("user");
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className=" px-3 py-1 sm:px-6 sm:py-2 rounded-full text-xs font-extrabold sm:text-base sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? "true" : "false"}
              onClick={() => {
                navigate("/AdminLogin");
              }}
            >
              Admin
            </button>
          )}
          
          {/* {!token && isDropdownOpen && (
            <div className="absolute right-0 sm:left-0 z-10 w-fit bg-white rounded-md shadow-lg ">
              <button
                onClick={() => {
                  navigate("/AdminLogin");
                }}
                className="block py-1 sm:px-2 sm:py-2 text-xs sm:text-sm text-gray-800 hover:bg-gray-100 w-full rounded-lg text-center"
              >
                Admin
              </button>
              <button
                onClick={() => {
                  navigate("/superAdminLogin");
                }}
                className="block py-1 sm:px-2 sm:py-2 text-xs sm:text-sm text-gray-800 hover:bg-gray-100 w-28 rounded-lg text-center"
              >
                SuperAdmin
              </button>
            </div>
          )} */}
        </div>
        <div>
            <button
              onClick={() => navigate("/consultation")}
              className="px-3 py-1 sm:px-6 sm:py-2 rounded-full text-xs font-extrabold sm:text-base mr-1 sm:mr-4 sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Consult
            </button>
          {pathname === "/usersection" ? (
            <button
              onClick={handleConsultClick}
              className="px-3 py-1 sm:px-6 sm:py-2 rounded-full text-xs font-extrabold sm:text-base mr-1 sm:mr-4 sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Consult
            </button>
          ) : ( 
            token && (
              <button
                onClick={() => {
                  navigate("/usersection");
                }}
                className="px-3 py-1 sm:px-6 sm:py-2 rounded-full text-xs font-extrabold sm:text-base mr-1 sm:mr-4 sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
              >
                Profile
              </button>
            )
          )}
        </div>
        <div className="mr-1 sm:mr-2 lg:mr-12 xl:mr-24">
            <button
              onClick={() => {
                navigate("/bookdemo");
              }}
              className=" px-3 py-1 sm:px-6 sm:py-2 rounded-full text-xs font-extrabold sm:text-base mr-1 sm:mr-4 sm:mb-2 md:mb-0 text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Book a Demo
            </button>
          </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-[90%] sm:w-fit">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 border-b border-slate-400">
              Select Appointment Date
            </h2>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
              className="border border-gray-400 rounded px-2 py-1 mb-2"
            />
            {selectedDate && (
              <p className="mt-4 mb-2 text-base font-semibold">
                Selected Date: {selectedDate.toDateString()}
              </p>
            )}
            <div className="flex justify-between">
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-2 border-gray-500 py-1 px-4 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
