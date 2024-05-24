import React, { useState, useEffect, useRef } from "react";
// import { questions } from "../../constants/quest";
import { useContext } from "react";
import { authContext, userContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./scrollbar.css";
import { FaRedo, FaSignOutAlt, FaUndo } from "react-icons/fa";
import emailjs from "emailjs-com";
import Header from "../Home/Header";
import Popup from "./Popup";
import ProgressBar from "@ramonak/react-progress-bar"; // Import ProgressBar from the library
import { differenceInDays } from "date-fns";

const TypingLoader = () => (
  <div className="text-center mt-20 ml-8 mb-4">
    <div className="flex">
      <div className="animate-pulse w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
      <div className="animate-pulse w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
      <div className="animate-pulse w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
    </div>
  </div>
);

const getHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return "Bearer " + token;
  } else {
    return {};
  }
};

const Chatbot = () => {
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { user, setUser } = useContext(userContext);
  const { auth, setAuth } = useContext(authContext);
  const [answers, setAnswers] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [pfp, setPfp] = useState("");
  const [score, setScore] = useState("");
  const [thisMonthAnswered, setThisMonthAnswered] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(false); // New state for loader
  // console.log('user in chatbot' ,user);
  // const sendEmail = (username,message,email) => {

  //   const serviceId = 'service_0jzntyg';
  //   const templateId = 'template_ugy8wsb';
  //   const userId = '4n-EC2hBnJ4wZnL_F';

  //   // console.log(username,message , 'message');

  //   const templateParams = {
  //     to_name:'PSYCH',
  //     from_name:'super admin',
  //     message:message,
  //     to_email: 'abhisektiwari2014@gmail.com',
  //     username: username,
  //     admin:admin,
  //     email:email,
  //     subject: 'User Reported',
  //     // message: `The user ${username} has been reported.`,
  //   };

  //   emailjs.send(serviceId, templateId, templateParams, userId)
  //     .then((response) => {
  //       console.log('Email sent:', response);
  //     })
  //     .catch((error) => {
  //       console.error('Email error:', error);
  //     });
  // };

  const axiosConfig = axios.create({
    baseURL: "https://manthanr.onrender.com/v1", // Base URL for API requests

    // Additional configuration options can be added here
  });

  const emojiMapping = {
    "Strongly Agree": "😄",
    Agree: "😊",
    Undecided: "😑",
    Disagree: "😔",
    "Strongly Disagree": "😞",
  };

  // You can then use this axiosConfig object when making Axios requests
  // For example:
  // axios.get('/endpoint', axiosConfig)
  // axios.post('/endpoint', data, axiosConfig)

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://manthanr.onrender.com/v1/getQ", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        const questionsArray = res.data.map((questionObj) => questionObj.text);
        // console.log(questionsArray); // Log the array of questions
        // Now you can set the questions array to state or use it as needed
        setQuestions(questionsArray);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }, []);

  const handleAnswer = ({ answer }) => {
    setAnswers([
      ...answers,
      { question: questions[currentQuestionIndex], answer },
    ]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex === questions.length - 1) {
      setShowThankYou(true);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [answers]);
  const undoLastQuestion = () => {
    if (showThankYou) {
      setShowThankYou(false);
    }
    const newAnswers = [...answers];
    newAnswers.pop();
    setAnswers(newAnswers);
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowThankYou(false);
    setProgress(0);
  };
  const getScore = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://manthanr.onrender.com/v1/user/get-score/${user.userID}`)
      .then((res) => {
        // console.log('res',res);
        setScore(res.data.score);
        if (res.data.score) {
          const dateString = res.data.date;

          const date = new Date(dateString);
          const today = new Date();

          const differenceInMs = today - date;

          const millisecondsInDay = 1000 * 60 * 60 * 24;
          const differenceInDays = Math.floor(
            differenceInMs / millisecondsInDay
          );
          setDaysLeft(30 - differenceInDays);
          const isAtLeast30Days = differenceInDays >= 30;

          // console.log("Is the difference at least 30 days?", );

          if (!isAtLeast30Days) {
            setThisMonthAnswered(true);
          }
        }
      })
      .catch((Err) => {
        console.log(Err);
      });
  };
  const getpfp = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://manthanr.onrender.com/v1/pfp/${user.userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPfp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitAns = (values) => {
    const token = localStorage.getItem("token");
    // console.log(token, 'token')

    const headers = { Authorization: `Bearer ${token}` };

    setIsFetchingData(true); // Start loader
    axios
      .post(
        "https://manthanr.onrender.com/v1/Doit",
        {
          email: user.email,
          answers: answers,
          score: userScore,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setIsFetchingData(false);
        if (res.status === 201) {
          toast.success("Submitted data successfully");
          navigate("/usersection");
        }
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.response.message);
        setIsFetchingData(false);
      });
  };

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      setIsTyping(true);
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
      }, 800);
      return () => clearTimeout(typingTimeout);
    }
  }, [currentQuestionIndex]);
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
  }, []);

  useEffect(() => {
    getpfp();
    getScore();
   // console.log("score", thisMonthAnswered);
  }, [user]);

  useEffect(() => {
    const newProgress =
      questions.length > 0
        ? Math.floor((currentQuestionIndex / questions.length) * 100)
        : 0;
    setProgress(newProgress);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (thisMonthAnswered) {
      setShowPopup(true);
    }
  }, [thisMonthAnswered]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Header />
      <div className="max-w-full px-4 pb-24 font-montserrat h-screen bg-blue-200 pt-16 md:pt-24">
        {showPopup ? (
          <Popup onClose={closePopup} navigate={navigate} daysLeft={daysLeft} />
        ) : (
          <>
            <div className="max-w-6xl mx-auto flex justify-between px-4 py-2 bg-blue-500 rounded-tr-xl rounded-tl-xl">
              <div className="flex justify-start">
                <div>
                  <img
                    src={pfp}
                    alt="logo"
                    className="ml-2 rounded-full h-9 w-9"
                  />
                </div>
                <div className="hidden md:flex">
                  <p className="py-2 px-6 bg-white rounded-xl font-bold text-base ml-2">
                    Hello {user.username} ✨
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex ">
                <button
                  onClick={handleRestart}
                  className="bg-white font-bold mx-2 py-2 px-6 rounded-xl text-sm transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Restart Survey
                </button>
              </div>

              <div className="sm:hidden font-bold rounded-lg bg-white my-auto py-1.5">
                <button
                  onClick={handleRestart}
                  className="my-1 mx-auto px-4 rounded-l-xl text-xs transition duration-300 ease-in-out transform hover:scale-105"
                  title="Restart"
                >
                  <FaRedo />
                </button>
              </div>
            </div>

            <div
              ref={chatContainerRef}
              className="chat-container max-w-6xl mx-auto text-lg bg-white lg:px-4 py-2 rounded-br-xl rounded-bl-xl shadow-lg mb-4 min-h-96"
              style={{ maxHeight: "calc(100vh - 200px)", overflowY: "scroll" }}
            >
              <div className="chat">
                {currentQuestionIndex === questions.length ? (
                  questions.length === 0 ? (
                    <p>Loading...</p>
                  ) : (
                    <p className="text-center font-bold text-xl uppercase mt-8 mb-2">
                      Survey completed
                    </p>
                  )
                ) : (
                  <>
                    {answers.map((answer, index) => (
                      <div
                        key={index}
                        className="chat-message mb-8 px-1 py-2 sm:p-4"
                      >
                        <div className="flex">
                          <img
                            src="./img/bot.png"
                            alt="logo"
                            className="max-h-9 max-w-9 ml-2 rounded-full border border-gray-800"
                          />
                          <p className="py-1 px-4 ml-1.5 mb-1 w-fit text-sm sm:text-base max-w-3xl border border-gray-600 font-medium rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-md">
                            {answer.question}
                          </p>
                        </div>
                        <div className="flex float-right m-1 items-center ">
                          <p
                            className={`py-1 px-4 w-fit text-sm sm:text-xl rounded-tr-full rounded-tl-full rounded-bl-full font-medium text-white bg-blue-500 shadow-md`}
                          >
                            {emojiMapping[answer.answer]}{" "}
                            <span className="text-sm sm:text-base">
                              {answer.answer}
                            </span>
                          </p>
                          <img
                            src={pfp}
                            alt="logo"
                            className="h-9 w-9 ml-2 my-auto rounded-full border border-gray-800"
                          />
                        </div>
                      </div>
                    ))}
                    {currentQuestionIndex < questions.length && isTyping ? (
                      <TypingLoader />
                    ) : (
                      <div
                        id={`question-${currentQuestionIndex}`}
                        className="chat-message px-1 py-2 sm:p-4 rounded-xl "
                      >
                        <div className="flex">
                          <img
                            src="./img/bot.png"
                            alt="logo"
                            className="max-h-9 max-w-9 ml-2 rounded-full border border-gray-800"
                          />
                          <div className="flex justify-between w-full">
                            <p className="py-1 px-4 ml-1.5 mb-1 w-fit max-w-3xl border border-gray-600 font-medium text-sm sm:text-base rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-md">
                              {questions[currentQuestionIndex]}
                            </p>
                            {answers.length > 0 && (
                              <button
                                onClick={undoLastQuestion}
                                className="bg-gray-700 ml-1 sm:mr-4 text-xs text-white font-semibold my-auto py-2 px-3 rounded-xl transition duration-300 ease-in-out shadow-xl transform hover:bg-black hover:scale-105"
                                title="Undo"
                              >
                                {" "}
                                <FaUndo />
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="options pl-10 sm:pl-12 pt-1 text-xs sm:text-sm">
                          <button
                            className="inline-block sm:m-1 px-2 py-1 font-medium transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => {
                              handleAnswer({
                                answer: "Strongly Agree",
                              });
                              setUserScore(userScore + 5);
                            }}
                          >
                            <div className="flex flex-col">
                              <p className="sm:p-1 text-xl md:text-2xl lg:text-3xl bg-gray-200 border rounded-md">
                                😄
                              </p>
                              <p className=" max-w-10 sm:max-w-14 text-[8px] sm:text-[10px] leading-snug sm:leading-normal text-center">
                                Strongly Agree
                              </p>
                            </div>
                          </button>
                          <button
                            className="inline-block sm:m-1 px-2 py-1 font-medium transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => {
                              handleAnswer({ answer: "Agree" });
                              setUserScore(userScore + 2);
                            }}
                          >
                            <div className="flex flex-col">
                              <p className="sm:p-1 text-xl md:text-2xl lg:text-3xl bg-gray-200 border rounded-md">
                                😊
                              </p>
                              <p className=" max-w-10 sm:max-w-14 text-[8px] sm:text-[10px] leading-snug sm:leading-normal ">
                                Agree
                              </p>
                            </div>
                          </button>
                          <button
                            className="inline-block sm:m-1 px-2 py-1 font-medium transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => {
                              handleAnswer({ answer: "Undecided" });
                              setUserScore(userScore + 3);
                            }}
                          >
                            <div className="flex flex-col">
                              <p className="sm:p-1 text-xl md:text-2xl lg:text-3xl bg-gray-200 border rounded-md">
                                😑
                              </p>
                              <p className=" max-w-10 sm:max-w-14 text-[8px] sm:text-[10px] leading-snug sm:leading-normal ">
                                Undecided
                              </p>
                            </div>
                          </button>
                          <button
                            className="inline-block sm:m-1 px-2 py-1 font-medium transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => {
                              handleAnswer({ answer: "Disagree" });
                              setUserScore(userScore + 2);
                            }}
                          >
                            <div className="flex flex-col">
                              <p className="sm:p-1 text-xl md:text-2xl lg:text-3xl bg-gray-200 border rounded-md">
                                😔
                              </p>
                              <p className=" max-w-10 sm:max-w-14 text-[8px] sm:text-[10px] leading-snug sm:leading-normal ">
                                Disagree
                              </p>
                            </div>
                          </button>
                          <button
                            className="inline-block sm:m-1 px-2 py-1  font-medium transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => {
                              handleAnswer({
                                answer: "Strongly Disagree",
                              });
                              setUserScore(userScore + 1);
                            }}
                          >
                            <div className="flex flex-col">
                              <p className="sm:p-1 text-xl md:text-2xl lg:text-3xl bg-gray-200 border rounded-md">
                                😞
                              </p>
                              <p className=" max-w-10 sm:max-w-14 text-[8px] sm:text-[10px] leading-snug sm:leading-normal ">
                                Strongly Disagree
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {!showThankYou && !thisMonthAnswered && (
                <div className="w-11/12 mx-auto mt-2">
                  <ProgressBar
                    completed={progress}
                    bgColor="#FFB02E"
                    baseBgColor="#e0e0e0"
                    height="20px"
                    labelSize="10px"
                    borderRadius="10px"
                  />
                </div>
              )}
              {showThankYou && (
                <div className="text-center mt-2">
                  <p className="text-base sm:text-2xl uppercase font-bold">
                    Thank You for Your Responses!
                  </p>
                </div>
              )}
              {currentQuestionIndex === questions.length && (
                <div className="text-center mt-2">
                  <button
                    onClick={() => {
                      // console.log(userScore);
                      // console.log("submitted");
                      submitAns();
                      // console.log(answers)
                    }}
                    className="bg-white font-bold py-1 px-4 text-sm sm:text-base rounded-xl border border-gray-700 transition duration-300 ease-in-out transform hover:bg-blue-600 hover:text-white hover:scale-105"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chatbot;
