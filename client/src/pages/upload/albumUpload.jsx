import React, { useEffect, useState } from "react";
import { collection, addDoc, doc, updateDoc, query, where, documentId, getDocs, setDoc, getDoc } from "firebase/firestore";
import { storage, db } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import { UseAuth } from "../../contexts/AuthContext";

const UploadAlbum = () => {
  const { user } = UseAuth();

  const [usersInfo, setUsersInfo] = useState([]);
const [userName, setUserName] = useState("");
const [userImage, setUserImage] = useState("");

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
  
const [albumData, setAlbumData] = useState([]);
  const [albumDetails, setAlbumDetails] = useState({
    image: null,
    name: "",
    artist: "",
    tracks: [],
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setAlbumDetails({
      ...albumDetails,
      [name]: files[0],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlbumDetails({
      ...albumDetails,
      [name]: value,
    });
  };

  const handleTrackInputChange = (e, index, property) => {
    const { value } = e.target;
    const updatedTracks = [...albumDetails.tracks];
    updatedTracks[index] = {
      ...updatedTracks[index],
      [property]: value,
    };
    setAlbumDetails({
      ...albumDetails,
      tracks: updatedTracks,
    });
  };

  const handleTrackAudioChange = (e, index) => {
    const { files } = e.target;
    const updatedTracks = [...albumDetails.tracks];
    updatedTracks[index] = {
      ...updatedTracks[index],
      audio: files[0],
    };
    setAlbumDetails({
      ...albumDetails,
      tracks: updatedTracks,
    });
  };

  const addTrack = () => {
    setAlbumDetails({
      ...albumDetails,
      tracks: [...albumDetails.tracks, { name: "", category: "", artist:"", audio: null }],
    });
  };

  const handleUpload = async () => {
    const { name, artist, image, tracks } = albumDetails;

    if (
      !image ||
      !name ||
      !artist ||
      tracks.some((track) => !track.name || !track.category || !track.artist || !track.audio)
    ) {
      alert("Please fill in all the fields for the album and tracks.");
      return;
    }

    try {
      const imageRef = ref(storage, `images/${image.name}`);
      const audioUrls = await Promise.all(
        tracks.map(async (track) => {
          const trackAudioRef = ref(storage, `audio/${track.audio.name}`);
          await uploadBytes(trackAudioRef, track.audio);
          return await getDownloadURL(trackAudioRef);
        })
      );
      await Promise.all([uploadBytes(imageRef, image)]);

      const imageUrl = await getDownloadURL(imageRef);

      albumData.push({
        userName: userName,
        userImage: userImage,
        image: imageUrl,
        name,
        artist,
        tracks: tracks.map((track, index) => ({
          userName: userName,
          musicName: track.name,
          category: track.category,
          audio: audioUrls[index],
          image: imageUrl,
          artist: track.artist,
          play: 0,
        })),
      });

      
    // Update the musicData object to reference the array
    setAlbumData([...albumData]);

       // Update the Firestore document with the updated musicData object
       const albumCollectionRef = doc(db, "album", user.uid + "album");

       // Check if the document exists
       const albumDoc = await getDoc(albumCollectionRef);
       
       if (albumDoc.exists()) {
         // The document already exists, so update it
         await updateDoc(albumCollectionRef, { albumData });
       } else {
         // The document does not exist, so create it
         await setDoc(albumCollectionRef, { albumData });
       }

      alert("Album added successfully!");
    } catch (error) {
      console.error("Error adding album:", error);
      alert("An error occurred while adding the album.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen space-y-6">
      <div>Album upload</div>
      <div className="flex flex-col items-start lg:w-[50vw] w-[80vw] space-y-2">
        <label>Album Name</label>
        <input
          type="text"
          placeholder="Enter album name"
          value={albumDetails.name}
          name="name"
          onChange={handleInputChange}
          className="p-3 rounded-[20px] text-[#0F1732]"
        />

        <label>Artist</label>
        <input
          type="text"
          placeholder="Enter artist name"
          value={albumDetails.artist}
          name="artist"
          onChange={handleInputChange}
          className="p-3 rounded-[20px] text-[#0F1732]"
        />

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

        {albumDetails.tracks.map((track, index) => (
          <div
            key={index}
            className="flex flex-col items-start w-full space-y-2"
          >
            <label>{`Track ${index + 1} Name`}</label>
            <input
              type="text"
              placeholder={`Enter track ${index + 1} name`}
              value={track.name}
              onChange={(e) => handleTrackInputChange(e, index, "name")}
              className="p-3 rounded-[20px] text-[#0F1732]"
            /><label>{`Track ${index + 1} Artist`}</label>
            <input
              type="text"
              placeholder={`Enter track ${index + 1} artist`}
              value={track.artist}
              onChange={(e) => handleTrackInputChange(e, index, "artist")}
              className="p-3 rounded-[20px] text-[#0F1732]"
            />
            <label>{`Track ${index + 1} category`}</label>
            <select
          value={track.category}
          name="category"
          onChange={(e) => handleTrackInputChange(e, index, "category")}
          className="bg-[#0F1732] border-[#9600ffcc] border-[1px] p-3 rounded-[20px]"
        >
          <option className="bg-[#0F1732]" disabled>{`Select track ${index + 1} category`}</option>
          <option value="AfroBeats" className="bg-[#0F1732]">AfroBeats</option>
          <option value="R & B" className="bg-[#0F1732]">R & B</option>
          <option value="Hip Hop" className="bg-[#0F1732]">Hip Hop</option>
          <option value="Pop" className="bg-[#0F1732]">Pop</option>
          <option value="Gospel" className="bg-[#0F1732]">Gospel</option>
          <option value="Jazz" className="bg-[#0F1732]">Jazz</option>
          <option value="Reggae" className="bg-[#0F1732]">Reggae</option>
          <option value="Rock" className="bg-[#0F1732]">Rock</option>
          <option value="K-Pop" className="bg-[#0F1732]">K-Pop</option>
          <option value="Soul" className="bg-[#0F1732]">Soul</option>
          <option value="EDM" className="bg-[#0F1732]">Electronics Dance Music</option>
          <option value="Classical" className="bg-[#0F1732]">Classical</option>
          <option value="Dancehall" className="bg-[#0F1732]">Dancehall</option>
          <option value="Latin" className="bg-[#0F1732]">Latin</option>
          <option value="Country" className="bg-[#0F1732]">Country</option>
          <option value="Blues" className="bg-[#0F1732]">Blues</option>
          <option value="Folk" className="bg-[#0F1732]">Folk</option>
          <option value="Punk" className="bg-[#0F1732]">Punk</option>
          <option value="Classical crossover" className="bg-[#0F1732]">Classical crossover</option>
          <option value="Indie" className="bg-[#0F1732]">Indie</option>
        </select>
            <label>{`Track ${index + 1} Audio`}</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleTrackAudioChange(e, index)}
              className="rounded-[20px]"
            />
          </div>
        ))}

        <button
          onClick={addTrack}
          className="bg-[#9600ffcc] p-3 rounded-[20px] cursor-pointer"
        >
          Add Track
        </button>
      </div>

      <button
        onClick={handleUpload}
        className="bg-[#9600ffcc] p-3 rounded-[20px] cursor-pointer"
      >
        Upload Album
      </button>
    </div>
  );
};

export default UploadAlbum;
