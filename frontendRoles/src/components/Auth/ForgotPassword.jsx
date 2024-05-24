import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import { FaArrowLeft, FaHome } from "react-icons/fa";
const ForgotPassword = () => {
  const [showOTPFields, setShowOTPFields] = useState(false);
  const [wrongOtp, setWrongOtp] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  };

  setInterval(() => {
    axios
      .delete("https://manthanr.onrender.com/v1/clear")
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 60000);

  const checkEmail = (values) => {
    setLoading(true); // Set loading to true initially

    if (!values.email) {
      setLoading(false); 
      return;
    }
    axios
      .post("https://manthanr.onrender.com/v1/check-email", {
        email: values.email,
      })
      .then((res) => {
        if (res.data === "user doesnt exist") {
          toast.error("user not found");
        } else if (res.data === "user found please send otp") {
          sendOtp(values);
          setShowOTPFields(true);
        }
      })
      .catch((err) => {
        console.log("catch block", err);
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the axios operation is completed (success or failure)
      });
  };

  const sendOtp = (values) => {
    // setLoading(true);
    axios
      .post("https://manthanr.onrender.com/v1/sendOtp", { email: values.email })
      .then((res) => {
        if (res.status === 200) {
          toast.success("OTP sent. Please enter it.");
        }
      })
      .catch((err) => {
        toast.error(err.response.status);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be 6 digits")
      .required("OTP is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    axios
      .post("https://manthanr.onrender.com/v1/reset-password", {
        otpBody: values.otp,
        email: values.email,
        password: values.newPassword,
      })
      .then((res) => {
        if (res.status === 200) {
          axios
            .delete("https://manthanr.onrender.com/v1/clear")
            .then((res) => {
              // console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          toast.success("Password changed successfully.");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setWrongOtp(true);
          toast.error("Wrong OTP. Please try again.");
          return;
        }
      });
    // setSubmitting(false);

    // setLoading(true);
  };

  return (
    <div className="w-full bg-blue-200 h-screen flex items-center">
      <div className="w-11/12 sm:w-8/12 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto p-6 bg-white rounded-lg shadow-md font-montserrat">
        <div className="flex justify-between mx-1 mb-6 border-b-2">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold uppercase">Change Password</h2>
          <div className="text-white rounded-lg my-auto bg-blue-500 hover:bg-blue-600 mb-1">
            <button
              className="py-1 px-2"
              onClick={() => {
                navigate("/");
              }}
            >
              <FaHome />
            </button>
          </div>
        </div>
        {wrongOtp && (
          <p className="text-red-500 mt-1">Wrong OTP. Please retry.</p>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, touched, handleBlur, values }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  onBlur={handleBlur}
                  className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                  disabled={showOTPFields}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              {
                <>
                  {loading && (
                    <MagnifyingGlass
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="magnifying-glass-loading"
                      wrapperStyle={{}}
                      wrapperClass="magnifying-glass-wrapper"
                      glassColor="#c0efff"
                      color="#e15b64"
                    />
                  )}
                  {!loading && !showOTPFields && (
                    <button
                      type="button"
                      onClick={() => {
                        // toast.success('checking email')
                        checkEmail(values);
                      }}
                      className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Send OTP
                    </button>
                  )}
                </>
              }

              {showOTPFields && (
                <>
                  <div className="mb-4">
                    <label htmlFor="otp" className="block text-gray-600">
                      OTP
                    </label>
                    <Field
                      type="text"
                      name="otp"
                      onBlur={handleBlur}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="otp"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="newPassword"
                      className="block text-gray-600"
                    >
                      New Password
                    </label>
                    <Field
                      type="password"
                      name="newPassword"
                      onBlur={handleBlur}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-gray-600"
                    >
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      onBlur={handleBlur}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                  {loading && (
                    <MagnifyingGlass
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="magnifying-glass-loading"
                      wrapperStyle={{}}
                      wrapperClass="magnifying-glass-wrapper"
                      glassColor="#c0efff"
                      color="#e15b64"
                    />
                  )}
                  {!loading && (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Submit
                    </button>
                  )}
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
