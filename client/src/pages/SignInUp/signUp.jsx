import React, { useEffect, useRef, useState } from "react";
import { AppPass } from "../../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
// import Otp from './otp-page';
import { auth } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { UseAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import SuccessModal from "../Modals/success-modal";
import ErrorModal from "../Modals/error-modal";

import { FaEye, FaEyeSlash } from "react-icons/fa/index";

import logo from "../../imgs/logo.svg";

import Sidebar from "../Home/sidebar";
import "../../index.css";
// import ProfileImg from './editProfileImg';
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

const SignUp = ({ isOpen, setIsOpen }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user } = UseAuth();

  const [name, setName] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("fname");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [email, setEmail] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("email");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });

  const [phone_number, setPhone_number] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("phone");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  useEffect(() => {
    localStorage.setItem("phone", JSON.stringify(phone_number));
    localStorage.setItem("fname", JSON.stringify(name));
    localStorage.setItem("email", JSON.stringify(email));
  }, [phone_number, name, email]);

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const modalSuccessMsgTitle = "Successful";
  const modalSuccessMsgDetails = "Your sign up was successful";
  const modalErrMsgTitle = "Error";
  let modalErrMsgDetails = "Your sign up was not successful.";
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { createUser } = UseAuth();

  const { none, setNone, flex, setFlex, signInRef, signUpRef, profileRef } =
    AppPass();

  async function handleSubmit(e) {
    e.preventDefault();

    setTimeout(() => {
      if (user) {
        setNone("none");
        setFlex("flex");

        signInRef.current.style.display = "none";
        signUpRef.current.style.display = none;
        // profileRef.current.style.display = flex;
      }
    }, 5000);

    try {
      await createUser(email, password.password);
      setError(false);
      // navigate("/profile");
      await addDoc(collection(db, "Users"), {
        name: nameRef.current.value,
        phone_number: phoneRef.current.value,
        email: emailRef.current.value,
        lastname: nameRef.current.value,
        firstname: nameRef.current.value,
      });

      navigate("/profile");
      storeInformationToDB();
    } catch (e) {
      setError(true);
      modalErrMsgDetails = `Your sign-up was not successful. ${e.message}`;
      console.log(e.message);
    }
  }

  async function storeInformationToDB() {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        phoneNumber: phone_number,
        // phoneNumber: phoneRef.current.value,
      });
      // await updatePhoneNumber(auth.currentUser, { phoneNumber: phoneRef.current.value });
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleGoToSignIn = () => {
    signInRef.current.style.display = "flex";
    signUpRef.current.style.display = "none";
    // profileRef.current.style.display = "none";
  };

  useEffect(() => {
    document.title = "Sign Up - ViziMuz";
  }, []);

  // setTimeout(() => {
  //   setIsOpen(false);
  // }, 3000);

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

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        ref={signUpRef}
        className="bg-[#0F1732] text-white flex flex-col min-h-screen overflow-x-hidden"
        style={{ display: none }}
      >
        <div className="p-4 w-[40vw] pb-8 hidden lg:flex flex-row justify-between">
          <img src={logo} alt="home icon" />
        </div>

        <div className="bg-[#0F1732] text-white flex lg:flex-row flex-col">
          <div className="sidebar-sm lg:hidden">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          </div>

          <div className="sidebar-lg fixed hidden lg:flex flex-col mt-[2em]">
            <div className="flex flex-col justify-between bg-[#040C25] mx-4 w-[4vw] rounded-[50px] py-4">
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

            <div className="flex flex-col justify-between mt-3 bg-[#040C25] mx-4 w-[4vw] rounded-[50px] my-4 py-4">
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

          <div className="my-auto lg:mt-[-5em] w-full pr-4 overflow-x-hidden h-screen lg:max-w-[1000px] bg-inherit flex items-center mx-auto justify-center">
            <div className="text-left pt-6 pl-10 font-Poppins">
              <h4 className="text-[#95B4B3] font-extrabold text-xl md:text-[1.5rem] leading-[2.25rem] text-left">
                Sign up
              </h4>
              <p className="text-[#9600ffcc] font-bold leading-[1.6875rem] text-base md:text-lg">
                Welcome back to ViziMuz
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col mt-8 text-[#000]"
              >
                <label
                  htmlFor="nameInput"
                  className="mt-3 md:mt-6 text-[#95B4B3] text-[.8em] text-base mt-[-1.5em]"
                >
                  Name
                </label>{" "}
                <br />
                <input
                  id="nameInput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ref={nameRef}
                  placeholder="Enter your full name"
                  className=" focus:border-0 mt-[-1.5em] focus:border-[#95B4B3] border-2 px-2 mr-6 py-1 rounded-md border-[#95B4B3] w-[90vw] md:w-[19.6875rem] h-[2em] placeholder:text-[rgba(119, 114, 211, 0.5);]"
                ></input>
                <br />
                <label
                  htmlFor="phoneNumberInput"
                  className="text-[#95B4B3] text-[.8em] text-base mt-[-1.5em]"
                >
                  Phone number
                </label>{" "}
                <br />
                <input
                  id="phoneNumberInput"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                  ref={phoneRef}
                  placeholder="Enter your phone number"
                  className=" focus:border-0 mt-[-1.5em] focus:border-[#95B4B3] border-2 px-2 mr-6 py-1 rounded-md border-[#95B4B3] w-[90vw] md:w-[19.6875rem] h-[2em] placeholder:text-[rgba(119, 114, 211, 0.5);]"
                ></input>
                <br />
                <label
                  htmlFor="emailInput"
                  className="text-[#95B4B3] text-[.8em] text-base mt-[-1.5em]"
                >
                  Email
                </label>{" "}
                <br />
                <input
                  id="emailInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={emailRef}
                  placeholder="Enter your email"
                  className=" focus:border-0 mt-[-1.5em] focus:border-[#95B4B3] border-2 px-2 mr-6 py-1 rounded-md border-[#95B4B3] w-[90vw] md:w-[19.6875rem] h-[2em] placeholder:text-[rgba(119, 114, 211, 0.5);]"
                ></input>
                <br />
                <label
                  htmlFor="passwordInput"
                  className="text-[#95B4B3] text-[.8em] text-base mt-[-1.5em]"
                >
                  Password
                </label>
                <br />
                <div className="flex w-[90vw] mr-auto md:w-[19.6875rem]">
                  <input
                    type={password.showPassword ? "text" : "password"}
                    // value={password}
                    // onChange={handlePasswordChange("password")}
                    id="passwordInput"
                    ref={passwordRef}
                    onChange={handlePasswordChange("password")}
                    placeholder="Enter your password"
                    className="focus:border-0 mt-[-1.5em] focus:border-[#95B4B3] border-2 border-r-0 w-3/4 px-2 py-3 rounded-md rounded-tr-none rounded-br-none border-[#95B4B3] h-[2em]"
                  ></input>
                  <button
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    className="w-1/4 border-2 mt-[-1.5em] border-l-0 rounded-md border-[#95B4B3] rounded-bl-none rounded-tl-none"
                  >
                    <FaEye className="mx-auto" />
                  </button>
                </div>
                <div className="flex justify-between items-center text-center w-[90%] mt-4 text-[#95B4B3] text-center font-bold text-[0.78rem]">
                  Proceeding means you accept our Terms and Conditions
                </div>
                <button
                  onClick={handleButtonClick}
                  type="submit"
                  className="bg-[#95B4B3] rounded-md mt-7 px-auto w-[90%] items-center mb-4 px-12 py-4 text-white w-[19.6875rem]"
                >
                  Sign up
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
              <p className="text-sm text-center mr-4 leading-[3.125rem] cursor-pointer text-[#9600ffcc] text-left font-semibold">
                <div onClick={handleGoToSignIn}>
                  Already have an account? Login.
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Otp/> */}
    </>
  );
};

export default SignUp;
