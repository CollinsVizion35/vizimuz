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
  
          console.log(musicList);
        }
      } catch (error) {
        console.error("Error fetching music data: ", error);
      }
    };
  
    fetchData();
  }, []);
  
  
  const [albumList, setAlbumList] = useState([]);
  const [albumInfo, setAlbumInfo] = useState([]);
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
        // if (i >= 0 && i < albumData.length) {
        //   setAlbumList(albumData[j].albumData);
        //   setAlbumInfo(albumData[j]);
        //   console.log(albumData[j].albumData);
        // }
  
        if (j >= 0 && j < albumData.length) {
          setAlbumList(albumData[j].albumData);
          const allAlbumList = albumData.map((albumDoc) => albumDoc.albumData);
          setAlbumList(allAlbumList.flat());
            
          const allAlbumInfo = albumData.map((albumDoc) => albumDoc);
          setAlbumInfo(allAlbumInfo.flat());
  
          console.log(albumList);
        }
      } catch (error) {
        console.error("Error fetching album data: ", error);
      }
    };
  
    fetchData();
  }, []);
  
  const [combinedMusic, setCombinedMusic] = useState([]);

  useEffect(() => {
    const mergedData = albumList.map(item => {
      return item.tracks;
    });

    const mergedMusic = [...mergedData, musicList];

    const combinedMusicData = mergedMusic.flat();
    
    setCombinedMusic(combinedMusicData);
    
    console.log(mergedMusic)
  }, [albumList, musicList]);

  useEffect(() => {
    // console.log(mergedMusic)
    console.log(combinedMusic)
  }, [])
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
  //   if (!combinedMusic) return;  // Ensure combinedMusic is available
  
  //     const nextMusicId = combinedMusic[currentSongIndex]?.id;
  //     const nextMusicArtist = combinedMusic[currentSongIndex]?.artist;
  //     const nextMusicText = combinedMusic[currentSongIndex]?.text;

  //     setTimeout(() => {
  //       navigate(`/music/${nextMusicArtist}/${nextMusicText}/${nextMusicId}`);
        
  //     }, 2000);

  
    
  // };
  
  useEffect(() => {
    if (!combinedMusic || !musicInfo) return; 
  
      const nextMusicId = musicInfo.id;
      const nextMusicArtist = combinedMusic[currentSongIndex]?.artist;
      const nextMusicText = combinedMusic[currentSongIndex]?.musicName;

      setTimeout(() => {
        navigate(`/music/${nextMusicArtist}/${nextMusicText}/${nextMusicId}`);
        
      }, 500);

  
  }, [currentSongIndex, combinedMusic, navigate, musicInfo]);

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
            console.log(combinedMusic.length);
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
