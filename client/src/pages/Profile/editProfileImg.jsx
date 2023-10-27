import React, { useState, useEffect, useContext } from "react";
import { AppPass } from "../../contexts/AppContext";
import { UseAuth } from "../../contexts/AuthContext";
import defaultImg from "../../imgs/No-Photo-Available.jpg";
import {
  onSnapshot,
  collection,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import ProfileEditBtn from "./editProfileBtn";

const ProfileImg = () => {
  
  // get Location
  const [details, setDetails] = useState(null);

  const getUserGeolocationDetails = () => {
    fetch(
      "https://geolocation-db.com/json/50ad4a90-fd5e-11ec-b463-1717be8c9ff1"
    )
      .then((response) => response.json())
      .then((data) => setDetails(data));
  };

  useEffect(() => {
    getUserGeolocationDetails();
  }, []);

  // useEffect(() => {
  //   if (user?.photoURL) {
  //     setPhotoURL(user.photoURL);
  //   }
  // }, [user]);

  return (
    <>
      {/* <div className='relative flex flex-col justify-center items-center mb-4'>
            <div className='rounded-[50%] h-10 mb-10 w-fit border flex justify-center items-center'>
              <img className='h-36 w-36 rounded-[50%]' src={photo} alt="Avatar" />
            </div>
            <input type="file" onChange={handleChange} id='select-img' hidden />
            {Object.keys(user).length > 0 ?
              <label htmlFor='select-img' className='cursor-pointer rounded-[50%] w-6 h-6 text-center bg-white absolute bottom-1 left-28 text-sm text-[#6B6B6B]'>
                +
              </label> :
              <label htmlFor='select-img' className='cursor-pointer text-[#95B4B3]'>Upload A Profile Pic</label>
            }
        </div> */}
      {details && (
        <h1 className="mb-3 text-sm text-[#95B4B3]">{`${details.city}, ${details.country_name}`}</h1>
      )}
      <div>
        <ProfileEditBtn/>
      </div>
    </>
  );
};

export default ProfileImg;
