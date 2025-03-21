import React, { useEffect, useRef, useState } from "react";
import SearchArtist from "../Home/searchArtist";
import { AppPass } from "../../contexts/AppContext";
import Player from "../Players/TomTunesPlayer/player";

import logo from "../../imgs/vizimuz_logo.png";
import {
  BsThreeDotsVertical,
  BsHeart,
  BsFillPlayCircleFill,
  BsHeartFill,
} from "react-icons/bs/index";
import { MdClose, MdCollectionsBookmark, MdSettings } from "react-icons/md/index";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Home/sidebar";
import "../../index.css";
import LogoutModal from "../SignInUp/logoutModal";

// import bgImage from '../../imgs/tomorrowsTunes.jpg'
import badGuy from "../../imgs/badGuy.webp";
import homicide from "../../imgs/homicide.jpg";
import theBox from "../../imgs/theBox.jpg";
import gkmc from "../../imgs/gkmcLamar.jpg";
import trollz from "../../imgs/trollz.png";
import xxivk from "../../imgs/Bruno_Mars_-_24K_Magic_(Official_Album_Cover).png";
import royalty from "../../imgs/Royalty_Chris_Brown.jpg";
import JonTHC from "../../imgs/jonBellionTHC.jpg";
import adhd from "../../imgs/adhdJoyner.jpg";
import astroworld from "../../imgs/Travis Scott_Astroworld.webp";

import { MdHomeFilled, MdLibraryMusic } from "react-icons/md/index";
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

const tTunes = [
  {
    id: 0,
    artist: "Billie Ellish ft. Justin Bieber",
    img: badGuy,
    name: "Bad Guy (Remix)",
    audio:
      "[Waploaded]_Billie_Eilish_-_Bad_Guy_Remix_feat_Justin_Bieber-1563035495.mp3",
    album: "Singles",
    durration: "3:15",
  },
  {
    id: 1,
    artist: "Roddy Ricch",
    img: theBox,
    name: "The Box",
    audio: "02 The Box - (SongsLover.com).mp3",
    album: "Please Excuse Me for Being Antisocial",
    durration: "3:33",
  },
  {
    id: 2,
    artist: "Logic ft. Eminem",
    img: homicide,
    name: "Homicide",
    audio: "02. Homicide (feat. Eminem) - (SongsLover.com).mp3",
    album: "Confessions of a Dangerous Mind",
    durration: "4:06",
  },
  {
    id: 3,
    artist: "Kendrick Lamar",
    img: gkmc,
    name: "Backstreet Freestyle",
    audio: "03 - Backstreet Freestyle.mp3",
    album: "good kid, m.A.A.d city",
    durration: "3:33",
  },
  {
    id: 4,
    artist: "6ix9ine ft. Nicki Minaj",
    img: trollz,
    name: "Trollz",
    audio: "6ix9ine & Nicki Minaj - TROLLZ (NetNaija.com).mp3",
    album: "TattleTales",
    durration: "3:24",
  },
  {
    id: 5,
    artist: "Bruno Mars",
    img: xxivk,
    name: "24K Magic",
    audio: "24K Magic - Bruno Mars (Lyrics).mp3",
    album: "XXIVK Magic",
    durration: "3:46",
  },
  {
    id: 6,
    artist: "Chris Brown",
    img: royalty,
    name: "Zero",
    audio: "Chris Brown - Zero.mp3",
    album: "Royalty",
    durration: "3:38",
  },
  {
    id: 7,
    artist: "Jon Bellion",
    img: JonTHC,
    name: "iRobot",
    audio: "Jon%20Bellion%20-%20iRobot%20(The%20Human%20Condition)-2.mp3",
    album: "The Human Condition",
    durration: "3:30",
  },
  {
    id: 8,
    artist: "Joyner Lucas ft. Logic",
    img: adhd,
    name: "Isis",
    audio: "Joyner Lucas - Isis (feat. Logic) - (SongsLover.com).mp3",
    album: "ADHD",
    durration: "3:57",
  },
  {
    id: 9,
    artist: "Travis Scott ft. Drake",
    img: astroworld,
    name: "Sicko Mode",
    audio: "Travis-Scott-ft-Drake-Sicko-Mode.mp3",
    album: "Astroworld",
    durration: "5:15",
  },
];

const Tomorrow = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const {
    currentSongIndex,
    setCurrentSongIndex,
    nextSongIndex,
    isPlaying,
    setIsPlaying,
    setDuration,
    getCurrDuration,
    playerAudio5Ref,
    playerImage5Ref,
    playerName5Ref,
    playerArtist5Ref,
  } = AppPass();

  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    document.title = "Tomorrow's Tunes";
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

  // const artistNameEl = useRef(null);
  //      artistNameEl.current = [];
  //          const artistNameToEl = (el) => {
  //          if (el && !artistNameEl.current.includes(el)) {
  //              artistNameEl.current.push(el);
  //          }
  //          };

  const musicBoxEl = useRef(null);
  musicBoxEl.current = [];
  const musicBoxToEl = (el) => {
    if (el && !musicBoxEl.current.includes(el)) {
      musicBoxEl.current.push(el);
    }
  };

  const downloadEl = useRef(null);
  downloadEl.current = [];
  const downloadToEl = (el) => {
    if (el && !downloadEl.current.includes(el)) {
      downloadEl.current.push(el);
    }
  };

  const [isOpen, setIsOpen] = useState({});

  const toggleOpen = (name) => {
    setIsOpen({
      ...isOpen,
      [name]: !isOpen[name],
    });
  };

  
  const navigate = useNavigate();

  return (
    <div
      className="bg-opacity-[0%] overflow-x-hidden"
      style={{
        backgroundImage: "url('tomorrowTunes.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-[#000000] border-b border-[#2F3336] bg-opacity-[50%] text-white flex flex-col min-h-screen">
      <div className="bg-[#000000] border-b border-[#2F3336] p-8 pt-8 pb-8 hidden fixed top-0 lg:flex flex-row items-center justify-between w-screen z-[999999999999]">
          <div className="flex flex-row items-center justify-between w-[40vw]">
            <img src={logo} className="w-[35px] h-[35px]" alt="home icon" />

            <SearchArtist />
          </div>
          <button
            onClick={() => navigate("/upload_music")}
            className="w-fit  bg-[#E7E9EA] text-[#000000] p-3 rounded-[20px] cursor-pointer"
          >
            Upload Music
          </button>
        </div>

        <div className="bg-inherit text-white flex flex-col lg:flex-row w-[90vw] max-w-[1440px] mx-auto my-0 lg:mt-32 mt-20">
          <div className="sidebar-sm lg:hidden">
            <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          </div>

          <div className="sidebar-lg fixed hidden lg:flex flex-col mt-[2em]">
            <div className="flex flex-col justify-between bg-[#000000] border border-[#2F3336] mx-4 w-[4vw] rounded-[50px] py-4">
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

            <div className="flex flex-col justify-between mt-3 bg-[#000000] border border-[#2F3336] mx-4 w-[4vw] rounded-[50px] my-4 py-4">
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

          <div className="goldenAge flex flex-col lg:w-full w-[90vw] mx-auto lg:ml-[5vw] lg:pl-8">
            <div className="flex lg:flex-row flex-col mb-8 items-end items-left">
              <img
                src="tomorrowTunes.svg"
                alt="music cover"
                className="lg:w-[250px] lg:h-[250px] lg:mr-4 w-full mx-auto rounded-[20px]"
              />
              <div className="flex flex-col lg:w-[100%] w-[95vw] mx-auto mt-4 lg:mt-[0px]">
                <div className="text-bold text-[1.4em] text-[#829D9D] mb-2">
                  Tomorrow's Tunes
                </div>
                <div className=" text-[0.8em] mb-1 lg:w-[40vw] w-[90vw]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                  aliquam, purus sit amet luctus venenatis
                </div>
                <div className="text-[0.7em] mb-6">10 songs ~ 37 mins+</div>
                <div className="flex items-center flex-row">
                  <button
                    className="rounded-[20px] w-max p-2 bg-[#262A2D] text-[.7em] lg:text-[1em] flex flex-row mr-3 items-center"
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                    }}
                  >
                    <BsFillPlayCircleFill className="text-[#E7E9EA] w-[1em] mr-2" />{" "}
                    Play all
                  </button>
                  <button className="rounded-[20px] w-max p-2 bg-[#262A2D] text-[.7em] lg:text-[1em] flex flex-row mr-3 items-center">
                    <MdCollectionsBookmark className="text-[#E7E9EA] w-[1em] mr-2" />{" "}
                    Add to collection
                  </button>
                  <button className="rounded-[20px] w-max p-2 bg-[#262A2D] text-[.7em] lg:text-[1em] flex flex-row mr-3 items-center">
                    <BsHeartFill className="text-[#E5524A] w-[1em]" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-[90%] mb-[8em]">
              {tTunes.map((release, index) => {
                return (
                  <>
                    <div
                      key={index}
                      ref={musicBoxToEl}
                      onClick={() => {
                        console.log(imageEl.current);
                        console.log(audioEl.current[index]);
                        console.log(musicNameEl.current[index]);
                        // console.log(artistNameEl.current[index])
                        console.log(tTunes[currentSongIndex].name);
                        // musicBoxEl.current[0].style.display = 'none'
                        // musicBoxEl.current[0].style.scale = '0'
                        console.log(isPlaying);

                        console.log(playerAudio5Ref.current.currentSrc);
                        console.log(playerImage5Ref.current.outerHTML);
                        console.log(imageEl);
                        console.log(playerName5Ref.current.innerHTML);
                        console.log(playerArtist5Ref.current.innerHTML);
                        isPlaying === true
                          ? setIsPlaying(isPlaying)
                          : setIsPlaying(!isPlaying);
                        playerAudio5Ref.current.src =
                          audioEl.current[index].src;
                        playerImage5Ref.current.src =
                          imageEl.current[index].src;

                        playerName5Ref.current.innerHTML =
                          musicNameEl.current[index].innerHTML;
                        playerArtist5Ref.current.innerHTML = "";
                      }}
                      className="flex items-center flex-row justify-evenly rounded-[20px] relative bg-opacity-[50%] bg-[#262A2D] p-2 mx-auto mb-4 cursor-pointer"
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
                        className="w-[50px] h-[50px] mr-4  rounded-[10px]"
                        title={release.img}
                        ref={imageToEl}
                        src={release.img}
                        alt="artist"
                      />
                      <BsHeart className="w-[7%] lg:block hidden" />
                      <div className="lg:w-[60%] w-[80%] flex flex-col text-left lg:flex-row lg:text-center">
                        <h2
                          ref={musicNameToEl}
                          className="lg:w-[50%] text-left lg:text-center text-white text-[.6em] md:text-[.7em] opacity-[70%]"
                        >
                          {release.name} - {release.artist}
                        </h2>
                        <h2 className="lg:w-[50%] text-left lg:text-center text-white text-[.6em] md:text-[.7em] opacity-[70%]">
                          {release.album}
                        </h2>
                      </div>
                      <div className="lg:w-[21%] w-[10%] flex flex-col lg:flex-row text-center items-center">
                        <h2 className="lg:w-[50%] text-center text-white text-[.6em] md:text-[.7em] opacity-[70%]">
                          {release.durration}
                        </h2>
                        <div key={release.name}>
                          <button
                            onClick={() => {
                              toggleOpen(release.name);
                            }}
                          >
                            {isOpen[release.name] ? (
                              <MdClose className="text-[#E7E9EA] lg:w-[100%] z-[100]" />
                            ) : (
                              <BsThreeDotsVertical className="text-[#E7E9EA] lg:w-[100%] z-[100]" />
                            )}
                          </button>

                          {isOpen[release.name] && (
                            <button
                              ref={downloadToEl}
                              onClick={() => {
                                fetch(release.audio).then((response) => {
                                  response.blob().then((blob) => {
                                    // Creating new object of PDF file
                                    const fileURL =
                                      window.URL.createObjectURL(blob);
                                    // Setting various property values
                                    let alink = document.createElement("a");
                                    alink.href = fileURL;
                                    alink.download = release.audio;
                                    alink.click();
                                  });
                                });
                              }}
                              className={
                                "block p-2 rounded-[10px] top-0 right-0 lg:mt-4 mt-12 lg:mr-4 mr-3 w-max absolute bg-[#fff] text-[#000] lg:text-[.8em] text-[.5em]"
                              }
                            >
                              Download
                            </button>
                          )}
                        </div>
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
            tTunes={tTunes}
          />
        ) : (
          <> </>
        )}
      </footer>
    </div>
  );
};

export default Tomorrow;
