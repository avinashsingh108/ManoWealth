import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddAdmin = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    degree: "",
    dept: "",
    semester: "",
    password: "",
  };


  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    phone: Yup.string().min(10).max(10).required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    degree: Yup.string().required("Degree Type is required"),
    dept: Yup.string().required("dept is required"),
    semester: Yup.string().required("Year of Course is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    const password = generateRandomPassword();
    const formData = {
      ...values,
      password: password,
    };
   // console.log("Generated Password:", password);
    const token = localStorage.getItem("superadminToken");
    // console.log(formData);

    axios
      .post("https://manthanr.onrender.com/v1/create-admin", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // Send formData to backend

    resetForm();
  };

  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&_+";

    let password = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }

    return password;
  };

  return (
    <div className="w-full bg-gray-100 overflow-y-auto h-[90%]">
      <div className="sm:w-3/4 md:w-11/12 lg:w-3/4 mx-auto bg-white rounded p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 uppercase ">
          Add Admin
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="flex justify-between w-full">
                <div className="mb-4 mr-2 w-1/2">
                  <label
                    htmlFor="firstname"
                    className="block font-semibold text-gray-700"
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="mt-1 p-2 shadow block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4 w-1/2 ml-2">
                  <label
                    htmlFor="lastname"
                    className="block font-semibold text-gray-700"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="mt-1 p-2 shadow block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block font-semibold text-gray-700"
                >
                  Phone Number
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  className="mt-1 p-2 shadow block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-semibold text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 shadow block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="degree"
                  className="block font-semibold text-gray-700 "
                >
                  Degree Type
                </label>
                <Field
                  as="select"
                  id="degree"
                  name="degree"
                  className="mt-1 p-2 shadow text-xs sm:text-sm xl:text-base block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Degree Type</option>
                  <option value="postgrad">PG</option>
                  <option value="undergrad">UG</option>
                  <option value="PhD">PHD</option>
                </Field>
                <ErrorMessage
                  name="degree"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dept"
                  className="block font-semibold text-gray-700"
                >
                  Department
                </label>
                <Field
                  as="select"
                  id="dept"
                  name="dept"
                  className="mt-1 p-2 shadow text-xs sm:text-sm xl:text-base block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Dept</option>
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
                  name="dept"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="semester"
                  className="block font-semibold text-gray-700"
                >
                  Semester
                </label>
                <Field
                  as="select"
                  id="semester"
                  name="semester"
                  className="mt-1 p-2 shadow text-xs sm:text-sm xl:text-base block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Semester</option>
                  {[...Array(10)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="semester"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 cursor-pointer"
                disabled={!isValid || isSubmitting}
              >
                Add Admin
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddAdmin;
