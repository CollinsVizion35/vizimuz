import React, { useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa/index";
import { BsShuffle } from "react-icons/bs/index";
import { TbRepeatOnce } from "react-icons/tb/index";
import Slider from "./slider";
import { AppPass } from '../../contexts/AppContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from 'react-router-dom';

function PlayerControls(props) {

  
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
  const {
    currentSongIndex,
    setCurrentSongIndex,
    percentage,
    setPercentage,
    playerAudioRef,
    repeat,
    setRepeat,
    shuffle,
    setShuffle,
  } = AppPass();

  const onChange = (e) => {
    const audio = playerAudioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const navigate = useNavigate();
  const { id } = useParams();

  // const handleNextButtonClick = () => {
  //   if (!albumList) return;  // Ensure albumList is available
  
  //     const nextMusicId = albumList[currentSongIndex]?.id;
  //     const nextMusicArtist = albumList[currentSongIndex]?.artist;
  //     const nextMusicText = albumList[currentSongIndex]?.text;

  //     setTimeout(() => {
  //       navigate(`/music/${nextMusicArtist}/${nextMusicText}/${nextMusicId}`);
        
  //     }, 2000);

  
    
  // };
  
  useEffect(() => {
    if (!albumList || !albumInfo) return; 
  
      const nextMusicId = albumInfo.id;
      const nextMusicArtist = albumList[currentSongIndex]?.artist;
      const nextMusicText = albumList[currentSongIndex]?.tracks.musicName;

      console.log(nextMusicId)

      setTimeout(() => {
        navigate(`/Album_music/${nextMusicArtist}/${nextMusicText}/${nextMusicId}`);
        
      }, 500);

  
    console.log('currentSongIndex2:', currentSongIndex);
  }, [currentSongIndex, albumList, navigate, albumInfo]);

  return (
    <div className="flex flex-col items-center w-[90vw] max-w-[1440px] mx-auto my-0 mb-5">
      <div className="flex flex-row items-center w-[100vw] justify-evenly  mb-12">
        <button
          className={
            shuffle ? "block" : "block text-[#9600ffcc]"
          }
          onClick={() => {
            setShuffle(!shuffle);
            console.log(shuffle);
          }}
        >
          <BsShuffle />
        </button>
        <button
          className="block"
          onClick={() => props.SkipSong(false)}
        >
          <FaStepBackward />
        </button>
        <button
          className="p-3 bg-[#9600ffcc] rounded-[50%]"
          onClick={() => props.setIsPlaying(!props.isPlaying)}
        >
          {props.isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={() => {props.SkipSong(); }} >
          <FaStepForward />
        </button>
        <button
          className={
            repeat ? "block" : "block text-[#9600ffcc]"
          }
          onClick={() => {
            setRepeat(!repeat);
            console.log(repeat);
            console.log(albumList.length);
          }}
        >
          <TbRepeatOnce />
        </button>
      </div>

      <div>
        <Slider percentage={percentage} onChange={onChange} />
      </div>
    </div>
  );
}

export default PlayerControls;
