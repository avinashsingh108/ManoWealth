import React, { useEffect, useState } from "react";
import { BallTriangle, InfinitySpin } from "react-loader-spinner";
import axios from "axios";

const SOSNotifications = ({ admin }) => {
  const [loading, setLoading] = useState(false);
  // console.log(admin)
  const [notifications, setNotifications] = useState();

  // const getHeader = () => {
  //   const token = localStorage.getItem('adminToken');
  //   if (token) {
  //     return 'Bearer ' + token;
  //   } else {
  //     return {};
  //   }
  // };
  // console.log(admin);
  const getsos = () => {
    const token = localStorage.getItem("adminToken");
    // console.log(admin);
    axios
      .get(`https://manthanr.onrender.com/v1/get-all-sos/${admin.adminID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
       // console.log(res);
        setNotifications(res.data);
        // console.log(res)
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  //    const submitReport = async (selectedUserId, message, admin) => {
  //   const token = localStorage.getItem("adminToken");
  //   axios
  //     .post(
  //       "https://manthanr.onrender.com/v1/submit-report",
  //       {
  //         admin: admin.email,
  //         user: selectedUserId,
  //         message: message,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       // console.log(res);
  //       if (res.status === 200) {
  //         toast.success("user reported");
  //         const username = users.filter(
  //           (user) => user.email === selectedUserId
  //         );
  //         console.log(username)
  //         sendEmail(username[0].username, message, username[0].email,username[0].contactNumber);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("some error occures");
  //     });
  //   // console.log(fetchedReportedUsers);
  // };

  useEffect(() => {
    getsos();
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAsUnread = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: false }
          : notification
      )
    );
  };

  return (
    <div className="p-4 overflow-y-auto h-[80%]">
      <h2 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 uppercase ">
        SOS Notifications
      </h2>
      {notifications?.map((notification) => (
        <div
          key={notification.id}
          className={`${
            notification.read ? "bg-gray-200" : "bg-yellow-100"
          } p-4 rounded-lg shadow mb-4`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-base md:text-lg">
                <span className="font-semibold">Name: </span>
                {notification.userName}
              </p>
              <p className="text-base md:text-lg">
                <span className="font-semibold">Email: </span>
                {notification.email}
              </p>
              <p className="text-base md:text-lg">
                <span className="font-semibold">Phone: </span>
                {notification.phoneNumber}
              </p>
            </div>
          </div>
          <p className="text-base md:text-lg">
            <span className="font-semibold">Message: </span>
            {notification.message}
          </p>
          <button
            onClick={
              notification.read
                ? () => markAsUnread(notification.id)
                : () => markAsRead(notification.id)
            }
            className={`px-3 py-1 rounded mt-2 ${
              notification.read ? "bg-yellow-500" : "bg-blue-500"
            } text-white`}
          >
            {notification.read ? "Mark as Unread" : "Mark as Read"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SOSNotifications;
