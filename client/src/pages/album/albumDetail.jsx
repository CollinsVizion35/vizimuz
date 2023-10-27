import React, { useEffect, useRef, useState } from "react";
import SearchArtist from "../Home/searchArtist";
import { AppPass } from "../../contexts/AppContext";
import Player from "../Players/GoldenAgePlayer/player";

import logo from "../../imgs/logo.svg";
import {
  BsThreeDotsVertical,
  BsHeart,
  BsFillPlayCircleFill,
  BsHeartFill,
} from "react-icons/bs/index";
import {
  MdClose,
  MdCollectionsBookmark,
  MdSettings,
} from "react-icons/md/index";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Home/sidebar";
import "../../index.css";
import LogoutModal from "../SignInUp/logoutModal";

import { MdHomeFilled, MdLibraryMusic } from "react-icons/md/index";
import { RiRadio2Fill, RiLogoutBoxRFill } from "react-icons/ri/index";
import { HiFilm } from "react-icons/hi/index";
import { BsFillPersonFill } from "react-icons/bs/index";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

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

const AlbumDetail = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const {
    currentAlbumIndex,
    setcurrentAlbumIndex,
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

  const [albumList, setAlbumList] = useState([]);
  const [albumInfo, setAlbumInfo] = useState([]);
  const i = 0; // Define the index 'i' here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumCollectionRef = collection(db, "album");
        const querySnapshot = await getDocs(albumCollectionRef);

        const albumData = [];
        querySnapshot.forEach((doc) => {
          albumData.push({ id: doc.id, ...doc.data() });
        });

        // Check if 'i' is within the valid range before setting the state
        if (i >= 0 && i < albumData.length) {
          setAlbumList(albumData[i].albumData);
          setAlbumInfo(albumData[i]);
          console.log(albumData[i].albumData);
        }
      } catch (error) {
        console.error("Error fetching album data: ", error);
      }
    };

    fetchData();
  }, []);

  const [musicList, setMusicList] = useState([]);
  const j = 0; // Define the index 'i' here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const musicCollectionRef = collection(db, "music");
        const querySnapshot = await getDocs(musicCollectionRef);

        const musicData = [];
        querySnapshot.forEach((doc) => {
          musicData.push({ id: doc.id, ...doc.data() });
        });

        // Check if 'i' is within the valid range before setting the state
        if (j >= 0 && j < musicData.length) {
          setMusicList(musicData[j].musicData);
        }
      } catch (error) {
        console.error("Error fetching music data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.title = "Golden Age - ViziMuz";
    console.log(currentAlbumIndex);
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
    <>
    {albumInfo ? (
      albumList ? (
        <div
          className="bg-opacity-[0%] overflow-x-hidden"
          style={{
            backgroundImage: `url(${albumList[currentAlbumIndex]?.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-[#1A1E1F] bg-opacity-[50%] text-white flex flex-col min-h-screen">
            <div className="bg-[#1A1E1F] p-8 pt-8 pb-8 hidden fixed top-0 lg:flex flex-row items-center justify-between w-screen z-[999999999999]">
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

            <div className="bg-inherit text-white flex flex-col lg:flex-row w-[90vw] max-w-[1440px] mx-auto my-0 lg:mt-32 mt-20">
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

              <div className="goldenAge flex flex-col lg:w-full h-screen w-[90vw] mx-auto lg:ml-[5vw] lg:pl-8 pb-16 lg:pb-12">
                <div className="flex lg:flex-row flex-col mb-8 items-end items-left p-2 pb-4">
                  <img
                    src={albumList[currentAlbumIndex]?.image}
                    alt="music cover"
                    className="lg:w-[250px] lg:h-[250px] lg:mr-4 mx-auto w-[50vw] h-[50vw] rounded-[20px]"
                  />
                  <div className="flex flex-col lg:w-[100%] w-[95vw] mx-auto mt-4 lg:mt-[0px]">
                    <div className="text-bold text-[1.4em] text-[#829D9D] mb-2">
                      {albumList[currentAlbumIndex]?.name}
                    </div>
                    <div className=" text-[0.8em] mb-1 lg:w-[40vw] w-[90vw]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                      aliquam, purus sit amet luctus venenatis
                    </div>
                    <div className="text-[0.7em] mb-6">
                      {albumList[currentAlbumIndex]?.tracks.length} songs
                    </div>
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

                {albumList[currentAlbumIndex]?.tracks.map((track, index) => (
                  <>
                    <div className="w-[90%]">
                      <>
                        <div
                          key={index}
                          ref={musicBoxToEl}
                          onClick={() => {
                            isPlaying === true
                              ? setIsPlaying(isPlaying)
                              : setIsPlaying(!isPlaying);
                            playerAudio6Ref.current.src =
                              audioEl.current[index].src;
                            playerImage6Ref.current.src =
                              imageEl.current[index].src;
                              console.log(playerAudio6Ref.current.src);

                            playerName6Ref.current.innerHTML =
                              musicNameEl.current[index].innerHTML;
                            playerArtist6Ref.current.innerHTML = "";
                          }}
                          className="flex items-center flex-row justify-evenly rounded-[20px] relative bg-opacity-[50%] bg-[#262A2D] p-2 mx-auto mb-4 cursor-pointer"
                        >
                          <audio
                            src={track.audio}
                            ref={audioToEl}
                            onTimeUpdate={getCurrDuration}
                            onLoadedData={(e) => {
                              setDuration(e.currentTarget.duration.toFixed(2));
                            }}
                          ></audio>
                          <img
                            className="w-[50px] h-[50px] mr-4  rounded-[10px]"
                            title={track.image}
                            ref={imageToEl}
                            src={track.image}
                            alt="artist"
                          />
                          <BsHeart className="w-[7%] lg:block hidden" />
                          <div className="lg:w-[60%] w-[80%] flex flex-col text-left lg:flex-row lg:text-center">
                          <div
                        onClick={() => {
                          setCurrentSongIndex(index);
                          console.log(
                            "currentSongIndex:",
                            currentSongIndex,
                            index
                          );
                        }}
                      ><Link
                                  to={`/Album_music/${track.artist}/${track.musicName}/${albumInfo.id}`}
                                >
                                  <h2
                                    ref={musicNameToEl}
                                    className="lg:w-[50%] text-left lg:text-center text-white text-[.6em] md:text-[.7em] opacity-[70%]"
                                  >
                                    {track.musicName} - {track.artist}
                                  </h2>
                                </Link></div>
                            <h2 className="lg:w-[50%] text-left lg:text-center text-white text-[.6em] md:text-[.7em] opacity-[70%]">
                              {albumList[currentAlbumIndex]?.album}
                            </h2>
                          </div>
                          <div className="lg:w-[21%] w-[10%] flex flex-col lg:flex-row text-center items-center">
                            <h2 className="lg:w-[50%] text-center text-white text-[.6em] md:text-[.7em] opacity-[70%]">
                              {track.category}
                            </h2>

                            <div key={track.musicName}>
                              <button
                                onClick={() => {
                                  toggleOpen(track.musicName);
                                }}
                              >
                                {isOpen[track.musicName] ? (
                                  <MdClose className="text-[#9600ffcc] lg:w-[100%] z-[100]" />
                                ) : (
                                  <BsThreeDotsVertical className="text-[#9600ffcc] lg:w-[100%] z-[100]" />
                                )}
                              </button>

                              {isOpen[track.musicName] && (
                                <button
                                  ref={downloadToEl}
                                  onClick={() => {
                                    fetch(track.audio).then((response) => {
                                      response.blob().then((blob) => {
                                        // Creating new object of PDF file
                                        const fileURL =
                                          window.URL.createObjectURL(blob);
                                        // Setting various property values
                                        let alink = document.createElement("a");
                                        alink.href = fileURL;
                                        alink.download = track.audio;
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
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          <footer className="fixed lg:bottom-0 bottom-12 z-[99999] w-screen left-0">
            {canShow ? (
              <Player
                currentSongIndex={currentSongIndex}
                setcurrentSongIndex={setCurrentSongIndex}
                nextSongIndex={nextSongIndex}
                albumList={albumList}
              />
            ) : (
              <> </>
            )}
          </footer>
        </div>
    ) : (
      <div>Loading...</div>
    )
  ) : null
}
    </>
  );
};

export default AlbumDetail;
