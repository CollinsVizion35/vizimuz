import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AppPass } from "../../contexts/AppContext";

import logo from "../../imgs/vizimuz_logo.png";

import Sidebar from "../Home/sidebar";
import "../../index.css";
import InfoProfileImg from "./profileBtn";
import LogoutModal from "../SignInUp/logoutModal";

import { MdHomeFilled, MdLibraryMusic, MdSettings } from "react-icons/md";
import { RiRadio2Fill, RiLogoutBoxRFill } from "react-icons/ri";
import { HiFilm } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import SearchArtist from "../Home/searchArtist";
import ProfileBtn from "./profileBtn";
import { useColorTheme } from "../../contexts/colorContext/useColorTheme";

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

const Profile = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { flex, profileRef } = AppPass();

  useEffect(() => {
    document.title = "My Profile - ViziMuz";
  }, []);


  
  const navigate = useNavigate();
    
  const { isDark } = useColorTheme();
  
  return (
    <>
      <div
        ref={profileRef}
        className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"}  border-b border-[#2F3336]  flex flex-col min-h-screen overflow-x-hidden`}>
        {/* // style={{ display: flex }} */}
      
        <div className="bg-inherit border-b border-[#2F3336] p-8 pt-8 pb-8 hidden fixed top-0 lg:flex flex-row items-center justify-between w-screen z-[999999999999]">
          <div className="flex flex-row items-center justify-between w-[40vw]">
            <img src={logo} className="w-[35px] h-[35px]" alt="home icon" />

            <SearchArtist />
          </div>
          <button
            onClick={() => navigate("/upload_music")}
            className={`${isDark ? "bg-white " : "bg-black text-white"} w-fit  bg-[#E7E9EA] text-[#000000] p-3 rounded-[20px] cursor-pointer`}
          >
            Upload Music
          </button>
        </div>

        <div className="bg-inherit border-b border-[#2F3336]  flex lg:flex-row flex-col max-w-[1440px] mx-auto my-0 lg:mt-32 mt-20">
          <div className="sidebar-sm lg:hidden">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          </div>

          <div className="sidebar-lg fixed hidden lg:flex flex-col mt-[2em]">
            <div className="flex flex-col justify-between bg-inherit border border-[#2F3336] mx-4 w-[4vw] rounded-[50px] py-4">
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

            <div className="flex flex-col justify-between mt-3 bg-inherit border border-[#2F3336] mx-4 w-[4vw] rounded-[50px] my-4 py-4">
              <Link to="/profile">
                <div className="flex my-3 w-1/2 mx-auto items-center cursor-pointer">
                  <BsFillPersonFill
                    className="mx-auto w-[40px] hover:scale-[1.2]"
                    style={{ color: "#000" }}
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

          <div className="Body w-[95vw] max-w-[1440px] mb-[8em] lg:ml-[5vw] mx-auto">
            <div className="w-full text-left py-8 px-12 md:px-14">
              <h2 className="font-Poppins text-[#95B4B3] text-2xl font-bold hidden lg:block mb-[5em] lg:mb-6">
                Profile
              </h2>
              <div className="flex flex-col justify-center items-center">
                <ProfileBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
