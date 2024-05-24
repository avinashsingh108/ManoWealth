import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext, authContext, loadingContext } from "../../context";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../Home/Header";
import {Link} from "react-router-dom";
import useLocalStorage from "../../use-persist-hook";

import * as Yup from "yup";

const LoginPage = () => {
  const { user,setUser } = useContext(userContext);
  const { setAuth } = useContext(authContext);
  const [loading,setLoading] =useState(false);
  const [storedValue, setStoredValue] = useLocalStorage();
  const [showPassword, setShowPassword] = useState(false);
  const [assigned_admin,setAssigned_admin] = useState({});
  const [showForgotPasswordFields, setShowForgotPasswordFields] =
    useState(false); 
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    otp: "", 
    newPassword: "", 
    confirmPassword: "", 
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const onSubmit = (values) => {
    
    if (showForgotPasswordFields) {
      handleForgotPassword(values);
    } else {
      handleLogin(values);
    }
  };
  
  const handleLogin = (values) => {
    setLoading(true);
    // console.log(loading);
    axios
    .post("https://manthanr.onrender.com/v1/login", {
        email: values.email.toLowerCase(),
        password: values.password,
      })
      .then((res) => {
         if(res.data==='admins and super admins cant login'){
          toast.error('Sorry admins arent allowed to login');
          return;
         }
          
        //  setUser({
        //   ...user,
        //   assigned_admin_id:res.data.user.assigned_admin
        //  })
 
         if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          toast.success("Login Successful")
         // console.log(res.data.token);
          
          setUser({
            username: res.data.user.username,
            userID: res.data.user._id,
            email:values.email,
            assigned_admin:res.data.user.assigned_admin
          });
          // console.log(user);
          const object ={
            username: res.data.user.username,
            userID: res.data.user._id,
            email:values.email,
            assigned_admin:res.data.user.assigned_admin
          };
          const storeObject = JSON.stringify(object);
          localStorage.setItem('user' , storeObject);


          // navigate("/updateprofile");
          setAuth(true);

          if (res.data.user.is_profile_complete) {
            if (res.data.user.has_accepted_tnc) {
              // navigate("/updateprofile");
              navigate("/usersection");
              // console.log(user);
            } else {
              navigate("/disclaimer");
            }
          } else {
            navigate("/updateprofile");
          }
          // console.log(res.data.user._id);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Wrong email or password');
      }).finally(()=>{
        setLoading(false);
      })
  };

  const handleForgotPassword = (values) => {
    axios
      .post("https://manthanr.onrender.com/v1/sendOtp", { email: values.email })
      .then((res) => {
        if (res === 200) {

          toast.success("OTP sent");
      
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/chatbot");
    }
  }, []);

  return (
    

    <div
      className="min-h-screen flex justify-center items-center bg-blue-200 font-montserrat"
    >
      <Header />
      <div className="flex flex-col lg:flex-row bg-white justify-center mt-10 items-center w-4/5 sm:w-3/5 lg:w-8/12 xl:w-3/5 shadow-xl rounded-xl">
        {/* Left section  */}
        <div className="flex-1">
          <img
            src="./img/signupimg.jpg"
            alt="Background"
            className="w-full h-full object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
          />
        </div>
        {/* Right section  */}
        <div className="flex-1 bg-white py-4 px-6 rounded-b-xl lg:rounded-s-xl w-full sm:w-96">
          <h2 className="text-2xl font-bold mb-2 uppercase text-center">
            Student Login
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched, values }) => (
              <Form>
                <div className="mb-4">
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
                <div className="mb-4 relative">
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
                    onClick={togglePasswordVisibility}
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
                <div className="mb-2">
                  <p className="text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                      Signup
                    </Link>
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={(values) => {
                      navigate("/forgot-password");
                    }}
                    className="underline mt-1 text-xs sm:text-base"
                  >
                    Forgot Password
                  </button>

                  <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white mt-1 text-xs sm:text-base">
             {loading?('loading...'):("Login")}
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

export default LoginPage;
