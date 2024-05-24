import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileUpdatePage from "./UpdateProfile";

const ViewProfile = ({ onClose ,loading ,getUser,data }) => {
 // console.log(data);
  
  const navigate = useNavigate();
  
  // const data = {
  //   name: "John Doe",
  //   gender: "Male",
  //   contactNumber: "+1234567890",
  //   dateOfBirth: "1990-01-01",
  //   degreeType: "Bachelor",
  //   department: "Computer Science",
  //   semester: "5",
  //   rollNumber: "CS12345",
  //   hostelName: "ABC Hostel",
  //   hostelRoomNumber: "101",
  //   relationshipStatus: "Single",
  // };
  useEffect(()=>{
    getUser()
  },[])
  return (
    <div className="fixed inset-0 flex items-center justify-center font-montserrat bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white w-[90%] sm:w-96 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold uppercase underline">
            Your Profile
          </h2>
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
     {
      loading ? ('...loading'):(   <div>
        <p>
          <span className="font-semibold">Name:</span> {data?.username}
        </p>
        {/* <p>
          <span className="font-semibold">Gender:</span> {data?.gender}
        </p> */}
        {/* <p>
          <span className="font-semibold">Contact Number:</span>{" "}
          {data?.contactNumber}
        </p> */}
        <p>
          <span className="font-semibold">Email:</span>{" "}
          {data?.email}
        </p>
        <p>
          <span className="font-semibold">Degree Type:</span>{" "}
          {data?.degree ? data.degree.toUpperCase() : 'N/A'}
        </p>
        <p>
          <span className="font-semibold">Department:</span>{" "}
          {data?.dept ? data.dept.toUpperCase() : 'N/A'}
        </p>
        <p>
          <span className="font-semibold">Semester:</span>{" "}
          {data?.semester}
        </p>
        <p>
          <span className="font-semibold">Phone Number:</span>{" "}
          {data?.contactNumber}
        </p>
        {/* <p>
          <span className="font-semibold">Hostel Name:</span>{" "}
          {data?.hostelName}
        </p>
        <p>
          <span className="font-semibold">Hostel Room Number:</span>{" "}
          {data?.hostelRoomNumber}
        </p>
        <p>
          <span className="font-semibold">Relationship Status:</span>{" "}
          {data?.relationshipStatus}
        </p> */}
      </div>)
     }
        <div>
          <button onClick={() => {navigate("/edit-profile" ,{ state: { from: "/usersection" } })}} className="bg-blue-500 text-white rounded-lg px-4 py-1 mt-2 w-full">
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
