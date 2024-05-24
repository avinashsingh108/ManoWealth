import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import axios from "axios";
import * as XLSX from "xlsx";
import ReportMessage from "../Admin/ReportMessage";
import { adminContext, userContext } from "../../context";
import jsPDF from "jspdf";
import { ThreeDots } from "react-loader-spinner";
import "jspdf-autotable";
import emailjs from "emailjs-com";
import "./table.css";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

const UserDataSuper = ({ showSOSButton = true, showSummaryColumn = false }) => {
  // const {user} = useContext(userContext);
  // const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [selectedSort, setSelectedSort] = useState("none");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [message, setMessage] = useState("");
  // const [email,setEmail]= useState("");
  const [loading, setLoading] = useState(false);
  // const [fetchedReportedUsers, setFetchedReportedUsers] = useState();
  const { admin } = useContext(adminContext);

  // const [selectUser, setSelectUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);

  const getHeader = () => {
    const token = localStorage.getItem("superadminToken");
    if (token) {
      return "Bearer " + token;
    } else {
      return {};
    }
  };

  const getAllQuestions = async () => {
    const token = localStorage.getItem("superadminToken");
    axios
      .get("https://manthanr.onrender.com/v1/getAllData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setQuestions(res.data);
        // console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("superadminToken");
      setLoading(true);
      const response = await axios.get(
        "https://manthanr.onrender.com/v1/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      console.log('users ', users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
    getAllQuestions();
  }, []);

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
        if (res.status === 200) {
          toast.success("reported");
          const username = users.filter((user1) => user1._id === user._id);
           console.log(res.data);
      
          sendEmail(username[0],res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMessage =()=>{

  }


  const sendEmail = (report,message) => {
    const serviceId = "service_0jzntyg";
    const templateId = "template_dbu0gpy";
    const userId = "4n-EC2hBnJ4wZnL_F";

    const { email, contactNumber, score, username } = report;
  //  console.log( email, contactNumber, score, username ,'empyuty')

    const templateParams = {
      to_name: "PSYCH",
      from_name: "super admin",
      to_email: "abhisektiwari2014@gmail.com",
      username: username,
      contact: contactNumber,
      email: email,
      score: score,
      subject: "User Reported",
      message:message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        if (response.status === 200) {
          console.log('hi')
          toast.success("reported user to super admin");
        }
      })
      .catch((error) => {
        console.error("Email error:", error);
      });
  };

  //  useEffect(() => {
  //   getReportedUsers();
  //  })
  const promoteToAdmin = async (id) => {
    try {
      const token = localStorage.getItem("superadminToken");
      const res = await axios.post(
        "https://manthanr.onrender.com/v1/promote-to-admin",
        { user: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("User promoted to admin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const promoteToAdmin = async (id) => {
  //   toast.success("User promoted to admin");
  //   promote
  // };

  const handleReportUser = (id) => {
    setSelectedUserId(id);

    setShowReportModal(true);
  };

  const handleReportSubmit = (comment) => {
   // console.log(comment);
    // console.log("Reported user with id:", selectedUserId, "Comment:", comment);
    reportToPsych(comment);
    setShowReportModal(false);
  };

  function convertISOToDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }
  const categorizeUser = (score) => {
    if (score === undefined) return "NA";
    else if (score >= 175) return "High";
    else if (score >= 127 && score < 175) return "Moderate";
    else if (score < 127) return "Low";
  };
  const sortedUsers = users.sort((a, b) => {
    if (selectedSort === "none") {
      return 0;
    } else if (selectedSort === "score_highest") {
      return b.score - a.score;
    } else {
      return a.score - b.score;
    }
  });

  const filteredUsers =
    selectedFilter === "All"
      ? sortedUsers
      : sortedUsers.filter(
          (user) => categorizeUser(user.score) === selectedFilter
        );

  const filteredByMonth =
    selectedMonth === "All"
      ? filteredUsers
      : filteredUsers.filter((user) => {
          const userDateString = user.createdAt;
          const userDate = new Date(userDateString);
          return userDate.getMonth() + 1 === parseInt(selectedMonth, 10);
        });

  const filteredByYear =
    selectedYear === "All"
      ? filteredByMonth
      : filteredByMonth.filter((user) => {
          const userYear = user.createdAt.substring(0, 4);
          // console.log("User Year:", userYear);
          // console.log("Selected Year:", selectedYear);
          return userYear === selectedYear;
        });

  const exportToPDF = (users) => {
    const doc = new jsPDF();
    // console.log(doc);
    // const headers = [['Username', 'Email', 'Phone Number', 'Score', 'Date', 'Category']];

    const data = filteredUsers.map((user) => [
      user.username,
      user.email,
      user.contactNumber || "",
      user.score?.toString(),
      convertISOToDate(user.createdAt),
      categorizeUser(user.score),
    ]);
    // console.log(data);
    const rows = data.map(Object.values);

    doc.autoTable({
      head: [["Username", "Email", "Phone", "Score", "Date", "Category"]],
      body: rows,
    });

    doc.save("User_Data.pdf");
  };

  const exportToExcel = () => {
    const fileName = "User_Data.xlsx";
    const worksheet = XLSX.utils.json_to_sheet(
      filteredByYear.map((user) => ({
        Username: user.username,
        Email: user.email,
        "Phone Number": user.contactNumber,
        Score: user.score,
        Date: convertISOToDateTime(user.createdAt),
        Category: categorizeUser(user.score),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(workbook, fileName);
  };
  function convertISOToDateTime(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US");
  }
  const totalCount = filteredByYear.length;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const offset = currentPage * usersPerPage;
  const pageCount =
    usersPerPage === "all" ? 1 : Math.ceil(filteredByYear.length / usersPerPage);
  const currentUsers =
    usersPerPage === "all"
      ? filteredByYear
      : filteredByYear.slice(offset, offset + parseInt(usersPerPage));
  

  return (
    <div className="mx-auto p-2 md:p-4 pb-10 bg-gray-100 font-montserrat text-xs md:text-sm overflow-y-auto h-[90%]">
      {loading ? (
        <div className="w-full flex flex-col items-center justify-center text-xl">
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
        <>
          {showReportModal && (
            <ReportMessage
              onClose={() => setShowReportModal(false)}
              onSubmit={handleReportSubmit}
            />
          )}

          <div className="flex justify-center mt-4 flex-wrap mx-4 sm:mx-0">
            <div className="flex flex-col md:flex-row mx-1">
              <label htmlFor="count" className="mr-2">
                Users per page:
              </label>
              <select
                id="count"
                value={usersPerPage}
                onChange={(e) => setUsersPerPage(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black text-xs md:text-sm"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="all">All</option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row mx-1">
              <label htmlFor="sort" className="mr-2 ml-4">
                Sort by:
              </label>
              <select
                id="sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black text-xs md:text-sm"
              >
                <option value="none">None</option>
                <option value="score_highest">Score (Highest)</option>
                <option value="score_lowest">Score (Lowest)</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row mx-1">
              <label htmlFor="filter" className="ml-4 mr-2">
                Filter by:
              </label>
              <select
                id="filter"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black text-xs md:text-sm"
              >
                <option value="All">All</option>
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="flex">
              <div className="flex flex-col md:flex-row md:mt-1 mx-1">
                <label htmlFor="month" className="ml-4 mr-2">
                  Month:
                </label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black text-xs md:text-sm"
                >
                  <option value="All">All</option>
                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">Apr</option>
                  <option value="05">May</option>
                  <option value="06">Jun</option>
                  <option value="07">Jul</option>
                  <option value="08">Aug</option>
                  <option value="09">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
              </div>

              <div className="flex flex-col md:flex-row md:mt-1">
                <label htmlFor="year" className="ml-4 mr-2">
                  Year:
                </label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black text-xs md:text-sm"
                >
                  <option value="All">All</option>
                  <option value="2023">2024</option>
                  <option value="2022">2023</option>
                </select>
              </div>
            </div>
            <div className="mt-2">
              <button
                onClick={exportToExcel}
                className="ml-4 bg-blue-600 text-white font-semibold md:font-bold py-2 px-2 rounded-md"
              >
                <FaFileExcel/>
              </button>
              <button
                onClick={exportToPDF}
                className="ml-4 bg-blue-600 text-white font-semibold md:font-bold py-2 px-2 rounded-md"
              >
                <FaFilePdf/>
              </button>
            </div>
          </div>

          {filteredByYear.length === 0 || filteredUsers.length === 0 ? (
            <p className="text-center mt-4 text-red-500">
              No data available for the selected filter.
            </p>
          ) : (
            <div className="overflow-y-auto mt-2 h-[90%]">
              <table className="w-full max-w-6xl mx-auto bg-white border rounded-md">
                <thead>
                  <tr className="">
                    <td
                      colSpan={8}
                      className="text-lg text-center uppercase mt-2 font-bold"
                    >
                      Total Users: {totalCount}
                    </td>
                  </tr>
                  <tr className="">
                    <th className="px-1 md:px-4 py-1 md:py-2 border">Index</th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">
                      Full Name
                    </th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">Email</th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">Phone</th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">Score</th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">Date</th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">
                      Category
                    </th>
                    <th className="px-1 md:px-4 py-1 md:py-2 border">
                      Actions
                    </th>
                    {/* {showSummaryColumn && (
                <th className="px-1 md:px-4 py-1 md:py-2 border">Summary</th>
              )} */}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{user.username}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                      <td className="px-4 py-2 border">{user.contactNumber}</td>
                      <td className="px-4 py-2 border">{user.score ?? "NA"}</td>
                      <td className="px-4 py-2 border">
                        {convertISOToDate(user.createdAt)}
                      </td>
                      <td className="px-4 py-2 border">
                        {categorizeUser(user.score)}
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleReportSubmit(user)}
                          className="font-medium text-blue-600 mr-2 underline"
                        >
                          Report to Psychiatrist
                        </button>
                        {/* <button
                    onClick={() => {
                      setSelectUser(user.email);
                      handleReportUser(user._id);
                    }}
                    className="font-medium text-blue-600 mr-2 underline"
                  >
                    Report
                  </button> */}
                        {showSOSButton && (
                          <button className="font-medium text-red-600 underline">
                            SOS
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center mt-2">
                <ReactPaginate
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  nextLabel="Next >"
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  previousLabel="< Previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                  disabledClassName={"pagination__link--disabled"}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserDataSuper;
