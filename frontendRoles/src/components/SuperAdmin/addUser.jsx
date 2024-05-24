import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";

const generateRandomPassword = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const passwordLength = 8;
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
};
const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    lastname: "",
    email: "",
    password: generateRandomPassword(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
  
    // Check if the new user's username or email already exists
    // const existingUsername = users.find(user => user.username === formData.username);
    const existingEmail = users.find(user => user.email === formData.email);
  
    // if (existingUsername) {
    //   alert("Username already exists. Please choose a different username.");
    //   return;
    // }
  
    if (existingEmail) {
      alert("Email already exists. Please use a different email address.");
      return;
    }
  
    // If the username and email are unique, add the new user
    setUsers([...users, formData]);
    setFormData({
      username: "",
      lastname: "",
      email: "",
      password: generateRandomPassword(),
    });
  };
  
  const handleUploadToDatabase = async () => {
    try {
      const usersData = users.map(user => ({
        username: user.username,
        lastname: user.lastname,
        email: user.email,
        password: user.password
      }));
     console.log(usersData)
  
      const response = await axios.post(
        "https://manthanr.onrender.com/v1/add-users",
        usersData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status !== 201) {
        throw new Error("Failed to upload users to database");
      }
      // console.log(response)
      toast.success("Users uploaded to database successfully");
      setUsers([]); // Clear the users array after uploading to database
    } catch (error) {
      console.error("Error uploading users to database:", error);
      toast.error('some error occured please check username or email')
    }
  };
  
  const handleEditUser = (index) => {
    const editedUser = users[index];
    setFormData({
      username: editedUser.username,
      lastname: editedUser.lastname,
      email: editedUser.email,
      password: editedUser.password,
    });
    handleDeleteUser(index);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  return (
    <div className="container mx-auto bg-gray-100 h-[90%]">
      <div className="w-11/12 xl:w-3/4 mx-auto bg-white rounded p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 uppercase ">
          Enter User Details
        </h2>
        <form onSubmit={handleAddUser} className="mx-auto">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base font-semibold "
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base font-semibold "
              htmlFor="lastname"
            >
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="">
            <label
              className="block text-gray-700 text-base font-semibold "
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-gray-600 text-sm" htmlFor="password">
              An automatically generated password will be sent to this email
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
            >
              Add User
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h2 className="text-base uppercase font-semibold mb-4 underline">
            Recently Added
          </h2>
          {users.length === 0 ? (
            <p>No recent additions</p>
          ) : (
            <div className="overflow-x-auto">

            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 font-semibold">Firstname</th>
                  <th className="px-4 py-2 font-semibold">Lastname</th>
                  <th className="px-4 py-2 font-semibold">Email</th>
                  <th className="px-4 py-2 font-semibold">Password</th>
                  <th className="px-4 py-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 text-center">
                      {user.username}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {user.lastname}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {user.email}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {user.password}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline md:mr-2"
                        onClick={() => handleEditUser(index)}
                      >
                        <FaEdit/>
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDeleteUser(index)}
                      >
                        <FaTrash/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleUploadToDatabase}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload to Database
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
