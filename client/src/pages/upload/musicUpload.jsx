import React, { useEffect, useState } from "react";
import { collection, addDoc, query, where, documentId, getDocs, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { storage, db } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import PlayMusic from "./uploaded"; // Import the PlayMusic component
import { UseAuth } from "../../contexts/AuthContext";
import { Audio, ColorRing } from 'react-loader-spinner'

const UploadMusic = () => {
  const { user } = UseAuth();
  const [usersInfo, setUsersInfo] = useState([]);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

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
        setUserImage(data2.userImage);
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


  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpload = async () => {
    const { image, audio, musicName, category, artist } = musicDetails;

    if (!image || !audio || !musicName || !category || !artist) {
      alert("Please fill in all the fields.");
      return;
    }

    const timestamp = serverTimestamp();
    setIsUpdating(true);

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
      // Check if the document exists
      const musicDoc = await getDoc(musicCollectionRef);



      if (musicDoc.exists()) {


        await updateDoc(musicCollectionRef, { musicData });
      } else {
        // The document does not exist, so create it
        await setDoc(musicCollectionRef, { musicData });
      }

      alert("Music uploaded successfully!");
    } catch (error) {
      console.error("Error uploading music:", error);
      alert("An error occurred while uploading the music.");
    } finally {
      setIsUpdating(false); // Hide the "Updating" message
    }
  };


  return (
    <div className="flex flex-col items-center justify-center w-screen space-y-6 mt-12 mb-10">
      <div className="font-black text-[1.3em]">Music upload</div>
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
          className="bg-[#000000] border-b border-[#2F3336] border-[#E7E9EA] border-[1px] p-3 rounded-[20px]"
        >
          <option className="bg-[#000000] border-b border-[#2F3336]" selected disabled>Select a music category</option>
          <option value="AfroBeats" className="bg-[#000000] border-b border-[#2F3336]">AfroBeats</option>
          <option value="R & B" className="bg-[#000000] border-b border-[#2F3336]">R & B</option>
          <option value="Hip Hop" className="bg-[#000000] border-b border-[#2F3336]">Hip Hop</option>
          <option value="Pop" className="bg-[#000000] border-b border-[#2F3336]">Pop</option>
          <option value="Gospel" className="bg-[#000000] border-b border-[#2F3336]">Gospel</option>
          <option value="Jazz" className="bg-[#000000] border-b border-[#2F3336]">Jazz</option>
          <option value="Reggae" className="bg-[#000000] border-b border-[#2F3336]">Reggae</option>
          <option value="Rock" className="bg-[#000000] border-b border-[#2F3336]">Rock</option>
          <option value="K-Pop" className="bg-[#000000] border-b border-[#2F3336]">K-Pop</option>
          <option value="Soul" className="bg-[#000000] border-b border-[#2F3336]">Soul</option>
          <option value="EDM" className="bg-[#000000] border-b border-[#2F3336]">Electronics Dance Music</option>
          <option value="Classical" className="bg-[#000000] border-b border-[#2F3336]">Classical</option>
          <option value="Dancehall" className="bg-[#000000] border-b border-[#2F3336]">Dancehall</option>
          <option value="Latin" className="bg-[#000000] border-b border-[#2F3336]">Latin</option>
          <option value="Country" className="bg-[#000000] border-b border-[#2F3336]">Country</option>
          <option value="Blues" className="bg-[#000000] border-b border-[#2F3336]">Blues</option>
          <option value="Folk" className="bg-[#000000] border-b border-[#2F3336]">Folk</option>
          <option value="Punk" className="bg-[#000000] border-b border-[#2F3336]">Punk</option>
          <option value="Classical crossover" className="bg-[#000000] border-b border-[#2F3336]">Classical crossover</option>
          <option value="Indie" className="bg-[#000000] border-b border-[#2F3336]">Indie</option>
        </select>
      </div>

      <button onClick={handleUpload} className="bg-[#E7E9EA] text-[#000000] p-3 rounded-[20px] cursor-pointer">
        Upload Music
      </button>

      <div>
        {isUpdating ? <div className="fixed top-1/2 left-1/2 p-10 z-[1000] bg-[#000000] border-b border-[#2F3336] opacity-60"
            style={{ transform: "translate(-50%, -50%)" }}>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#E7E9EA', '#95B4B3', '#f8b26a', '#E7E9EA', '#95B4B3']}
          />
        </div> : null}
      </div>
    </div>
  );
};

export default UploadMusic;
