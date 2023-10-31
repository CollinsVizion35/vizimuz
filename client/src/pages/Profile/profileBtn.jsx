import React, { useState, useEffect } from "react";
import { AppPass } from "../../contexts/AppContext";
import { UseAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs, documentId } from "firebase/firestore";
import { db } from "../../firebase";
import { MdArrowForward } from "react-icons/md";
// import defaultImg from '../../imgs/No-Photo-Available.jpg'

const ProfileBtn = () => {
  const { user } = UseAuth();

  const { eMail } = AppPass();

  console.log(eMail);
  useEffect(() => {
    document.title = "My Profile";
  }, []);

  const [usersInfo, setUsersInfo] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "Users"),
        where(documentId(), "==", user.uid + "user")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUsersInfo(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    }
    fetchData();
  }, []);

  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [email, setEmail] = useState(() => {
  //   // getting stored value
  //         const saved = sessionStorage.getItem("emailInput");
  //         const initialValue = JSON.parse(saved);
  //         return initialValue || "";
  //       });

  //       useEffect(() => {
  //         sessionStorage.setItem('emailInput', JSON.stringify(emailInput));
  //        }, [emailInput]);

  // const [certificationNumber, setCertificationNumber] = useState();

  // const [photoURL, setPhotoURL] = useState('../../imgs/No-Photo-Available.jpg');
  // const [photo, setPhoto] = useState(null);
  // const [loading, setLoading] = useState(false);

  // console.log(user.photoURL);

  // const handleChange = (e) => {
  //   if (e.target.files[0]) {
  //     setPhoto(e.target.files[0]);
  //   }
  // }

  // useEffect(() => {
  //   if (user?.photoURL) {
  //     setPhotoURL(user.photoURL);
  //   }
  // }, [user]);

  // get Location
  // const [details, setDetails] = useState(null);

  // const getUserGeolocationDetails = () => {
  //   fetch(
  //     "https://geolocation-db.com/json/50ad4a90-fd5e-11ec-b463-1717be8c9ff1"
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setDetails(data));
  // };

  // useEffect(() => {
  //   getUserGeolocationDetails();
  // }, []);

  return (
    <>
      

      {usersInfo.map((info, imageIndex) => {
        return (
          <div key={imageIndex}>
            <img src={info.image} alt="user" className="h-36 w-36 rounded-[50%]" />
          </div>
        );
      })}
      {/* {details && (
        <h1 className="mb-3 text-sm text-[#95B4B3]">{`${details.city}, ${details.country_name}`}</h1>
      )} */}

      {usersInfo ? (
        usersInfo.map((info, profileIndex) => {
          return (
            <div key={profileIndex}>
              <form className="mb-8 mt-8 lg:grid-cols-2 lg:grid text-left items-start mx-auto">
                <div className="pb-2 block lg:hidden">
                  <label className="text-[1em] font-bold text-[#fcfcfc] font-bold ml-8 mb-6">
                    USER NAME
                  </label>
                  <br />
                  <h1 className="mb-3 text-[1em] font-bold text-[#95B4B3] w-[16rem] whitespace-nowrap overflow-hidden overflow-ellipsis lg:h-[2em] p-3 ml-8 bg-[#040C25] flex items-center lg:p-2">
                    {info.userName}
                  </h1>
                </div>

                <div className="pb-2 lg:mr-4 lg:block hidden">
                  <label className="text-[1em] font-bold text-[#fcfcfc] font-bold ml-8 mb-6">
                    FIRST NAME
                  </label>
                  <br />
                  <h1 className="mb-3 text-[1em] font-bold text-[#95B4B3] w-[16rem] whitespace-nowrap overflow-hidden overflow-ellipsis lg:h-[2em] p-3 ml-8 mr-8 bg-[#040C25] flex items-center lg:p-2">
                    {info.firstName}
                  </h1>
                </div>

                <div className="pb-2 lg:block hidden">
                  <label className="text-[1em] font-bold text-[#fcfcfc] font-bold ml-8 mb-6">
                    LAST NAME
                  </label>
                  <br />
                  <h1 className="mb-3 text-[1em] font-bold text-[#95B4B3] w-[16rem] whitespace-nowrap overflow-hidden overflow-ellipsis lg:h-[2em] p-3 ml-8 bg-[#040C25] flex items-center lg:p-2">
                    {info.lastName}
                  </h1>
                </div>

                <div className="pb-2 lg:mr-4">
                  <label className="text-[1em] font-bold text-[#fcfcfc] font-bold ml-8 mb-6">
                    PHONE NUMBER
                  </label>
                  <br />
                  <h1 className="mb-3 text-[1em] font-bold text-[#95B4B3] w-[16rem] whitespace-nowrap overflow-hidden overflow-ellipsis lg:h-[2em] p-3 ml-8 mr-8 bg-[#040C25] flex items-center lg:p-2">
                    {info.phoneNumber.length > 0
                      ? `+${info.phoneNumber}`
                      : info.phoneNumber}
                  </h1>
                </div>

                <div className="pb-2">
                  <label className="text-[1em] font-bold text-[#fcfcfc] font-bold ml-8 mb-6">
                    GENDER
                  </label>
                  <br />
                  <h1 className="mb-3 text-[1em] font-bold text-[#95B4B3] w-[16rem] whitespace-nowrap overflow-hidden overflow-ellipsis lg:h-[2em] p-3 ml-8 bg-[#040C25] flex items-center lg:p-2">
                    {info.gender}
                  </h1>
                </div>

                <div className="pb-2">
                  <label className="text-[1em] font-bold text-[#fcfcfc] font-bold ml-8 mb-6">
                    USER'S COUNTRY
                  </label>
                  <br />
                  <h1 className="mb-3 text-[1em] font-bold text-[#95B4B3] w-[16rem] whitespace-nowrap overflow-hidden overflow-ellipsis lg:h-[2em] p-3 ml-8 bg-[#040C25] flex items-center lg:p-2">
                    {info.userCountry}
                  </h1>
                </div>
              </form>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
      <Link to="/editprofile" >
        <button className="bg-[#95B4B3] flex flex-row items-center space-x-2 text-white w-fit rounded-lg p-2">
          Go to Edit Profile <MdArrowForward />
        </button>
      </Link>
    </>
  );
};

export default ProfileBtn;
