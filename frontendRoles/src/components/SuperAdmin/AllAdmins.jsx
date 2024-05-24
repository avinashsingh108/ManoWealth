import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { toast } from "react-toastify";
import {  FaTrash } from "react-icons/fa";

const AllAdmins = () => {
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState([]);
  // async function fetchUserInformation(userIds) {
  //   const userInformation = [];

  //   for (const userObj of userIds) {
  //     try {
  //       const userId = userObj.user;

  //       const response = await axios.get(
  //         `https://manthanr.onrender.com/v1/get-user-info/${userId}`
  //       );
  //       const userData = {
  //         ...response.data,
  //         message: userObj.message
  //       };
  //       userInformation.push(userData);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   return userInformation;
  // }

  const getHeader = () => {
    const token = localStorage.getItem("superadminToken");
    if (token) {
      return "Bearer " + token;
    } else {
      return {};
    }
  };

  const getAllAdmins = () => {
    setLoading(true);
    const token = localStorage.getItem("superadminToken");
    axios
      .get("https://manthanr.onrender.com/v1/getAllAdmins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        // console.log(res.data)
      })
      .catch((Err) => {
        console.log(Err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllAdmins();
  }, []);

  // const getData = (selectedAdmin) => {
  //   console.log(selectedAdmin);
  //   axios.post('https://manthanr.onrender.com/v1/getAdminWiseData', { admin: selectedAdmin })
  //     .then(async (res) => {
  //       console.log('response',res.data);
  //       // const userIds = res.data.map(user => ({ user: user.userId, message: user.message }));
  //       const userInformation = await fetchUserInformation(res.data);
  //       console.log("User Information:", userInformation);
  //       setUserData(userInformation)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false); // Set loading to false regardless of success or failure
  //     });
  // }

  // useEffect(() =>{
  //   setLoading(true);
  //   getData(admin)},[admin])

  const handleDeleteAdmin = (id) => {
    const token = localStorage.getItem("superadminToken");
    axios
      .delete(`https://manthanr.onrender.com/v1/delete-admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data);
        getAllAdmins();
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  return (
    <div className="bg-gray-100 h-[90%]">
      {loading ? (
        <div className="w-full flex flex-col items-center justify-center mt-10 text-lg">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4299e1"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto bg-white px-6 py-10 overflow-y-auto h-full lg:h-[90%] shadow-md">
          <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 uppercase ">
            All Admins
          </h2>
          {userData.length === 0 ? (
            <p className="text-center text-gray-600">No data found.</p>
          ) : (
            <table className="mt-2 table-auto w-full text-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {userData.map((admin, index) => (
                  <tr key={admin._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{admin.username}</td>
                    <td className="border px-4 py-2">{admin.contactNumber}</td>
                    <td className="border px-4 py-2">{admin.email}</td>
                    <td className="border px-4 py-2">
                      <button
                      title="Delete Admin"
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                        onClick={() => handleDeleteAdmin(admin._id)}
                      >
                        <FaTrash/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AllAdmins;
