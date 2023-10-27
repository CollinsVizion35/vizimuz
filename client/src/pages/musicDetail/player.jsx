import React, { useEffect, useState } from "react";
import PlayerControls from "./playerControls";
import PlayerDetails from "./playerDetails";
import VolumeControls from "./volumeControls";
import { AppPass } from '../../contexts/AppContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

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
        if (i >= 0 && i < albumData.length) {
          setAlbumList(albumData[j].albumData);
          setAlbumInfo(albumData[j]);
          console.log(albumData[j].albumData);
        }
      } catch (error) {
        console.error("Error fetching album data: ", error);
      }
    };
  
    fetchData();
  }, []);
  
  const mergedData = albumList.map((item) => {
    return (
      item.tracks
      
    );
  });
  
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

        if (temp > combinedMusic.length - 1) {
          temp = 0;
        }

        return temp;
      });
    }

    

    if (!shuffle && percent > 99.5) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp = Math.floor(Math.random() * combinedMusic.length - 1);

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

        if (temp > combinedMusic.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else if (!fowards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = combinedMusic.length - 1;
        }

        return temp;
      });
    }

    if (!shuffle && fowards) {
      setCurrentSongIndex(() => {
        let temp = Math.floor(Math.random() * combinedMusic.length);
    
        // Ensure temp is a valid index
        if (temp < 0) {
          temp = Math.floor(Math.random() * combinedMusic.length);  // Choose a random index
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

  return (
    <>
    {combinedMusic ? (
    <div className="flex flex-col z-[999999999] w-[90vw] max-w-[1440px] mx-auto my-0 bg-[#1A1E1F] bg-opacity-[95%] mt-3 text-white">
      <audio
  src={combinedMusic[currentSongIndex]?.audio}  // Use optional chaining
  ref={playerAudioRef}
  onTimeUpdate={getCurrDuration}
  onLoadedData={(e) => {
    setDuration(e.currentTarget.duration.toFixed(2));
  }}
></audio>

      <div className="flex flex-row items-center justify-between my-4">
        {/* <PlayerDetails song={combinedMusic[currentSongIndex]} className="w-[50%]" /> */}
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
