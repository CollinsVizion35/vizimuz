import React, { useState, useEffect } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import notAvailable from "../../imgs/No-Photo-Available.jpg";

import logo from "../../imgs/vizimuz_logo.png";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Home/sidebar";
import "../../index.css";
import LogoutModal from "../SignInUp/logoutModal";

import { MdHomeFilled, MdLibraryMusic, MdSettings } from "react-icons/md";
import { RiRadio2Fill, RiLogoutBoxRFill } from "react-icons/ri";
import { HiFilm } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import SearchArtist from "../Home/searchArtist";
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
    color: "#000"
  },
  {
    id: 3,
    img: HiFilm,
    navigate: "/musicvideos",
    color: "#52514E",
  },
];

function Radio() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("all");

  useEffect(() => {
    document.title = "Radio - ViziMuz";
  }, []);

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      setStations(data);
    });
  }, [stationFilter]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "VizMuz Radio");

    const stations = await api.searchStations({
      language: "english",
      tag: stationFilter,
      limit: 30,
    });

    return stations;
  };

  const filters = [
    "all",
    "afrobeat",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  const setDefaultSrc = (e) => {
    e.target.src = notAvailable;
  };

  
  const navigate = useNavigate();
    
  const { isDark } = useColorTheme();

  return (
    <>
      <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"}  border-b border-[#2F3336]  flex flex-col min-h-screen`}>
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
                    style={{ color: "#52514E" }}
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

          <div className="Body w-[95vw] max-w-[1440px] mb-[8em] lg:ml-[5vw] mx-auto ">
            <div className="text-3xl p-2 text-[#E7E9EA] flex w-screen items-center justify-center">
              VizMuz <span className="text-[#95B4B3]">Radio</span>
            </div>

            <div className="flex lg:flex-row-reverse flex-col justify-around w-full mt-4">
              <div className="lg:flex lg:flex-col grid grid-cols-3 md:grid-cols-6 text-left lg:w-[10vw] w-[90vw] lg:absolute right-0 top-0 px-8 mt-[5em]">
                {filters.map((filter) => {
                  return (
                    <button
                      className={
                        stationFilter === filter
                          ? "p-2 rounded-[20px] border-[2px] border-[#95B4B3] mb-2 hover:bg-[#95B4B3] bg-[#95B4B3]"
                          : "p-2 rounded-[20px] border-[2px] border-[#95B4B3] mb-2 hover:bg-[#95B4B3]"
                      }
                      onClick={() => setStationFilter(filter)}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
              <div className="stations grid grid-cols-1 md:grid-cols-2 lg:mt-[0em] mt-[2em] lg:mr-[10vw] lg:ml-[2.5vw]">
                {stations &&
                  stations.map((station, radio) => {
                    return (
                      <div
                        className="stations mb-4 lg:mr-4 bg-[#95B4B3] rounded-[5px] lg:max-w-[90%] md:max-w-[47.5vw] md:min-w-[47.5vw] w-[90vw] lg:min-w-[90%]"
                        key={radio}
                      >
                        <div className=" flex flex-col">
                          <img
                            className="w-[50px] h-[50px] rounded-[20px]"
                            src={station.favicon}
                            alt="station logo"
                            onError={setDefaultSrc}
                          />

                          <div>{station.name}</div>
                        </div>

                        <AudioPlayer
                          src={station.urlResolved}
                          showJumpControls={false}
                          layout="horizontal"
                          customProgressBarSection={[]}
                          customControlsSection={[
                            "MAIN_CONTROLS",
                            "VOLUME_CONTROLS",
                          ]}
                          autoPlayAfterSrcChange={false}
                          className=" rounded-[5px]"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Radio;
