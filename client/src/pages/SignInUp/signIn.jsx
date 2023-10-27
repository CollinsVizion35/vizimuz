import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";
import { AppPass } from "../../contexts/AppContext";

import logo from "../../imgs/logo.svg";

import { FaEye, FaEyeSlash } from "react-icons/fa/index";

import Sidebar from "../Home/sidebar";
import "../../index.css";
import SuccessModal from "../Modals/success-modal";
import ErrorModal from "../Modals/error-modal";
import LogoutModal from "./logoutModal";

import { MdHomeFilled, MdLibraryMusic, MdSettings } from "react-icons/md/index";
import { RiRadio2Fill, RiLogoutBoxRFill } from "react-icons/ri/index";
import { HiFilm } from "react-icons/hi/index";
import { BsFillPersonFill } from "react-icons/bs/index";

const options = [
  {
    id: 0,
    img: MdHomeFilled,
    navigate: "/home",
    color: "#52514E",
  },
  {
    id: 1,
    img: MdLibraryMusic,
    navigate: "/collection",
    color: "#52514E",
  },
  {
    id: 2,
    img: RiRadio2Fill,
    navigate: "/radio",
    color: "#52514E",
  },
  {
    id: 3,
    img: HiFilm,
    navigate: "/musicvideos",
    color: "#52514E",
  },
];

const SignIn = ({ isOpen, setIsOpen }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { signIn, user } = UseAuth();
  const rememberMeRef = useRef();

  const { none, setNone, flex, setFlex, signInRef, signUpRef, profileRef } =
    AppPass();

  const modalSuccessMsgTitle = "Successful";
  const modalSuccessMsgDetails = "Your sign in was successful";
  const modalErrMsgTitle = "Sign in";
  let modalErrMsgDetails =
    "Sorry, we can’t find an account with this email address, please try again or create a new account.";

  useEffect(() => {
    document.title = "Sign In - ViziMuz";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTimeout(() => {
      if (user) {
        setNone("none");
        setFlex("flex");
        signUpRef.current.style.display = "none";
        signInRef.current.style.display = none;
        // profileRef.current.style.display = flex;
      }
    }, 5000);

    try {
      await signIn(email, password.password)
        .then(() => setError(false))
        .then(() => navigate("/home"));
    } catch (e) {
      setError(true);
      console.log(e.message);
    }
  };

  // setTimeout(() => setIsOpen(false), 2000);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handlePasswordChange = (prop) => (e) => {
    e.preventDefault();
    setPassword({ ...password, [prop]: e.target.value });
  };

  const handleGoToSignUp = () => {
    signInRef.current.style.display = "none";
    signUpRef.current.style.display = "flex";
    // profileRef.current.style.display = "none";
  };

  return (
    <>
      <div
        ref={signInRef}
        className="bg-[#1D2123] text-white flex flex-col min-h-screen overflow-x-hidden"
        style={{ display: "none" }}
      >
        <div className="p-4 w-[40vw] pb-8 hidden lg:flex flex-row justify-between">
          <img src={logo} alt="home icon" />
        </div>

        <div className="bg-[#1D2123] text-white flex lg:flex-row flex-col">
          <div className="sidebar-sm lg:hidden">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          </div>

          <div className="sidebar-lg fixed hidden lg:flex flex-col mt-[2em]">
            <div className="flex flex-col justify-between bg-[#1A1E1F] mx-4 w-[4vw] rounded-[50px] py-4">
              {options.map((option, index) => {
                return (
                  <>
                    <Link to={option.navigate}>
                      <div
                        key={option.id}
                        className="flex my-3 w-1/2 mx-auto items-center cursor-pointer"
                      >
                        <option.img
                          className="stroke-black mx-auto w-[40px] hover:scale-[1.2]"
                          style={{ color: option.color }}
                        />
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>

            <div className="flex flex-col justify-between mt-3 bg-[#1A1E1F] mx-4 w-[4vw] rounded-[50px] my-4 py-4">
              <Link to="/profile">
                <div className="flex my-3 w-1/2 mx-auto items-center cursor-pointer">
                  <BsFillPersonFill
                    className="mx-auto w-[40px] hover:scale-[1.2]"
                    style={{ color: "#9600ffcc" }}
                  />
                </div>
              </Link>

              <Link to="/settings">
                <div className="flex my-3 w-1/2 mx-auto items-center cursor-pointer">
                  <MdSettings
                    className="mx-auto w-[40px] hover:scale-[1.2]"
                    style={{ color: "#52514E" }}
                  />
                </div>
              </Link>

              <div onClick={() => setShowLogoutModal(true)} className="">
                <div className="flex my-3 w-1/2 mx-auto items-center cursor-pointer">
                  <RiLogoutBoxRFill
                    className="mx-auto w-[40px] hover:scale-[1.2]"
                    style={{ color: "#52514E" }}
                  />
                </div>
                {showLogoutModal === true && (
                  <LogoutModal
                    showLogoutModal={showLogoutModal}
                    setShowLogoutModal={setShowLogoutModal}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full bg-inherit flex items-center mx-auto justify-center">
            <div className="text-left font-Poppins pl-4 lg:pl-0 flex flex-col">
              <h4 className="text-[#95B4B3] font-extrabold text-[1.5rem] leading-[2.25rem] text-left">
                Sign in
              </h4>
              <p className="text-[#9600ffcc] font-bold leading-[1.6875rem] text-lg">
                Welcome back to VizMuz
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col text-[#000]"
              >
                <label className="mt-6 text-[#95B4B3] text-base mb-2">
                  Email
                </label>
                <input
                  id="emailInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="focus:border-0 focus:border-[#95B4B3] border-2 px-5 py-3 rounded-md border-[#95B4B3] w-[18rem] lg:w-[19.6875rem] h-[2.8125rem] mb-5 placeholder:text-sm md:placeholder:text-base placeholder:text-[rgba(119, 114, 211, 0.5);]"
                ></input>
                <label
                  htmlFor="passwordInput"
                  className="text-[#95B4B3] text-base mb-2"
                >
                  Password
                </label>
                <div className="flex w-[18rem] lg:w-[19.6875rem]">
                  <input
                    type={password.showPassword ? "text" : "password"}
                    value={password.password}
                    onChange={handlePasswordChange("password")}
                    id="passwordInput"
                    placeholder="Enter your password"
                    className="focus:border-0 focus:border-[#95B4B3] border-2 border-r-0 w-3/4 px-5 py-3 rounded-md rounded-tr-none rounded-br-none border-[#95B4B3] h-[2.8125rem] placeholder:text-sm md:placeholder:text-base placeholder:text-[rgba(119, 114, 211, 0.5)"
                  ></input>
                  <button
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    className="w-1/4 border-2 border-l-0 rounded-md border-[#95B4B3] rounded-bl-none rounded-tl-none"
                  >
                    <FaEye className="mx-auto" />
                  </button>
                </div>
                <div className="flex justify-between px-2 lg:px-0 mt-4 text-[#95B4B3] text-sm">
                  <p className="cursor-pointer">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      ref={rememberMeRef}
                    ></input>{" "}
                    <label htmlFor="rememberMe">Remember me?</label>
                  </p>
                  <p className="cursor-pointer">
                    <Link to="/forgot-password">Forgot Password</Link>
                  </p>
                </div>

                <button
                  onClick={handleButtonClick}
                  type="submit"
                  className="bg-[#95B4B3] rounded-md my-5 px-8 lg:px-12 py-3 md:py-4 w-[18rem] lg:w-[19.6875rem] text-white"
                >
                  Sign in
                </button>
                {error === false && (
                  <SuccessModal
                    open={isOpen}
                    modalSuccessMsgTitle={modalSuccessMsgTitle}
                    modalSuccessMsgDetails={modalSuccessMsgDetails}
                  />
                )}
                {error === true && (
                  <ErrorModal
                    open={isOpen}
                    modalErrMsgTitle={modalErrMsgTitle}
                    modalErrMsgDetails={modalErrMsgDetails}
                  />
                )}
              </form>
              <p className="text-sm leading-[3.125rem] cursor-pointer text-[#9600ffcc] text-center font-semibold">
                {" "}
                <div onClick={handleGoToSignUp}>
                  Dont have an account? create an account.
                </div>
              </p>
              {/* <SignUp
                     value={passwordValue.password}
                     setPasswordValue={setPasswordValue}
                     handlePasswordChange={handlePasswordChange}
                     handleClickShowPassword={handleClickShowPassword}
                     handleMouseDownPassword={handleMouseDownPassword}
                     /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
