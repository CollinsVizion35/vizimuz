import React, { useEffect, useRef, useState } from "react";
import SearchArtist from "../Home/searchArtist";
import { AppPass } from "../../contexts/AppContext";
import Player from "../Players/CollectionPlayer/player";

import logo from "../../imgs/logo.svg";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Home/sidebar";
import "../../index.css";
import LogoutModal from "../SignInUp/logoutModal";

import { MdArrowForward, MdHomeFilled, MdLibraryMusic, MdSettings } from "react-icons/md/index";
import { RiRadio2Fill, RiLogoutBoxRFill } from "react-icons/ri/index";
import { HiFilm } from "react-icons/hi/index";
import { BsFillPersonFill } from "react-icons/bs/index";

import a from "/afrobeat.jpg";
import b from "/reggae.jpg";
import c from "/2.jpg";
import d from "/4.jpg";
import e from "/5.jpg";
import f from "/6.jpg";
import g from "/7.jpg";
import h from "/8.jpg";
import i from "/9.jpg";
import j from "/10.jpg";
import k from "/11.jpg";
import l from "/12.jpg";

const Genres = [
  {
    id: 0,
    img: a,
    category: "Afrobeat",
    link: "",
  },
  {
    id: 1,
    img: b,
    category: "Reggae",
    link: "",
  },
  {
    id: 2,
    img: c,
    category: "Hip Hop",
    link: "",
  },
  {
    id: 3,
    img: d,
    category: "Gospel",
    link: "",
  },
  {
    id: 4,
    img: e,
    category: "Jazz",
    link: "",
  },
  {
    id: 5,
    img: f,
    category: "Pop",
    link: "",
  },
  {
    id: 6,
    img: g,
    category: "R&B",
    link: "",
  },
  {
    id: 7,
    img: h,
    category: "Trap",
    link: "",
  },
  {
    id: 8,
    img: i,
    category: "Grime",
    link: "",
  },
  {
    id: 9,
    img: j,
    category: "Soul",
    link: "",
  },
  {
    id: 10,
    img: k,
    category: "Electronics",
    link: "",
  },
  {
    id: 11,
    img: l,
    category: "Metal",
    link: "",
  },
];

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
    color: "#9600ffcc",
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

const Collection = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [volume, setVolume] = useState("1");

  const playerAudio2Ref = useRef(null);
  const playerImage2Ref = useRef(null);
  const playerName2Ref = useRef(null);
  const playerArtist2Ref = useRef(null);

  const { getCurrDuration } = AppPass();

  useEffect(() => {
    document.title = "Your Collection - ViziMuz";
  });

  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanShow(true), 3000);
    return () => clearTimeout(timer);
  });

  const audioEl = useRef(null);
  audioEl.current = [];
  const audioToEl = (el) => {
    if (el && !audioEl.current.includes(el)) {
      audioEl.current.push(el);
    }
  };

  const imageEl = useRef(null);
  imageEl.current = [];
  const imageToEl = (el) => {
    if (el && !imageEl.current.includes(el)) {
      imageEl.current.push(el);
    }
  };

  const musicNameEl = useRef(null);
  musicNameEl.current = [];
  const musicNameToEl = (el) => {
    if (el && !musicNameEl.current.includes(el)) {
      musicNameEl.current.push(el);
    }
  };

  const artistNameEl = useRef(null);
  artistNameEl.current = [];
  const artistNameToEl = (el) => {
    if (el && !artistNameEl.current.includes(el)) {
      artistNameEl.current.push(el);
    }
  };

  const musicBoxEl = useRef(null);
  musicBoxEl.current = [];
  const musicBoxToEl = (el) => {
    if (el && !musicBoxEl.current.includes(el)) {
      musicBoxEl.current.push(el);
    }
  };

  
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#0F1732] text-white flex flex-col min-h-screen">
      <div className="bg-[#040C25] p-8 pt-8 pb-8 hidden fixed top-0 lg:flex flex-row items-center justify-between w-screen z-[999999999999]">
          <div className="flex flex-row items-center justify-between w-[40vw]">
            <img src={logo} alt="home icon" />

            <SearchArtist />
          </div>
          <button
            onClick={() => navigate("/upload_music")}
            className="w-fit  bg-[#9600ffcc] p-3 rounded-[20px] cursor-pointer"
          >
            Upload Music
          </button>
        </div>

        <div className="bg-[#0F1732] text-white flex flex-col lg:flex-row w-[95vw] mx-auto max-w-[1440px] my-0 lg:mt-32 mt-24">
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

          <div className="Body w-[95vw] max-w-[1440px] flex flex-col lg:ml-[5vw] mx-auto lg:pl-8 mb-12">
            <div className="flex w-[95vw] max-w-[1440px] items-center justify-center">
                <div className="items-center  px-3 py-2 rounded-[20px] font-bold text-[1.2em] text-[#fcfcfc] mr-2">
                  Genre
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 py-4 w-full lg:max-w-[1440px] mx-auto">
              {Genres.map((genre, index) => {
                return (
                  <>
                  <Link to={genre.link}>
                    <div
                      key={index}
                      className="flex flex-col items-center relative group text-left my-3 mx-auto lg:mr-4 cursor-pointer"
                    >
                      <img
                        className=" group-hover:scale-[1.1] lg:h-[250px] lg:w-[250px] w-[40vw] h-[40vw] rounded-[5px]"
                        title={genre.img}
                        ref={imageToEl}
                        src={genre.img}
                        alt="artist"
                      />

                        <h2
                          ref={musicNameToEl}
                          className="absolute text-white text-[0.9em] xl:left-16 left-8 bottom-2 opacity-80"
                        >
                          {genre.category}
                        </h2>
                        <div className="border border-[#fcfcfc] p-1 rounded-[50%] absolute xl:left-16 left-8 top-2 opacity-80">
                          <MdArrowForward/>
                        </div>
                    </div>
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
