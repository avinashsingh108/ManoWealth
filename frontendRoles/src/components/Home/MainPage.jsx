import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TypeWriterEffect from "react-typewriter-effect";
import "./home.css";
import Header from "./Header";

function MainPage() {
  const navigate = useNavigate();
  const [bgImageUrl, setBgImageUrl] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setLoggedin(false);

    if (token) {
      setLoggedin(true);
    }
  });

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      setBgImageUrl("./img/bg-small.png");
    } else if (screenWidth > 640 && screenWidth < 1023) {
      setBgImageUrl("./img/bg-mid.png");
    } else if (screenWidth > 1023 && screenWidth < 1280) {
      setBgImageUrl("./img/bg-lg.png");
    } else {
      setBgImageUrl("./img/bg-xl.png");
    }

    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      if (newScreenWidth < 640) {
        setBgImageUrl("./img/bg-small.png");
      } else if (newScreenWidth > 640 && newScreenWidth < 1023) {
        setBgImageUrl("./img/bg-mid.png");
      } else if (newScreenWidth > 1023 && newScreenWidth < 1280) {
        setBgImageUrl("./img/bg-lg.png");
      } else {
        setBgImageUrl("/img/bg-xl.png");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="h-full min-h-screen bg-center bg-no-repeat flex flex-col lg:justify-center items-center font-montserrat main-background"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
      }}
    >
      {/* Navbar */}
      <Header />

      {/* Content */}
      <div className=" flex flex-col w-full pl-6 items-center ">
        <div className="flex mt-10 w-full justify-center">
          {/* text content */}
          <div className="flex flex-col mt-4 mr-4 xl:mr-28">
            <div className="w-full sm:max-w-xl min-h-48 rounded-lg typewriter-text uppercase">
              <TypeWriterEffect
                textStyle={{
                  fontFamily: "montserrat",
                  fontWeight: "800",
                }}
                startDelay={100}
                cursorColor="black"
                text="Your Mental Health Matters. Let us help!"
                typeSpeed={100}
                hideCursorAfterText="true"
              />
            </div>
            {/* image small */}
            <div className="lg:hidden mx-auto ">
              <img
                src="./img/homebg.jpg"
                alt="Description"
                className="h-56 sm:h-96 animate-custom-bounce image-small"
                style={{
                  animationDuration: "3s",
                  animationIterationCount: "infinite",
                }}
              />
            </div>
            <div className=" sm:mb-4 py-2 max-w-xl para">
              <p className="text-base font-medium paragraph ">
                Enter{" "}
                <span className="font-bold  text-blue-600">ManoWealth</span> - A
                Place Where Your Mental Well-being Finds Support, Comfort, and
                Strength.
              </p>
            </div>
            {loggedin ? null : (
              <div className="login">
                <button
                  onClick={() => navigate("/Signup")}
                  className="login-btn bg-blue-600 text-white w-fit text-base sm:text-base md:text-lg mb-6 font-semibold sm:font-bold uppercase rounded-full cursor-pointer shadow-lg z-50 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Signup
                </button>
                <button
                  onClick={() => {
                    navigate("/login");
                    // if (loggedin) {
                    //   navigate("/usersection");
                    // } else {
                    //   navigate("/login");
                    // }
                  }}
                  className="login-btn ml-4 bg-blue-600 text-white w-fit text-base sm:text-base md:text-lg mb-6 font-semibold sm:font-bold uppercase rounded-full cursor-pointer shadow-lg z-50 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Login
                </button>
                
              </div>
            )}
          </div>
          {/* image md */}
          <div className="hidden lg:flex md-img">
            <img
              src="./img/homebg.jpg"
              alt="Description"
              className="h-80 xl:h-96 animate-custom-bounce"
              style={{
                animationDuration: "3s",
                animationIterationCount: "infinite",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
