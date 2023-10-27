import React, { useEffect, useState } from "react";
import { AppPass } from '../../contexts/AppContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function PlayerDetails() {
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
    playerImageRef,
    playerNameRef,
    playerArtistRef,
  } = AppPass();

  return (
    <div className="flex flex-row items-center w-[70%]">
      <img
        src={combinedMusic[currentSongIndex]?.image}
        ref={playerImageRef}
        className="w-[100px] h-[100px] rounded-[20px] mr-2"
        alt="artist"
      ></img>
      <div>
        <h3 ref={playerNameRef} className="text-[1.1em]">
          {combinedMusic[currentSongIndex]?.musicName}
        </h3>
        <h3 ref={playerArtistRef} className="text-[0.9em]">
          {combinedMusic[currentSongIndex]?.artist}
        </h3>
      </div>
    </div>
  );
}

export default PlayerDetails;
