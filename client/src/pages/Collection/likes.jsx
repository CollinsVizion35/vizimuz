import React, { useEffect, useRef, useState } from "react";
import SearchArtist from "../Home/searchArtist";
import { AppPass } from "../../contexts/AppContext";
import Player from "../Players/LikesPlayer/player";

import logo from "../../imgs/vizimuz_logo.png";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Home/sidebar";
import "../../index.css";
import LogoutModal from "../SignInUp/logoutModal";

import gkmc from "../../imgs/gkmcLamar.jpg";
import dangerous from "../../imgs/dangerous.jpg";
import sheriff from "../../imgs/I_Shot_the_Sheriff_by_Bob_Marley_and_the_Wailers_German_vinyl.jpg";
import pSquare from "../../imgs/p-square.jpeg";

import { MdHomeFilled, MdLibraryMusic, MdSettings } from "react-icons/md";
import { RiRadio2Fill, RiLogoutBoxRFill } from "react-icons/ri";
import { HiFilm } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
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

const likes = [
  {
    id: 0,
    artist: "Bob Marley",
    img: sheriff,
    name: "I Shot The Sheriff",
    audio: "Bob Marley - I Shot The Sheriff.mp3",
    album: "Singles",
  },
  {
    id: 1,
    artist: "Kendrick Lamar",
    img: gkmc,
    name: "Backstreet Freestyle",
    audio: "03 - Backstreet Freestyle.mp3",
    album: "good kid, m.A.A.d city",
  },
  {
    id: 2,
    artist: "P-Square",
    img: pSquare,
    name: "Ihe Geme",
    audio: "P-Square_-_Jaiye_Ihe_Geme__@BaseNaija.com.mp3",
    album: "Singles",
  },
  {
    id: 3,
    artist: "Michael Jackson",
    img: dangerous,
    name: "Dangerous",
    audio: "Michael Jackson - Dangerous (1995) _ Studio Version _.mp3",
    album: "Dangerous",
  },
];

const Likes = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const {
    currentSongIndex,
    setCurrentSongIndex,
    nextSongIndex,
    isPlaying,
    setIsPlaying,
    setDuration,
    getCurrDuration,
    playerAudio3Ref,
    playerImage3Ref,
    playerName3Ref,
    playerArtist3Ref,
  } = AppPass();

  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    document.title = "Your Likes - ViziMuz";
  }, []);

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
      <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"} border-b border-[#2F3336]  flex flex-col min-h-screen`}>
      <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"} border-b border-[#2F3336] p-8 pt-8 pb-8 hidden fixed top-0 lg:flex flex-row items-center justify-between w-screen z-[999999999999]`}>
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

        <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"} border-b border-[#2F3336]  flex flex-col lg:flex-row w-[90vw] max-w-[1440px] mx-auto my-0 lg:mt-32 mt-28`}>
          <div className="sidebar-sm lg:hidden">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          </div>

          <div className="sidebar-lg fixed hidden lg:flex flex-col mt-[2em]">
            <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"}flex flex-col justify-between  border border-[#2F3336] mx-4 w-[4vw] rounded-[50px] py-4`}>
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

            <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"}flex flex-col justify-between mt-3  border border-[#2F3336] mx-4 w-[4vw] rounded-[50px] my-4 py-4`}>
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

          <div className="Body w-[90vw] flex flex-col lg:ml-[5vw] lg:pl-8">
            <div className="lg:flex lg:flex-row grid grid-cols-2 mx-auto lg:mx-[0px]">
              <Link to="/collection">
                <button className="lg:w-max w-[35vw] px-3 py-2 rounded-[20px] border border-[#4F524F] text-[#4F524F] mr-2">
                  My Collection
                </button>
              </Link>

              <Link to="/likes">
                <button className="lg:w-max w-[35vw] px-3 py-2 rounded-[20px] text-[#4F524F] bg-[#E7E9EA] text-[#000000]">
                  Likes
                </button>
              </Link>
            </div>

            <div className="flex lg:flex-row flex-col py-4">
              {likes.map((release, index) => {
                return (
                  <>
                    <div
                      key={index}
                      ref={musicBoxToEl}
                      onClick={() => {
                        console.log(imageEl.current);
                        console.log(audioEl.current[index]);
                        console.log(musicNameEl.current[index]);
                        console.log(artistNameEl.current[index]);
                        console.log(likes[currentSongIndex].name);
                        // musicBoxEl.current[0].style.display = 'none'
                        // musicBoxEl.current[0].style.scale = '0'
                        console.log(isPlaying);

                        console.log(playerAudio3Ref.current.currentSrc);
                        console.log(playerImage3Ref.current.outerHTML);
                        console.log(imageEl);
                        console.log(playerName3Ref.current.innerHTML);
                        console.log(playerArtist3Ref.current.innerHTML);
                        isPlaying === true
                          ? setIsPlaying(isPlaying)
                          : setIsPlaying(!isPlaying);
                        playerAudio3Ref.current.src =
                          audioEl.current[index].src;
                        playerImage3Ref.current.src =
                          imageEl.current[index].src;

                        playerName3Ref.current.innerHTML =
                          musicNameEl.current[index].innerHTML;
                        playerArtist3Ref.current.innerHTML =
                          artistNameEl.current[index].innerHTML;
                      }}
                      onFocus={() => {
                        musicNameEl.current[index].style.scale = "1.5";
                      }}
                      className="flex flex-col relative group text-left my-3 mx-auto lg:mr-4 cursor-pointer"
                    >
                      <audio
                        src={release.audio}
                        ref={audioToEl}
                        onTimeUpdate={getCurrDuration}
                        onLoadedData={(e) => {
                          setDuration(e.currentTarget.duration.toFixed(2));
                        }}
                      ></audio>
                      <img
                        className="lg:w-[150px]  group-hover:scale-[1.1] lg:h-[150px] w-[90vw] h-[200px] rounded-[5px]"
                        title={release.img}
                        ref={imageToEl}
                        src={release.img}
                        alt="artist"
                      />

                      <div className="absolute bottom-0 left-0 pl-2 pb-2">
                        <h2
                          ref={musicNameToEl}
                          className=" opacity-[70%] text-[0.9em]"
                        >
                          {release.name}
                        </h2>
                        <h5
                          ref={artistNameToEl}
                          className=" opacity-[70%] text-[.6em]"
                        >
                          {release.artist}
                        </h5>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <footer className="fixed lg:bottom-0 bottom-12 z-[99999] w-screen left-0">
        {canShow ? (
          <Player
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            nextSongIndex={nextSongIndex}
            likes={likes}
          />
        ) : (
          <> </>
        )}
      </footer>
    </>
  );
};

export default Likes;
