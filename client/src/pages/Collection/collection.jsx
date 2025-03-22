import React, { useEffect, useRef, useState } from "react";
import SearchArtist from "../Home/searchArtist";
import { AppPass } from "../../contexts/AppContext";
import Player from "../Players/CollectionPlayer/player";

import logo from "../../imgs/vizimuz_logo.png";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Home/sidebar";
import "../../index.css";
import LogoutModal from "../SignInUp/logoutModal";

import { MdArrowForward, MdHomeFilled, MdLibraryMusic, MdSettings } from "react-icons/md";
import { RiRadio2Fill, RiLogoutBoxRFill } from "react-icons/ri";
import { HiFilm } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";

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

import dancehall from "/dancehall.jpg";
import punk from "/punk.jpg";
import folk from "/folk.jpg";
import country from "/country.jpg";
import indie from "/indie.jpg";
import latin from "/latin.webp";
import classicalCross from "/classicalCross.webp";
import blues from "/blues.jpg";
import { useColorTheme } from "../../contexts/colorContext/useColorTheme";

const Genres = [
  {
    id: 0,
    img: a,
    category: "Afrobeat",
    link: "/genre/afrobeat",
  },
  {
    id: 1,
    img: b,
    category: "Reggae",
    link: "/genre/reggae",
  },
  {
    id: 2,
    img: c,
    category: "Hip Hop",
    link: "/genre/hip_hop",
  },
  {
    id: 3,
    img: d,
    category: "Gospel",
    link: "/genre/gospel",
  },
  {
    id: 4,
    img: e,
    category: "Jazz",
    link: "/genre/jazz",
  },
  {
    id: 5,
    img: f,
    category: "Pop",
    link: "/genre/pop",
  },
  {
    id: 6,
    img: g,
    category: "R&B",
    link: "/genre/r&b",
  },
  {
    id: 7,
    img: h,
    category: "Rock",
    link: "/genre/rock",
  },
  {
    id: 8,
    img: i,
    category: "K-Pop",
    link: "/genre/k_pop",
  },
  {
    id: 9,
    img: j,
    category: "Soul",
    link: "/genre/soul",
  },
  {
    id: 10,
    img: k,
    category: "EDM",
    link: "/genre/edm",
  },
  {
    id: 11,
    img: l,
    category: "Classical",
    link: "/genre/classical",
  },
  {
    id: 12,
    img: dancehall,
    category: "Dancehall",
    link: "/genre/dancehall",
  },
  {
    id: 13,
    img: latin,
    category: "Latin",
    link: "/genre/latin",
  },
  {
    id: 14,
    img: country,
    category: "Country",
    link: "/genre/country",
  },
  {
    id: 15,
    img: blues,
    category: "Blues",
    link: "/genre/blues",
  },
  {
    id: 16,
    img: folk,
    category: "Folk",
    link: "/genre/folk",
  },
  {
    id: 17,
    img: punk,
    category: "Punk",
    link: "/genre/punk",
  },
  {
    id: 18,
    img: classicalCross,
    category: "Classical crossover",
    link: "/genre/classical_crossover",
  },
  {
    id: 19,
    img: indie,
    category: "Indie",
    link: "/genre/indie",
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
    color: "#000"
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
      
        const { isDark } = useColorTheme();

  return (
    <>
      <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"}  border-b border-[#2F3336] flex flex-col min-h-screen`}>
      <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"}  border-b border-[#2F3336] p-8 pt-8 pb-8 hidden fixed top-0 lg:flex flex-row items-center justify-between w-screen z-[999999999999]`}>
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

        <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"}  border-b border-[#2F3336] flex flex-col lg:flex-row mx-auto max-w-[1440px] my-0 lg:mt-32 mt-24`}>
          <div className="sidebar-sm lg:hidden">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          </div>

          <div className="sidebar-lg fixed hidden lg:flex flex-col mt-[2em]">
            <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"} flex flex-col justify-between border border-[#2F3336] mx-4 w-[4vw] rounded-[50px] py-4`}>
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

            <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"} flex flex-col justify-between mt-3 border border-[#2F3336] mx-4 w-[4vw] rounded-[50px] my-4 py-4`}>
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

          <div className="Body w-[95vw] max-w-[1440px] mb-[8em] lg:ml-[5vw] mx-auto">
            <div className="flex w-[95vw] max-w-[1440px] items-center justify-center">
                <div className="items-center  px-3 py-2 rounded-[20px] font-bold text-[1.2em] mr-2">
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
                          className="absolute text-[0.9em]  text-white xl:left-16 left-8 bottom-2 opacity-80"
                        >
                          {genre.category}
                        </h2>
                        <div className="border  border-[#fcfcfc] p-1 rounded-[50%]  text-white absolute xl:left-16 left-8 top-2 opacity-80">
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
