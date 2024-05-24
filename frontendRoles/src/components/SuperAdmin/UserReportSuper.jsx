import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import { ThreeDots } from "react-loader-spinner";
import ReportMessage from "../Admin/ReportMessage";
import CommentsComponent from "./Summary";
// import { toast } from "react-toastify";

const UserReport = () => {
  const [showSummary, setShowSummary] = useState(false);
  const [userWithInfo, setUserWithInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportedUser, setReportedUser] = useState(null);
  const [filterByPsy, setFilterByPsy] = useState(false);
  const [comments, setComments] = useState();
  const [sumID, setSumId] = useState("");

  const getUsers = () => {
    const token = localStorage.getItem("superadminToken");
    setLoading(true);
    axios
      .get("https://manthanr.onrender.com/v1/get-reported-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserWithInfo(res.data);
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getUserInfo = (id) => {
    const token = localStorage.getItem("superadminToken");
    axios
      .get(`https://manthanr.onrender.com/v1/get-user-info/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setReportedUser(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reportToPsych = (user) => {
    const token = localStorage.getItem("superadminToken");
    axios
      .post(
        "https://manthanr.onrender.com/v1/report-to-psych",
        {
          userID: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const reportUser = (report, comment) => {
    toast.success("User reported");
    sendEmail(report, comment);
    reportToPsych(report);
  };

  const sendEmail = (report, comment) => {
    const serviceId = "service_0jzntyg";
    const templateId = "template_dbu0gpy";
    const userId = "4n-EC2hBnJ4wZnL_F";
    console.log(report);
    const { email, message, score, username } = report;

    const templateParams = {
      to_name: "PSYCH",
      from_name: "super admin",
      to_email: "abhisektiwari2014@gmail.com",
      username: username,
      email: email,
      score: score,
      contact: "555",
      subject: "User Reported",
      message: comment,
    };

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        if (response.status === 200) {
          toast.success("reported user to super admin");
        }
      })
      .catch((error) => {
        console.error("Email error:", error);
      });
  };

  const uploadSummary = () => {
    const sum = JSON.stringify(comments);

    const token = localStorage.getItem("superadminToken");
    axios
      .post(
        "https://manthanr.onrender.com/v1/upload-summary",
        {
          userID: sumID,
          summary: sum,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Uploaded summary");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReportUser = (user) => {
    getUserInfo(user.user);
    // setReportedUser(user);
    // console.log(user);
    setShowReportModal(true);
  };

  return (
    <div className="p-2 sm:p-4 overflow-y-auto h-[80%] sm:mx-4">
      {showSummary && (
        <CommentsComponent
          comments={comments}
          setComments={setComments}
          savee={uploadSummary}
          sumID={sumID}
          onClose={() => setShowSummary(false)}
        />
      )}
      <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200">
        <h2 className="text-base sm:text-xl md:text-2xl font-semibold uppercase">
          User Reports
        </h2>
        <div className="flex items-center space-x-2">
          <label className="text-xs sm:text-sm font-semibold">
            Reported Users:
          </label>
          <input
            type="checkbox"
            checked={filterByPsy}
            onChange={(e) => setFilterByPsy(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-500"
          />
        </div>
      </div>
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
        userWithInfo.reverse().map(
          (report) =>
            // Check if filterByPsy is true and report is psy report
            (!filterByPsy || report.reported_psych) && (
              <div
                key={report.id}
                className={`${
                  report.read ? "bg-gray-200" : "bg-yellow-100"
                } p-4 rounded-lg shadow mb-4`}
              >
                {/* Your report content */}
                <p className="text-base md:text-lg">
                  <span className="font-semibold">User Name:</span>{" "}
                  {report.username}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">User Email:</span>{" "}
                  {report.email}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Contact Number:</span>{" "}
                  {report.contactNumber}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Assigned Admin:</span>
                  {report?.assigned_admin}
                  {/*under this admin*/}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">User Score:</span>{" "}
                  {report?.score === undefined
                    ? "survey not submitted"
                    : report?.score}
                </p>
                <p className="text-base md:text-lg">
                  <span className="font-semibold">Admin Comments:</span>{" "}
                  {report.message}
                </p>
                <div className="mt-2 text-sm sm:text-base md:text-lg flex items-center ">
                  <button
                    className={`mr-2 px-3 py-1 rounded ${
                      report.reported_psych
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                    onClick={() => {
                      handleReportUser(report);
                    }}
                    disabled={report.reported_psych}
                  >
                    {report.reported_psych
                      ? "Already Reported"
                      : "Report to Psychiatrist"}
                  </button>
                  <button
                    onClick={() => {
                      setSumId(report?.user);
                      setShowSummary(true);
                    }}
                    className={`mr-2 px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white`}
                  >
                    Summary
                  </button>
                </div>
              </div>
            )
        )
      )}
      {showReportModal && (
        <ReportMessage
          onClose={() => setShowReportModal(false)}
          onSubmit={(comment) => {
            reportUser(reportedUser, comment);
            setShowReportModal(false);
          }}
        />
      )}
    </div>
  );
};

export default UserReport;
