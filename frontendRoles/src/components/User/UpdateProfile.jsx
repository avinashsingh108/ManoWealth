import React, { useContext,useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import SubmitOTP from "../Auth/SubmitOtp";
import { userContext } from "../../context";
import Header from "../Home/Header";
import { toast } from "react-toastify";
import { FaCameraRetro } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import EditProfileForm from "./edit_profile";

const ProfileUpdatePage = () => {

  // console.log('prevpath' , previousRoute);
  const { user, setUser } = useContext(userContext);
  const [formValues, setFormvalues] = useState(null);
  const [otp, setOtp] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [adminAss ,setAdminAss] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    contactNumber: "",
    dateOfBirth: "",
    degreeType: "",
    department: "",
    semester: "",
    rollNumber: "",
    hostelName: "",
    hostelRoomNumber: "",
    relationshipStatus: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    gender: Yup.string().required("Gender is required"),
    contactNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be only digits and exactly 10 digits")
      .required("Contact Number is required"),
    dateOfBirth: Yup.string().required("Date of Birth is required"),
    degreeType: Yup.string().required("Degree Type is required"),
    department: Yup.string().required("Department is required"),
    semester: Yup.string().required("Semester is required"),
    rollNumber: Yup.string().required("Roll Number is required"),
    hostelName: Yup.string().required("Hostel Name is required"),
    hostelRoomNumber: Yup.string().required("Hostel Room Number is required"),
    relationshipStatus: Yup.string().required(
      "Relationship Status is required"
    ),
  });

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const getAdmin = () =>{
    const token = localStorage.getItem('token')
    axios.get(`https://manthanr.onrender.com/v1/assigned-admin/${user.userID}` ,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    } ).then((res)=>{
    //  console.log(res);
      setAdminAss(res.data)
      setUser({...user,assigned_admin:res.data})
    }).catch((err)=>{
      console.log(err);
    })
  }

  // console.log(user);
  // const onSubmit = async (values) => {
  //   console.log(user);
  //   const token = localStorage.getItem('token');
  //   try {
  //     setIsUpdating(true);
  //     const res = await axios.post(
  //       "https://manthanr.onrender.com/v1/update-profile",
  //       {
  //         user: user.userID,
  //         firstname: values.firstName,
  //         lastname: values.lastName,
  //         courseAndYear: values.courseAndYear,
  //         rollNumber: values.rollNumber,
  //         contactNumber: values.contactNumber,
  //         hostelName: values.hostelName,
  //         dateOfBirth: values.dateOfBirth,
  //         relationshipStatus: values.relationshipStatus,
  //         degree: values.degreeType,
  //         dept: values.department,
  //         semester: values.semester,
  //       }, {
  //          headers: {
  //         Authorization:` Bearer ${token}`}
  //       }
  //     );
  //     // console.log(res);
  //     // console.log(res);
  //     if (res.data.message === "Profile created successfully") {
  //       toast.success("profile updated");
  //       setIsUpdating(false);
  //       setUser({
  //         ...user,
  //         username: values.firstName,
  //         assigned_admin: res.data.admintoupdate.username,
  //       });
  //       navigate('/usersection')
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setIsUpdating(false); // Reset loading state even if update fails
  //   }
  // };

  const onSubmit = async (values) => {
    const token = localStorage.getItem("token");
    try {
      setIsUpdating(true);
      const idOfUser = user.userID; // Ensure that user.userID is defined and correct
    
      const formData = new FormData();
      formData.append("user", user.userID);
      formData.append("firstname", values.firstName);
      formData.append("lastname", values.lastName);
      formData.append("courseAndYear", values.courseAndYear);
      formData.append("rollNumber", values.rollNumber);
      formData.append("contactNumber", values.contactNumber);
      formData.append("hostelName", values.hostelName);
      formData.append("dateOfBirth", values.dateOfBirth);
      formData.append("relationshipStatus", values.relationshipStatus);
      formData.append("degree", values.degreeType);
      formData.append("dept", values.department);
      formData.append("semester", values.semester);
      formData.append("room", values.hostelRoomNumber);
      if (image) {
        formData.append("image", image);
      }
  
      const res = await axios.post(
        "https://manthanr.onrender.com/v1/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Ensure correct content type
          },
        }
      );
  
      //console.log(res);
      if (res.data.message === "Profile created successfully") {
        toast.success("profile updated");
        setIsUpdating(false);
       // console.log(res.data.admintoupdate._id);
        // Ensure user state update is correct and complete
        setUser({
          ...user,
          username: values.username, // Update only necessary fields
          email: values.email,
          assigned_admin: res.data.admintoupdate._id,
        });
       // console.log("hi");
        // Redirect or perform other actions if needed
      }
    } catch (err) {
      console.log(err);
      setIsUpdating(false);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData);
    }
  
  // getUserProfile();
  
  }, []);
  
  return (
    <>
      <Header />

        <div className="min-h-screen flex justify-center items-center font-montserrat pt-20 bg-blue-200">
          <div className="flex bg-white justify-center items-center w-11/12 md:w-3/4 lg:w-10/12 xl:w-3/5 shadow-xl rounded-xl">
            <div className="flex-1 bg-white py-4 px-6 rounded-xl w-full sm:w-96">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 uppercase">
                Update Profile
              </h2>
              {otp ? (
                <SubmitOTP values={formValues} user={user} setUser={setUser} />
              ) : (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ values, errors, touched, isValid }) => (
                    <Form>
                      <div className="mb-4">
                        <div className="flex mb-2">
                          <div className="w-1/2 mr-2">
                            <Field
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                              className={`w-full px-2.5 py-1.5 border text-sm sm:text-base rounded-md focus:outline-none ${
                                errors.firstName && touched.firstName
                                  ? "border-red-500"
                                  : " focus:border-black"
                              }`}
                            />
                            <ErrorMessage
                              name="firstName"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="w-1/2 mx-2">
                            <Field
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                              className={`w-full px-2.5 py-1.5 border text-sm sm:text-base rounded-md focus:outline-none ${
                                errors.lastName && touched.lastName
                                  ? "border-red-500"
                                  : " focus:border-black"
                              }`}
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <Field
                          as="select"
                          name="gender"
                          className={`w-full px-2.5 py-1.5 text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none ${
                            errors.gender && touched.gender
                              ? "border-red-500"
                              : " focus:border-black"
                          }`}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="mb-4">
                        <Field
                          type="tel"
                          name="contactNumber"
                          placeholder="Contact Number"
                          className={`w-full px-2.5 py-1.5 text-sm sm:text-base border rounded-md focus:outline-none ${
                            errors.contactNumber && touched.contactNumber
                              ? "border-red-500"
                              : " focus:border-black"
                          }`}
                        />
                        <ErrorMessage
                          name="contactNumber"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="mb-4">
                        <Field
                          type="date"
                          name="dateOfBirth"
                          placeholder="Date of Birth"
                          className={`w-full px-2.5 py-1.5 text-sm sm:text-base border rounded-md focus:outline-none ${
                            errors.dateOfBirth && touched.dateOfBirth
                              ? "border-red-500"
                              : " focus:border-black"
                          }`}
                        />
                        <ErrorMessage
                          name="dateOfBirth"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="w-1/3 mr-2">
                          <Field
                            as="select"
                            name="degreeType"
                            className={`w-full px-2.5 py-1.5 text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none ${
                              errors.degreeType && touched.degreeType
                                ? "border-red-500"
                                : " focus:border-black"
                            }`}
                          >
                            <option value="">Select Degree Type</option>
                            <option value="undergrad">Undergraduate</option>
                            <option value="postgrad">Postgraduate</option>
                            <option value="PhD">PhD</option>
                          </Field>
                          <ErrorMessage
                            name="degreeType"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="w-1/3 mx-1">
                          <Field
                            as="select"
                            name="department"
                            className={`w-full px-2.5 py-1.5 text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none ${
                              errors.department && touched.department
                                ? "border-red-500"
                                : " focus:border-black"
                            }`}
                          >
                            <option value="">Select Department</option>
                            <option value="cse">CSE</option>
                            <option value="me">ME</option>
                            <option value="ee">EE</option>
                            <option value="mee">MEE</option>
                            <option value="hss">HSS</option>
                            <option value="math">MATH</option>
                            <option value="phy">PHY</option>
                            <option value="chem">CHEM</option>
                          </Field>
                          <ErrorMessage
                            name="department"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="w-1/3 ml-2">
                          <Field
                            as="select"
                            name="semester"
                            className={`w-full px-2.5 py-1.5 text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none ${
                              errors.semester && touched.semester
                                ? "border-red-500"
                                : " focus:border-black"
                            }`}
                          >
                            <option value="">Select Semester</option>
                            <option value="1">Sem 1</option>
                            <option value="2">Sem 2</option>
                            <option value="3">Sem 3</option>
                            <option value="4">Sem 4</option>
                            <option value="5">Sem 5</option>
                            <option value="6">Sem 6</option>
                            <option value="7">Sem 7</option>
                            <option value="8">Sem 8</option>
                            <option value="9">Sem 9</option>
                            <option value="10">Sem 10</option>
                          </Field>
                          <ErrorMessage
                            name="semester"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <Field
                          type="text"
                          name="rollNumber"
                          placeholder="Roll Number"
                          className={`w-full px-2.5 py-1.5 text-sm sm:text-base border rounded-md focus:outline-none ${
                            errors.rollNumber && touched.rollNumber
                              ? "border-red-500"
                              : " focus:border-black"
                          }`}
                        />
                        <ErrorMessage
                          name="rollNumber"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="mb-4 flex items-center">
                        <div className="w-1/2 mr-2">
                          <Field
                            as="select"
                            name="hostelName"
                            className={`w-full px-2.5 py-1.5 text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none ${
                              errors.hostelName && touched.hostelName
                                ? "border-red-500"
                                : " focus:border-black"
                            }`}
                          >
                            <option value="">Select Hostel</option>
                            <option value="APJ Kalam Hostel">APJ Kalam</option>
                            <option value="Asima Hostel">Asima</option>
                            <option value="AryaBhatt Hostel">AryaBhatt</option>
                            <option value="CV Raman Hostel">CV Raman</option>
                            {/* Add more hostels as needed */}
                          </Field>
                          <ErrorMessage
                            name="hostelName"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="w-1/2 ml-2">
                          <Field
                            type="text"
                            name="hostelRoomNumber"
                            placeholder="Room Number"
                            className={`w-full px-2.5 py-1.5 text-sm sm:text-base border rounded-md focus:outline-none ${
                              errors.hostelRoomNumber &&
                              touched.hostelRoomNumber
                                ? "border-red-500"
                                : " focus:border-black"
                            }`}
                          />
                          <ErrorMessage
                            name="hostelRoomNumber"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <Field
                          as="select"
                          name="relationshipStatus"
                          className={`w-full px-2.5 py-1.5 text-xs sm:text-sm xl:text-base
                                border rounded-md focus:outline-none ${
                                  errors.relationshipStatus &&
                                  touched.relationshipStatus
                                    ? "border-red-500"
                                    : " focus:border-black"
                                }`}
                        >
                          <option className="" value="">
                            Select Relationship Status
                          </option>
                          <option className="" value="Single">
                            Single
                          </option>
                          <option className="" value="Happily Single">
                            Happily Single
                          </option>
                          <option className="" value="In a Relationship">
                            In a Relationship
                          </option>
                          <option className="" value="It's Complicated">
                            It's Complicated
                          </option>
                          <option className="" value="Friendzoned">
                            Friendzoned
                          </option>
                          <option className="" value="Building My Empire">
                            Building My Empire
                          </option>
                          <option className="" value="Focused on Self-Growth">
                            Focused on Self-Growth
                          </option>
                        </Field>
                        <ErrorMessage
                          name="relationshipStatus"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div className="mb-4 sm:w-1/2 md:w-1/3 ml-2 flex items-center">
                        <p className="w-fit text-base sm:text-lg lg:text-xl uppercase">
                          Upload Image
                        </p>
                        <label className="ml-4 relative overflow-hidden flex items-center justify-center h-16 w-20 md:h-20 md:w-28 bg-gray-200 rounded-lg cursor-pointer">
                          <input
                            type="file"
                            className="absolute top-0 left-0 h-full opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={uploadImage}
                          />

                          {image ? (
                            <img
                              src={image}
                              alt="Uploaded"
                              className="border-2 rounded-sm w-full h-full content-stretch"
                            />
                          ) : (
                            <BsPlusLg className="h-6 w-6 md:h-8 md:w-8" />
                          )}
                        </label>
                      </div>

                      <Link
                        to="/usersection"
                        className={`w-full text-center bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105 ${
                          !isValid || isUpdating
                            ? "pointer-events-none opacity-50"
                            : ""
                        }`}
                        onClick={() => {
                          // console.log(values);
                          onSubmit(values);
                        }}
                        style={{ display: "block", margin: "auto" }}
                      >
                        {isUpdating ? "Updating..." : "Update Profile"}
                      </Link>
                      {/* <Link
                        to="/update-password"
                        className="block mt-2 text-blue-500 w-fit mx-auto hover:underline"
                      >
                        Update Password
                      </Link> */}
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>

    </>
  );
};

export default ProfileUpdatePage;
