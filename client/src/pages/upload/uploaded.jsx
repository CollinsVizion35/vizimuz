import React, { useEffect, useRef, useState } from "react";
import { collection, documentId, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AppPass } from "../../contexts/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FaVolumeUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";

const NewMusic = () => {
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
        setMusicList(musicData[i].musicData);
        const allMusicList = musicData.map((musicDoc) => musicDoc.musicData);
        setMusicList(allMusicList.flat());
          
        const allMusicInfo = musicData.map((musicDoc) => musicDoc);
        setMusicInfo(allMusicInfo.flat());

        // console.log(musicList);
      }
    } catch (error) {
      console.error("Error fetching music data: ", error);
    }
  };

  fetchData();
}, [musicList]);



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
                // setAlbumList(albumData[j].albumData);
                // setAlbumInfo(albumData[j]);
                // console.log(albumData[j].albumData);
                const allAlbumList = albumData.map((albumDoc) => albumDoc.albumData).flat();
                const allAlbumInfo = allAlbumList.map((album) => album.tracks).flat()
                setAlbumInfo(allAlbumList);


                const mergedMusic = albumInfo.map((item) => {
                    return (
                        item.tracks

                    );
                });

                setMergedData(mergedMusic)
                // console.log(albumInfo, allAlbumInfo, mergedMusic)
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
      <div className="flex flex-col bg-[#0F1732] lg:w-[90vw] w-[95vw] max-w-[1440px]  lg:px-4 float-right text-white mb-10">
      <div className="flex flex-row justify-between w-[100%] lg:w-[90%] pt-4 items-baseline">
        <h1 className="font-black">New jams</h1>
        <Link to="/newest_jams">
        <h1 className=" opacity-70 text-[0.8em] cursor-pointer">View more</h1></Link>
        </div>
        <div className="flex flex-row justify-between py-4 pt-2 w-[90%]">
          <Swiper
            spaceBetween={10}
            slidesPerView={slidesPerView}
            className="hidden lg:block"
          >
            {combinedMusic.map((newMusic, index) => (
                <SwiperSlide className="hidden lg:block" key={index}>
                  <>
                    <div className="flex flex-col relative text-left my-3 mx-auto cursor-pointer">
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
                          console.log(musicList[currentSongIndex].musicName);
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
                          className="w-[200px] h-[150px] rounded-[5px] mb-2"
                          title={newMusic.image}
                          ref={imageToEl}
                          src={newMusic.image}
                          alt="artist"
                        />
                      </div>
                      <div
                        onClick={() => {
                          setCurrentSongIndex(index);
                          console.log("currentSongIndex:", currentSongIndex);
                        }}
                      >
                        <Link to={`/music/${newMusic.artist}/${newMusic.musicName}/${newMusic.id}`}>
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
                      className="w-max p-2 bg-[#9600ffcc] absolute mt-4 mr-4 rounded-[5px] top-0 left-0 hidden"
                    >
                      <FaVolumeUp />
                    </div>
                  </>
                </SwiperSlide>
              ))}
          </Swiper>

          
          <div className="flex flex-col lg:hidden">

{combinedMusic.slice(0, 5).map((newMusic, index) => (
    <div className="flex flex-row justify-between items-center w-[90vw]"  key={index}>
    <div className="flex flex-col lg:hidden">
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
                className="w-max p-2 bg-[#9600ffcc] absolute mt-4 mr-4 rounded-[5px] top-0 left-0 hidden"
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
    </>
  );
};

export default NewMusic;
