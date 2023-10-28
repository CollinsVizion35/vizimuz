import React, { useEffect, useState } from "react";
import { collection, addDoc, query, where, documentId, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { storage, db } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import PlayMusic from "./uploaded"; // Import the PlayMusic component
import { UseAuth } from "../../contexts/AuthContext";

const UploadMusic = () => {
  const { user } = UseAuth();
const [usersInfo, setUsersInfo] = useState([]);
const [userName, setUserName] = useState("");

const [musicData, setMusicData] = useState([]);

useEffect(() => {
  async function fetchData() {
    const q = query(
      collection(db, "Users"),
      where(documentId(), "==", user.uid + "user")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setUsersInfo(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      const data2 = doc.data();

      setUserName(data2.userName);
    });
  }
  fetchData();
}, [user.uid, userName]);

const [musicDetails, setMusicDetails] = useState({
  image: null,
  audio: null,
  musicName: "",
  artist: "",
  category: "",
  audioUrl: null, // Store audio URL
});

const handleFileChange = (e) => {
  const { name, files } = e.target;
  setMusicDetails({
    ...musicDetails,
    [name]: files[0],
  });
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setMusicDetails({
    ...musicDetails,
    [name]: value,
  });
};

const handleUpload = async () => {
  const { image, audio, musicName, category, artist } = musicDetails;

  if (!image || !audio || !musicName || !category || !artist) {
    alert("Please fill in all the fields.");
    return;
  }

  const timestamp = serverTimestamp();

  try {
    // Upload audio and image files
    const audioRef = ref(storage, `audio/${audio.name}`);
    const imageRef = ref(storage, `images/${image.name}`);
    await Promise.all([uploadBytes(audioRef, audio), uploadBytes(imageRef, image)]);

    const audioUrl = await getDownloadURL(audioRef);

    setMusicDetails({
      ...musicDetails,
      audioUrl, // Update audioUrl state
    });

    const imageUrl = await getDownloadURL(imageRef);

    // Add the new music data to the array
    musicData.push({
      userName: userName,
      image: imageUrl,
      audio: audioUrl,
      musicName,
      category,
      artist,
      // timestamp,
      play: 0,
    });

    // Update the musicData object to reference the array
    setMusicData([...musicData]);

    // Update the Firestore document with the updated musicData object
    const musicCollectionRef = doc(db, "music", user.uid + "music");
    await updateDoc(musicCollectionRef, { musicData });

    alert("Music uploaded successfully!");
  } catch (error) {
    console.error("Error uploading music:", error);
    alert("An error occurred while uploading the music.");
  }
};


  return (
    <div className="flex flex-col items-center justify-center w-screen space-y-6 mb-10">
      <div>Music upload {userName}</div>
      <div className="flex flex-col items-start lg:w-[50vw] w-[80vw] space-y-2">
        <label>Add image</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleFileChange}
          className="rounded-[20px]"
        />
      </div>

      <div className="flex flex-col items-start lg:w-[50vw] w-[80vw] space-y-2">
        <label>Add Music</label>
        <input
          type="file"
          accept="audio/*"
          name="audio"
          onChange={handleFileChange}
          className="rounded-[20px]"
        />
      </div>

<div className="flex flex-col items-start lg:w-[50vw] w-[80vw] space-y-2">
  <label>Artist Name</label>
  <input
    type="text"
    placeholder="Enter music title"
    value={musicDetails.artist}
    name="artist"
    onChange={handleInputChange}
    className="p-3 rounded-[20px] text-[#0F1732]"
  />
</div>

      <div className="flex flex-col items-start lg:w-[50vw] w-[80vw] space-y-2">
        <label>Music Name</label>
        <input
          type="text"
          placeholder="Enter music title"
          value={musicDetails.musicName}
          name="musicName"
          onChange={handleInputChange}
          className="p-3 rounded-[20px] text-[#0F1732]"
        />
      </div>

      <div className="flex flex-col items-start lg:w-[50vw] w-[80vw] space-y-2">
        <label>Music Category</label>
        <select
          value={musicDetails.category}
          name="category"
          onChange={handleInputChange}
          className="bg-[#0F1732] border-[#9600ffcc] border-[1px] p-3 rounded-[20px]"
        >
          <option className="bg-[#0F1732]" disabled>Select a music category</option>
          <option className="bg-[#0F1732]">AfroBeats</option>
          <option className="bg-[#0F1732]">R & B</option>
          <option className="bg-[#0F1732]">Hip Hop</option>
          <option className="bg-[#0F1732]">Pop</option>
          <option className="bg-[#0F1732]">Gospel</option>
          <option className="bg-[#0F1732]">Classical</option>
        </select>
      </div>

      <button onClick={handleUpload} className="bg-[#9600ffcc] p-3 rounded-[20px] cursor-pointer">
        Upload Music
      </button>
    </div>
  );
};

export default UploadMusic;
