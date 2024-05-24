import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import { ThreeDots } from "react-loader-spinner";

const UserReport = ({ admin }) => {
  const [reports, setReports] = useState([]);
  const [userWithInfo, setUserWithInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  //console.log(admin);

  const getUsers = () => {
    const token = localStorage.getItem("adminToken");

    axios
      .get(
        `https://manthanr.onrender.com/v1/get-admin-reported-users/${admin.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        //console.log(res);
        setUserWithInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  // const markAsRead = (reportId) => {
  //   setReports((prevReports) =>
  //     prevReports.map((report) =>
  //       report.id === reportId ? { ...report, read: true } : report
  //     )
  //   );
  // };

  // const reportUser = (report) => {

  //         toast.success('User reported');
  //         // Send email using EmailJS when the user is reported
  //         sendEmail(report);

  // };

  // const sendEmail = (report) => {
  //   // Replace these values with your EmailJS service ID, template ID, and user ID
  //   const serviceId = 'service_0jzntyg';
  //   const templateId = 'template_dbu0gpy';
  //   const userId = '4n-EC2hBnJ4wZnL_F';

  //   const { email, message, score, username } = report;

  // const newObject = {
  //   email: email,
  //   message: message,
  //   score: score,
  //   username: username,
  // };

  //   const templateParams = {
  //     to_name:'PSYCH',
  //     from_name:'super admin',
  //     to_email: 'harshvchawla997@gmail.com',
  //     username: username,
  //     details:JSON.stringify(newObject),
  //     subject: 'User Reported',
  //     message: `The user ${username} has been reported.`,
  //   };

  //   emailjs.send(serviceId, templateId, templateParams, userId)
  //     .then((response) => {
  //       console.log('Email sent:', response);
  //     })
  //     .catch((error) => {
  //       console.error('Email error:', error);
  //     });
  // };

  // const markAsUnread = (reportId) => {
  //   setReports((prevReports) =>
  //     prevReports.map((report) =>
  //       report.id === reportId ? { ...report, read: false } : report
  //     )
  //   );
  // };

  return (
    <div className="p-4 overflow-y-auto h-[80%]">
      <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 uppercase ">
        Reported Users
      </h2>
      {loading ? (
        <div className=" w-full flex flex-col justify-center items-center text-lg">
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
        userWithInfo.map((report) => (
          <div
            key={report.id}
            className="bg-yellow-100 p-4 rounded-lg shadow mb-4"
          >
            <p className="text-base md:text-lg">
              <span className="font-semibold">Name:</span> {report.username}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Email:</span> {report.email}
            </p>
            <p className="text-base md:text-lg">
              <span className="font-semibold">Phone:</span>{" "}
              {report?.contactNumber}
            </p>
            <p className="text-base md:text-lg">
              <span className="font-semibold">Score:</span> {report.score}
            </p>
            <p className="text-base md:text-lg">
              <span className="font-semibold">Comments:</span> {report.message}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserReport;
