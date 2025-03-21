import React, { useEffect, useRef, useState } from "react";
import { collection, documentId, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AppPass } from "../../contexts/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaVolumeUp } from "react-icons/fa";

import Player from "../Players/GeneralPlayer/player";

import logo from "../../imgs/vizimuz_logo.png";

import { Link, useNavigate } from "react-router-dom";
import "../../index.css";

import { MdHomeFilled, MdLibraryMusic, MdSettings } from "react-icons/md/index";
import { RiRadio2Fill, RiLogoutBoxRFill } from "react-icons/ri/index";
import { HiDotsVertical, HiFilm } from "react-icons/hi/index";
import { BsFillPersonFill } from "react-icons/bs/index";
import SearchArtist from "../Home/searchArtist";
import Sidebar from "../Home/sidebar";
import LogoutModal from "../SignInUp/logoutModal";

const options = [
    {
        id: 0,
        img: MdHomeFilled,
        navigate: "/home",
        color: "#E7E9EA",
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

const HipHop = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);


    const [canShow, setCanShow] = useState(false);

    useEffect(() => {
        document.title = "ViziMuz - Newest Jams";
    }, []);


    useEffect(() => {
        const timer = setTimeout(() => setCanShow(true), 3000);
        return () => clearTimeout(timer);
    });

    const navigate = useNavigate();

    const [musicList, setMusicList] = useState([]);
    const [musicInfo, setMusicInfo] = useState([]);
    const i = 0; // Define the index 'i' here

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
                if (i >= 0 && i < musicData.length) {
                    const allMusicList = musicData.map((musicDoc) => musicDoc.musicData);
                    setMusicInfo(allMusicList.flat());

                    console.log(musicInfo);
                    // Add the following code to filter the music list to only include Afrobeat music
                    const afrobeatMusic = musicInfo.filter(
                        (musicObject) => musicObject.category === "Hip Hop"
                    );

                    // Set the state with the list of documents with only the "category" == "Afrobeat"
                    setMusicList(afrobeatMusic);
                }
            } catch (error) {
                console.error("Error fetching music data: ", error);
            }
        };

        fetchData();

    }, [musicInfo]);

    const [albumList, setAlbumList] = useState([]);
    const [albumInfo, setAlbumInfo] = useState([]);
    const [mergedData, setMergedData] = useState([]);
    const j = 0; // Define the index 'i' here

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
                    setAlbumList(albumData[j].albumData);
                    setAlbumInfo(albumData[j]);
                    console.log(albumData[j].albumData);
                    const allAlbumList = albumData.map((albumDoc) => albumDoc.albumData).flat();
                    const allAlbumInfo = allAlbumList.map((album) => album.tracks).flat();
                    setAlbumInfo(allAlbumInfo);


                    const mergedMusic = albumInfo.filter(
                        (item) => item.category === "Hip Hop"
                    );

                    setMergedData(mergedMusic)
                    console.log(albumInfo, allAlbumInfo, mergedMusic)
                }
            } catch (error) {
                console.error("Error fetching album data: ", error);
            }
        };

        fetchData();
    }, [albumInfo]);


    const mergedMusic = [...mergedData, musicList]

    const combinedMusic = mergedMusic.flat();

    useEffect(() => {
        console.log(mergedMusic)
        console.log(combinedMusic)
    }, [])

    const {
        currentSongIndex,
        setCurrentSongIndex,
        isPlaying,
        setIsPlaying,
        setDuration,
        getCurrDuration,
        playerAudioRef,
        playerImageRef,
        playerNameRef,
        playerArtistRef,
        releases,
        nextSongIndex
    } = AppPass();

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

    const audioSignEl = useRef(null);
    audioSignEl.current = [];
    const audioSignToEl = (el) => {
        if (el && !audioSignEl.current.includes(el)) {
            audioSignEl.current.push(el);
        }
    };

    // swipper containers
    const getSlidesPerView = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 992) {
            return 7;
        } else if (screenWidth >= 768) {
            return 4;
        } else {
            return 1.8;
        }
    };

    const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

    const handleResize = () => {
        setSlidesPerView(getSlidesPerView());
    };

    useEffect(() => {
        // Update slidesPerView on window resize
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        console.log("currentSongIndex2:", currentSongIndex);
    }, [currentSongIndex]);

    return (
        <>
            <div className="bg-[#000000] border-b border-[#2F3336] text-white flex flex-col h-max overflow-y-auto overflow-x-hidden">
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

                <div className="bg-[#000000] border-b border-[#2F3336] text-white flex flex-col lg:flex-row max-w-[1440px] mx-auto my-0 lg:mt-32 mt-20">
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

                    <div className="flex flex-col bg-[#000000] border-b border-[#2F3336] min-h-[100vh] lg:w-[90vw] w-[95vw] max-w-[1440px]  lg:px-4 float-right text-white">
                        <div className="flex flex-row w-[95vw] max-w-[1440px] justify-start lg:w-[60vw] mx-auto pt-4 items-baseline">
                            <h1 className="font-black">Hip Hop</h1>
                        </div>
                        <div className="flex flex-row justify-between py-4 pt-2 w-[90%] max-w-[1440px] lg:w-[60vw]">


                            <div className="flex flex-col mb-40">

                                {combinedMusic.map((newMusic, index) => (
                                    <div className="flex flex-row justify-between items-center w-[90vw] max-w-[1440px] lg:w-[60vw]" key={index}>
                                        <div className="flex flex-col">
                                            <>
                                                <div className="flex flex-row items-center relative text-left my-3 space-x-3 cursor-pointer">
                                                    <audio
                                                        src={newMusic.audio}
                                                        ref={audioToEl}
                                                        onTimeUpdate={getCurrDuration}
                                                        onLoadedData={(e) => {
                                                            setDuration(e.currentTarget.duration.toFixed(2));
                                                        }}
                                                    ></audio>
                                                    <div
                                                        key={index}
                                                        ref={musicBoxToEl}
                                                        onClick={() => {
                                                            console.log(imageEl.current);
                                                            console.log(audioEl.current[index]);
                                                            console.log(musicNameEl.current[index]);
                                                            console.log(artistNameEl.current[index]);
                                                            console.log(musicList[currentSongIndex].text);
                                                            // musicBoxEl.current[0].style.display = 'none'
                                                            // musicBoxEl.current[0].style.scale = '0'
                                                            console.log(isPlaying);

                                                            console.log(playerAudioRef.current.currentSrc);
                                                            console.log(playerImageRef.current.outerHTML);
                                                            console.log(imageEl);
                                                            console.log(playerNameRef.current.innerHTML);
                                                            console.log(playerArtistRef.current.innerHTML);
                                                            isPlaying === true
                                                                ? setIsPlaying(isPlaying)
                                                                : setIsPlaying(!isPlaying);
                                                            playerAudioRef.current.src =
                                                                audioEl.current[index].src;
                                                            playerImageRef.current.src =
                                                                imageEl.current[index].src;
                                                            console.log(audioSignEl.current[index]);
                                                            console.log(audioSignEl.current);
                                                            // !audioSignEl.current[index] === true ? audioSignEl.current.style.display = 'none' : audioSignEl.current.style.display = 'block'
                                                            // audioSignEl.current[index].style.display = 'block'
                                                            playerNameRef.current.innerHTML =
                                                                musicNameEl.current[index].innerHTML;
                                                            playerArtistRef.current.innerHTML =
                                                                artistNameEl.current[index].innerHTML;
                                                        }}
                                                    >
                                                        <img
                                                            className="w-[50px] h-[50px] rounded-[5px]"
                                                            title={newMusic.image}
                                                            ref={imageToEl}
                                                            src={newMusic.image}
                                                            alt="artist"
                                                        />
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setCurrentSongIndex(index);
                                                            console.log(
                                                                "currentSongIndex:",
                                                                currentSongIndex,
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        <Link
                                                            to={`/music/${newMusic.artist}/${newMusic.musicName}/${newMusic.id}`}
                                                        >
                                                            <div>
                                                                <h2
                                                                    ref={musicNameToEl}
                                                                    className="text-white text-[1em]"
                                                                >
                                                                    {newMusic.musicName}
                                                                </h2>
                                                                <h5
                                                                    ref={artistNameToEl}
                                                                    className="text-white text-[.6em]"
                                                                >
                                                                    {newMusic.artist}
                                                                </h5>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div
                                                    ref={audioSignToEl}
                                                    className="w-max p-2 bg-[#E7E9EA] text-[#000000] absolute mt-4 mr-4 rounded-[5px] top-0 left-0 hidden"
                                                >
                                                    <FaVolumeUp />
                                                </div>

                                            </>
                                        </div>

                                        <div><HiDotsVertical /></div></div>
                                ))}
                            </div>
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
                        releases={releases}
                    />
                ) : (
                    <> </>
                )}
            </footer>
        </>
    );
};

export default HipHop;
