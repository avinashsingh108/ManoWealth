import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Header";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsPlusLg } from "react-icons/bs";
import * as Yup from "yup";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } 
  };

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
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
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
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

  const onSubmit = (values) => {
    toast.success("Signup successful. Please log in now.");
    setLoading(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

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

  return (
    <div className="min-h-screen h-full mt-20 pb-10 flex justify-center items-center bg-blue-200 font-montserrat">
      <Header />
      <div className="flex flex-col lg:flex-row bg-white justify-center mt-10 items-center w-4/5 sm:w-3/5 lg:w-8/12 xl:w-3/5 shadow-xl rounded-xl">
        <div className="flex-1 bg-white my-2 mx-6 rounded-b-xl lg:rounded-s-xl w-full p-4 sm:p-0 sm:w-96 border-b">
          <h2 className="text-2xl font-bold mt-2 mb-8 uppercase text-center">
            Student Signup
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, values, isValid }) => (
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
                <div className="mb-4 flex">
                  <div className="w-1/2 mr-2">
                    <Field
                      as="select"
                      name="gender"
                      className={`w-full h-10 px-2.5 py-1.5 text-xs sm:text-sm xl:text-base border rounded-md focus:outline-none ${
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
                  <div className="w-1/2 mx-2">
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
                </div>
                <div className="mb-4 flex">
                  <div className="w-1/2 mr-2">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={`w-full px-2.5 py-1.5 border rounded-md focus:outline-none ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : " focus:border-black"
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="w-1/2 mx-2">
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
                        errors.hostelRoomNumber && touched.hostelRoomNumber
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
                <div className="mb-3 relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={`w-full px-2.5 py-1.5 border rounded-md focus:outline-none ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : " focus:border-black"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                  >
                    <img
                      src={showPassword ? "./img/open.png" : "./img/close.png"}
                      alt="Toggle Password Visibility"
                      className="h-6 w-6"
                    />
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
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
                <div className="mb-2">
                  <p className="text-center">
                    Already a member?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                      Log In
                    </Link>
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    {loading ? "Loading..." : "Signup"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
