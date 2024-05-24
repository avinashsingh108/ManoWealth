import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
const SubmitOTP = ({ values ,setUser}) => {
  const navigate = useNavigate();
  const { username, email, password } = values;
  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string().required("OTP is required"),
  });
   
  const clearDb = () =>{
    axios.delete('https://manthanr.onrender.com/v1/clear').then((res)=>{
    }).catch((err) => {
      console.log(err);
    })
  }

  const onSubmitOTP = (values) => {
    axios
      .post("https://manthanr.onrender.com/v1/signup", {
        otpBody: values.otp,
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        toast.success('Signed up successfully');
        setUser(email);
        navigate('/Chatbot')

      })
      .catch((err) => {
        console.log(err);
      });
   clearDb();
  };

  const handleSubmit = (values, { setSubmitting }) => {
    onSubmitOTP(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <Field
              type="text"
              name="otp"
              placeholder="Enter OTP"
              className="w-full px-2.5 py-1.5 border rounded-md focus:outline-none"
            />
            <ErrorMessage
              name="otp"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {isSubmitting ? "Submitting..." : "Submit OTP"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SubmitOTP;
