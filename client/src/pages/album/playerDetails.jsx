import React, { useEffect, useState } from "react";
import { AppPass } from '../../contexts/AppContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function PlayerDetails() {
  
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
  
        if (i >= 0 && i < albumData.length) {
          setAlbumList(albumData[i].albumData);
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
  const {
    currentSongIndex,
    playerImageRef,
    playerNameRef,
    playerArtistRef,
  } = AppPass();

  return (
    <div className="flex flex-row items-center w-[70%]">
      <img
        src={albumList[currentSongIndex]?.image}
        ref={playerImageRef}
        className="w-[100px] h-[100px] rounded-[20px] mr-2"
        alt="artist"
      ></img>
      <div>
        <h3 ref={playerNameRef} className="text-[1em]">
          {albumList[currentSongIndex]?.musicName}
        </h3>
        <h3 ref={playerArtistRef} className="text-[0.8em]">
          {albumList[currentSongIndex]?.artist}
        </h3>
      </div>
    </div>
  );
}

export default PlayerDetails;
