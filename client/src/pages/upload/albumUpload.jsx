import React, { useEffect, useState } from "react";
import { collection, addDoc, doc, updateDoc, query, where, documentId, getDocs } from "firebase/firestore";
import { storage, db } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import { UseAuth } from "../../contexts/AuthContext";

const UploadAlbum = () => {
  const { user } = UseAuth();

  const [usersInfo, setUsersInfo] = useState([]);
const [userName, setUserName] = useState("");

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
    await updateDoc(albumCollectionRef, { albumData });

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
          className="p-3 rounded-[20px] text-[#1D2123]"
        />

        <label>Artist</label>
        <input
          type="text"
          placeholder="Enter artist name"
          value={albumDetails.artist}
          name="artist"
          onChange={handleInputChange}
          className="p-3 rounded-[20px] text-[#1D2123]"
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
              className="p-3 rounded-[20px] text-[#1D2123]"
            /><label>{`Track ${index + 1} Artist`}</label>
            <input
              type="text"
              placeholder={`Enter track ${index + 1} artist`}
              value={track.artist}
              onChange={(e) => handleTrackInputChange(e, index, "artist")}
              className="p-3 rounded-[20px] text-[#1D2123]"
            />
            <label>{`Track ${index + 1} category`}</label>
            <select
          value={track.category}
          name="category"
          onChange={(e) => handleTrackInputChange(e, index, "category")}
          className="bg-[#1D2123] border-[#9600ffcc] border-[1px] p-3 rounded-[20px]"
        >
          <option className="bg-[#1D2123]" disabled>{`Select track ${index + 1} category`}</option>
          <option className="bg-[#1D2123]">AfroBeats</option>
          <option className="bg-[#1D2123]">R & B</option>
          <option className="bg-[#1D2123]">Hip Hop</option>
          <option className="bg-[#1D2123]">Pop</option>
          <option className="bg-[#1D2123]">Gospel</option>
          <option className="bg-[#1D2123]">Classical</option>
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