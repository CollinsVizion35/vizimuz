import React, { useEffect, useState } from "react";
import PlayerControls from "./playerControls";
import PlayerDetails from "./playerDetails";
import VolumeControls from "./volumeControls";
import { AppPass } from '../../contexts/AppContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useColorTheme } from "../../contexts/colorContext/useColorTheme";

function Player() {
  const [musicList, setMusicList] = useState([]);
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

        console.log(musicList);
      }
    } catch (error) {
      console.error("Error fetching music data: ", error);
    }
  };

  fetchData();
}, []);
  const {
    currentSongIndex,
    setCurrentSongIndex,
    isPlaying,
    setIsPlaying,
    setDuration,
    setCurrentTime,
    setPercentage,
    playerAudioRef,
    repeat,
    shuffle,
  } = AppPass();

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
      playerAudioRef.current.play();
    }, 500);
    } else {
      
        playerAudioRef.current.pause();
    }
  });

  

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));

    console.log(percent);

    if (percent > 99.5) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;

        if (temp > musicList.length - 1) {
          temp = 0;
        }

        return temp;
      });
    }

    

    if (!shuffle && percent > 99.5) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp = Math.floor(Math.random() * musicList.length - 1);

        return temp;
      });
    }

    if (!repeat  && percent > 99.5) {
      setCurrentSongIndex(() => {
        const audio = playerAudioRef.current;
        audio.currentTime = 0;
        setPercentage(0);
        let temp = currentSongIndex;

        return temp;
      });
    }

    
    if (!repeat && !shuffle && percent > 99.5) {
      setCurrentSongIndex(() => {
        const audio = playerAudioRef.current;
        audio.currentTime = 0;
        setPercentage(0);
        let temp = currentSongIndex;

        return temp;
      });
    }

  };

  const SkipSong = (fowards = true) => {
    if (fowards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;

        if (temp > musicList.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else if (!fowards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = musicList.length - 1;
        }

        return temp;
      });
    }

    if (!shuffle && fowards) {
      setCurrentSongIndex(() => {
        let temp = Math.floor(Math.random() * musicList.length);
    
        // Ensure temp is a valid index
        if (temp < 0) {
          temp = Math.floor(Math.random() * musicList.length);  // Choose a random index
        }
    
        return temp;
      });
    } 

    
    if (!repeat) {
      setCurrentSongIndex(() => {
        const audio = playerAudioRef.current;
        audio.currentTime = 0;
        setPercentage(0);
        let temp = currentSongIndex;

        return temp;
      });
    }
    

  };
    
  const { isDark } = useColorTheme();

  return (
    <>
    {musicList ? (
    <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"} flex flex-col z-[999999999] w-[90vw] max-w-[1440px] mx-auto my-0 border-b border-[#2F3336] bg-opacity-[95%] mt-3 `}>
      <audio
  src={musicList[currentSongIndex]?.audio}  // Use optional chaining
  ref={playerAudioRef}
  onTimeUpdate={getCurrDuration}
  onLoadedData={(e) => {
    setDuration(e.currentTarget.duration.toFixed(2));
  }}
></audio>

      <div className="flex flex-row items-center justify-between my-4">
        {/* <PlayerDetails song={musicList[currentSongIndex]} className="w-[50%]" /> */}
        <PlayerControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          SkipSong={SkipSong}
          className="w-[100%]"
        />
        <VolumeControls />
      </div>
    </div>
    ) : (
      <p>Loading music details...</p>
    )}
    </>
  );
}

export default Player;
