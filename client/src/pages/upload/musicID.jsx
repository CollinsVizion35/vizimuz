import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const MusicID = () => {
  const [musicList, setMusicList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const musicCollectionRef = collection(db, "music");
        const querySnapshot = await getDocs(musicCollectionRef);

        const musicData = [];
        querySnapshot.forEach((doc) => {
          musicData.push({ id: doc.id, ...doc.data() });
        });

        setMusicList(musicData);
      } catch (error) {
        console.error("Error fetching music data: ", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h1>Music Details</h1>
      <ul>
        {musicList.map((music) => (
          <li key={music.id}>
            <Link to={`/music/${music.text}/${music.id}`}>
              <div>
                <p>{music.text}</p>
                <p>{music.category}</p>
                <img src={music.image} alt="Music" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicID;
