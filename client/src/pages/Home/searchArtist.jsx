import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import notAvailable from "../../imgs/No-Photo-Available.jpg";
// import { AppPass } from '../contexts/AppContext';

import searchIcon from "../../imgs/search.svg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AppPass } from "../../contexts/AppContext";
import { Link } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useColorTheme } from "../../contexts/colorContext/useColorTheme";

const SearchArtist = () => {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  // const searchArtists = async (e) => {
  //   e.preventDefault();
  //   const { data } = await axios.get(
  //     "https://spotify81.p.rapidapi.com/search",
  //     {
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "6ed6cedd6fmshd8e759bfbb8f31ep15789fjsnb435e620a8a3",
  //         "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
  //       },
  //       params: {
  //         q: searchKey,
  //         type: "multi",
  //         limit: "1",
  //         offset: "0",
  //       },
  //     }
  //   );
  //   console.log(data.artists.items);
  //   setArtists(data.artists.items);
  //   document.title = `ViziMuz Search -  ${searchKey}`;
  // };

  useEffect(() => {
    document.title = `ViziMuz Search -  ${searchKey}`;
  }, []);


  
  const [musicList, setMusicList] = useState([]);
  const [musicInfo, setMusicInfo] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [albumInfo, setAlbumInfo] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const j = 0; // Define the index 'i' here
  const i = 0; // Define the index 'i' here

      const searchArtists = async (e) => {
          e.preventDefault();
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
                      (musicObject) => musicObject.musicName == searchKey || musicObject.artist == searchKey
                  );

                  // Set the state with the list of documents with only the "category" == "Afrobeat"
                  setMusicList(afrobeatMusic);
              }
          } catch (error) {
              console.error("Error fetching music data: ", error);
          }


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
                      (item) => item.musicName == searchKey || item.artist == searchKey
                  );

                  setMergedData(mergedMusic)
                  console.log(albumInfo, allAlbumInfo, mergedMusic)
              }
          } catch (error) {
              console.error("Error fetching album data: ", error);
          }
      };


  const mergedMusic = [...mergedData, musicList]

  const combinedMusic = mergedMusic.flat();

  useEffect(() => {
      console.log(mergedMusic)
      console.log(combinedMusic)
      console.log(searchKey)
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
  
    const { isDark } = useColorTheme();


  const renderArtists = () => {
    return (
      
      <div className={`${isDark ? "bg-black " : "bg-white text-[#0F1419]"} border-[#2F3336] flex flex-col mb-40 fixed h-0 w-[100vw] lg:w-[95vw] max-w-[1440px] mx-auto left-1/2 top-1/2 z-[100000000] mt-24 lg:mt-32`}
        
      style={{ transform: "translate(-50%, -50%)"}}
      >

      {combinedMusic.map((newMusic, index) => (
          <div className="flex flex-row justify-between items-center w-[90vw] max-w-[1440px] " key={index}>
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
                                  isPlaying === true
                                      ? setIsPlaying(isPlaying)
                                      : setIsPlaying(!isPlaying);
                                  playerAudioRef.current.src =
                                      audioEl.current[index].src;
                                  playerImageRef.current.src =
                                      imageEl.current[index].src;
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
    );
  };

  return (
    <>
      <div className={`${isDark ? "bg-black " : "bg-white text-[#0F1419]"} border-[#2F3336] text-white relative`}>
        <div>
          <form
            className="relative lg:w-[30vw] w-[40vw] lg:mx-auto items-center justify-center"
            onSubmit={searchArtists}
          >
            <input
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="search "
              className={`${isDark ? "bg-black " : "bg-white text-[#0F1419]"} bg-[#000000] border-[#2F3336] w-[45vw] lg:w-auto lg:px-20 px-10 py-2 rounded-[50px] lg:border border`}
            />
            <img
              src={searchIcon}
              onClick={searchArtists}
              className="w-[20px] py-2 ml-3 cursor-pointer absolute top-1/2 left-2 z-[1000]"
              style={{ transform: "translate(-50%, -50%)"}}
              alt="search icon"
            />
          </form>
        </div>

        <div className={`${isDark ? "bg-black " : "bg-white text-[#0F1419]"} border-[#2F3336]`}>
          {renderArtists()}
        </div>
      </div>
    </>
  );
};

export default SearchArtist;
