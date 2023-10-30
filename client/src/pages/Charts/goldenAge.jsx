import React, { useEffect, useRef, useState } from "react";
import SearchArtist from "../Home/searchArtist";
import { AppPass } from "../../contexts/AppContext";
import Player from "../Players/GoldenAgePlayer/player";

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

import invincible from "../../imgs/theLostChildren.jpg";
import allEyesOnMe from "../../imgs/allEyesOnMe.webp";
import dangerous from "../../imgs/dangerous.jpg";
import mjHistory from "../../imgs/MJ-HIStory.jpg";
import collection2000 from "../../imgs/collection2000.webp";
import usa4Africa from "../../imgs/USA4Africa.jpg";
import fallingIntoYou from "../../imgs/Falling into You.jpg";
import colours from "../../imgs/colours.jpg";
import pacsLife from "../../imgs/2pac-Pac's_Life.jpg";

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

const golden = [
  {
    id: 0,
    artist: "Michael Jackson",
    img: invincible,
    name: "The Lost Children",
    audio: "The Lost Children.mp3",
    album: "Invincible",
    durration: "3:59"
  },
  {
    id: 1,
    artist: "2Pac",
    img: allEyesOnMe,
    name: "Life Goes On",
    audio: "2Pac - Life Goes On.mp3",
    album: "All Eyez on Me",
    durration: "5:02"
  },
  {
    id: 2,
    artist: "Michael Jackson",
    img: dangerous,
    name: "Dangerous",
    audio: "Michael Jackson - Dangerous (1995) _ Studio Version _.mp3",
    album: "Dangerous",
    durration: "6:57"
  },
  {
    id: 3,
    artist: "Michael Jackson",
    img: mjHistory,
    name: "Earth Song",
    audio: "Michael Jackson - Earth Song.mp3",
    album: "HIStory: Past, Present and Future, Book I",
    durration: "6:46"
  },
  {
    id: 4,
    artist: "Celine Dion",
    img: collection2000,
    name: "Drove all night",
    audio: "Celine Dion-Drove all night.mp3",
    album: "2000 Collection",
    durration: "3:59"
  },
  {
    id: 5,
    artist: "Michael Learns",
    img: colours,
    name: "Sleeping Child",
    audio: "Michael Learns- Sleeping Child.mp3",
    album: "Colours",
    durration: "3:33"
  },
  {
    id: 6,
    artist: "2pac",
    img: pacsLife,
    name: "Pac's life",
    audio: "2pac-Pac's life.mp3",
    album: "Pac's Life",
    durration: "3:37"
  },
  {
    id: 7,
    artist: "Celine Dion",
    img: fallingIntoYou,
    name: "I love you",
    audio: "https://mp3gaga.com/wp-content/uploads/2022/02/Mp3gaga.com-Celine-Dion-I-Love-You.mp3",
    album: "Falling into You",
    durration: "5:30"
  },
  {
    id: 8,
    artist: "Celine Dion",
    img: collection2000,
    name: "In His Touch",
    audio: "https://mp3gaga.com/wp-content/uploads/2022/02/Mp3gaga.com-Celine-Dion-In-His-Touch.mp3",
    album: "2000 Collection",
    durration: "3:56"
  },
  {
    id: 9,
    artist: "Michael Jackson",
    img: usa4Africa,
    name: "We are the world",
    audio: "MICHEAL JACKSON =  USA for Africa {We are the world}.mp3",
    album: "Singles",
    durration: "7:07"
  },
];

const GoldenAge = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const {
    currentSongIndex,
    setCurrentSongIndex,
    nextSongIndex,
    isPlaying,
    setIsPlaying,
    duration,
    setDuration,
    getCurrDuration,
    playerAudio6Ref,
    playerImage6Ref,
    playerName6Ref,
    playerArtist6Ref,
  } = AppPass();

  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    document.title = "Golden Age - ViziMuz";
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
        backgroundImage: "url('mj.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-[#040C25] bg-opacity-[50%] text-white flex flex-col min-h-screen">
      <div className="bg-[#040C25] p-8 pt-8 pb-8 hidden fixed top-0 lg:flex flex-row items-center justify-between w-screen z-[999999999999]">
          <div className="flex flex-row items-center justify-between w-[40vw]">
            <img src={logo} className="w-[35px] h-[35px]" alt="home icon" />

            <SearchArtist />
          </div>
          <button
            onClick={() => navigate("/upload_music")}
            className="w-fit  bg-[#9600ffcc] p-3 rounded-[20px] cursor-pointer"
          >
            Upload Music
          </button>
        </div>

        <div className="bg-inherit text-white flex flex-col lg:flex-row w-[90vw] max-w-[1440px] mx-auto my-0 lg:mt-32 mt-20">
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
              
              <div
                onClick={() => setShowLogoutModal(true)}
                className=""
              >
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
                src="mj.jpg"
                alt="music cover"
                className="lg:w-[250px] lg:h-[250px] lg:mr-4 w-full mx-auto rounded-[20px]"
              />
              <div className="flex flex-col lg:w-[100%] w-[95vw] mx-auto mt-4 lg:mt-[0px]">
                <div className="text-bold text-[1.4em] text-[#829D9D] mb-2">
                  Golden Age of 80s
                </div>
                <div className=" text-[0.8em] mb-1 lg:w-[40vw] w-[90vw]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                  aliquam, purus sit amet luctus venenatis
                </div>
                <div className="text-[0.7em] mb-6">8 songs ~ 41 mins+</div>
                <div className="flex items-center flex-row">
                  <button
                    className="rounded-[20px] w-max p-2 bg-[#262A2D] text-[.7em] lg:text-[1em] flex flex-row mr-3 items-center"
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                    }}
                  >
                    <BsFillPlayCircleFill className="text-[#9600ffcc] w-[1em] mr-2" />{" "}
                    Play all
                  </button>
                  <button className="rounded-[20px] w-max p-2 bg-[#262A2D] text-[.7em] lg:text-[1em] flex flex-row mr-3 items-center">
                    <MdCollectionsBookmark className="text-[#9600ffcc] w-[1em] mr-2" />{" "}
                    Add to collection
                  </button>
                  <button className="rounded-[20px] w-max p-2 bg-[#262A2D] text-[.7em] lg:text-[1em] flex flex-row mr-3 items-center">
                    <BsHeartFill className="text-[#E5524A] w-[1em]" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-[90%] mb-[8em]">
              {golden.map((release, index) => {
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
                        console.log(golden[currentSongIndex].name);
                        // musicBoxEl.current[0].style.display = 'none'
                        // musicBoxEl.current[0].style.scale = '0'
                        console.log(isPlaying);
                        console.log(playerAudio6Ref.current.currentSrc);
                        console.log(playerImage6Ref.current.outerHTML);
                        console.log(imageEl);
                        console.log(playerName6Ref.current.innerHTML);
                        console.log(playerArtist6Ref.current.innerHTML);
                        isPlaying === true
                          ? setIsPlaying(isPlaying)
                          : setIsPlaying(!isPlaying);
                        playerAudio6Ref.current.src =
                          audioEl.current[index].src;
                        playerImage6Ref.current.src =
                          imageEl.current[index].src;

                        playerName6Ref.current.innerHTML =
                          musicNameEl.current[index].innerHTML;
                        playerArtist6Ref.current.innerHTML = "";
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
                           {isOpen[release.name] ? <MdClose  className="text-[#9600ffcc] lg:w-[100%] z-[100]" /> : <BsThreeDotsVertical className="text-[#9600ffcc] lg:w-[100%] z-[100]" />}
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
            golden={golden}
          />
        ) : (
          <> </>
        )}
      </footer>
    </div>
  );
};

export default GoldenAge;
