import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppPass } from "../../contexts/AppContext";
import {
  onSnapshot,
  collection,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  setDoc,
  documentId,
} from "firebase/firestore";
import { db, storage } from "../../firebase";

import {
  MdOutlineHistory,
  MdOutlineSettings,
  MdOutlineSettingsPower,
  MdOutlineStadium,
  MdOutlineWaterfallChart,
  MdOutlineClose,
  MdTableRows,
  MdVerifiedUser,
  MdOutlineVerifiedUser,
} from "react-icons/md";
import { HiOutlineDotsVertical, HiOutlineTable } from "react-icons/hi";
import { FaPowerOff, FaRegUser } from "react-icons/fa";

import { FaChild, FaSchool } from "react-icons/fa";
import { GiConfirmed, GiSoccerKick } from "react-icons/gi";
import { HiMenuAlt2 } from "react-icons/hi";

import { UseAuth } from "../../contexts/AuthContext";
import { updateProfile } from "firebase/auth";
import { ProfilePass } from "../../contexts/ProfileContext";
import DialCode from "./dialCode";
import { useMemo } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import defaultPhoto from "../../imgs/profilePhoto.webp";

const ProfileEditBtn = () => {
  const { user, uploadPicture } = UseAuth();
  const [searchInput, setSearchInput] = useState("");
  const [isHarmburgerClicked, setIsHarmburgerClicked] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { countryCode, setCountryCode, phoneNumber, setPhoneNumber, teamOpts } =
    ProfilePass();

  const navigate = useNavigate();

  const displaySidebar = () => {
    setIsHarmburgerClicked(true);
  };

  const save2Ref = useRef();
  const confirmedRef = useRef();
  const unconfirmedRef = useRef();

  useEffect(() => {
    document.title = "Vizimuz - Edit Profile";
  }, []);

  const [isCheckboxCheckedTerms, setIsCheckboxCheckedTerms] = useState(false);

  const handleCheckboxChange = () => {
    setIsCheckboxCheckedTerms(!isCheckboxCheckedTerms);
  };
  const [firstName, setFirstName] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("firstName");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [lastName, setLastName] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("lastName");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [userName, setUserName] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("userName");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [userCountry, setUserCountry] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("userCountry");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [gender, setGender] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("gender");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [maleGender, setMaleGender] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("maleGender");
    const initialValue = JSON.parse(saved);
    return initialValue || "Male";
  });
  const [femaleGender, setFemaleGender] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("femaleGender");
    const initialValue = JSON.parse(saved);
    return initialValue || "Female";
  });
  const [otherGender, setOtherGender] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("otherGender");
    const initialValue = JSON.parse(saved);
    return initialValue || "Others";
  });
  const [fullPhone, setFullPhone] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("fullPhone");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  
  useEffect(()=> {

    localStorage.setItem("firstName", JSON.stringify(firstName));
    localStorage.setItem("lastName", JSON.stringify(lastName));
    localStorage.setItem("userName", JSON.stringify(userName));
    localStorage.setItem("userCountry", JSON.stringify(userCountry));
    localStorage.setItem("gender", JSON.stringify(gender));
    localStorage.setItem("maleGender", JSON.stringify(maleGender));
    localStorage.setItem("femaleGender", JSON.stringify(femaleGender));
    localStorage.setItem("otherGender", JSON.stringify(otherGender));
    localStorage.setItem("fullPhone", JSON.stringify(fullPhone));
  }, [])

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
  };

  // image upload
 

  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const { files } = e.target;

    // Set the image state to the first file
    setImage(files[0]);
  };

  async function handleEditBtn(e) {
    save2Ref.current.style.display = "flex";
  }

  async function handleEditBtn2() {

    if (!image) {
      alert("Please select an image.");
      return;
    }
  
    try {
      // Upload audio and image files
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
  
      const imageUrl = await getDownloadURL(imageRef);
  
      const data = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        phoneNumber: countryCode + phoneNumber,
        gender: gender,
        userCountry: userCountry,
        image: imageUrl,
      };
  
      // const data2 = {
      //   userName: userName,
      //   userImage: imageUrl,
      // };

      
  
      // const data3 = {
      //   userName: userName,
      //   userImage: imageUrl,
      // };
  
      // console.log(data2, data3);
      console.log(user.uid + "GW1");
  
      const q = query(
        collection(db, "Users"),
        where(documentId(), "==", user.uid + "user")
      );
  
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // User doesn't have a document in the "GameWeek" collection, it's their first login
        // Create a new document for the user in the collection
        const docRef = doc(db, "Users", user.uid + "user");
        await setDoc(docRef, data);
        // const docRef2 = doc(db, "music", user.uid + "music");
        // await setDoc(docRef2, data2);
        // const docRef3 = doc(db, "album", user.uid + "album");
        // await setDoc(docRef3, data3);
        storeInformationToDB(data);
  
        // console.log("First login! User document created:", docRef.id);
      } else {
        const docRef = doc(db, "Users", user.uid + "user");
        // const docRef2 = doc(db, "music", user.uid + "music");
        // const docRef3 = doc(db, "album", user.uid + "album");
        await updateDoc(docRef, data);
        // await updateDoc(docRef2, data2);
        // await updateDoc(docRef3, data3);
      }
      storeInformationToDB(data);
      confirmedRef.current.style.display = "flex";
      setTimeout(() => {
        confirmedRef.current.style.display = "none";
      }, 2000);
      navigate("/profile");
    } catch (e) {
      console.log(e.message);
      unconfirmedRef.current.style.display = "flex";
      setTimeout(() => {
        unconfirmedRef.current.style.display = "none";
      }, 2000);
    }
    save2Ref.current.style.display = "none";
  }
  
  async function storeInformationToDB(data) {
    try {
      await updateProfile({
        displayName: undefined || {},
        data: Object.values(data),
      });
    } catch (e) {
      // console.log(e.message);
    }
  }
  
  

  const handleEditBtn3 = () => {
    save2Ref.current.style.display = "none";
  };

  useEffect(() => {
    save2Ref.current.style.display = "none";
  }, []);

  
  const [photoURL, setPhotoURL] = useState(null);

  

  useEffect(() => {
    if (image) {
      setPhotoURL(URL.createObjectURL(image));
    } else {
      setPhotoURL(defaultPhoto);
    }
    
  
  console.log(image);
  }, [image]);


  return (
    <>
      <div className="relative flex flex-col justify-center items-center lg:mt-24 mt-16 mb-4">
        <div className="rounded-[50%] h-10 mb-10 w-fit border flex justify-center items-center">
          <img className="h-36 w-36 rounded-[50%]" src={photoURL} alt="Avatar" />
        </div>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleFileChange}
          id="select-img"
          hidden
        />
        {Object.keys(user).length > 0 ? (
          <label
            htmlFor="select-img"
            className="cursor-pointer rounded-[50%] w-6 h-6 text-center bg-white absolute bottom-1 left-28 text-sm text-[#6B6B6B]"
          >
            +
          </label>
        ) : (
          <label htmlFor="select-img" className="cursor-pointer text-[#95B4B3]">
            Upload A Profile Pic
          </label>
        )}
      </div>
      <div className="flex flex-col w-[90vw] lg:h-fit  mx-auto rounded-md">
        <div className="w-full py-8">
          <form>
            <div className="flex flex-col space-y-4">
              <label className="text-[#0F1732]  font-normal text-sm md:text-base inline opacity-30 text-left">
                User information
              </label>
              <div>
                <label className="mb-3 text-sm text-[#95B4B3] font-bold">
                  FIRST NAME
                </label>
                <br />
                <input
                  type="text"
                  placeholder="first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="lg:w-[60%] w-auto h-[2.5rem] rounded-[5px] p-2 text-sm  border-b border-[#95B4B3] text-[#0F1732]"
                />
              </div>

              <div>
                <label className="mb-3 text-sm text-[#95B4B3] font-bold">
                  LAST NAME
                </label>
                <br />
                <input
                  type="text"
                  placeholder="last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="lg:w-[60%] w-auto h-[2.5rem] rounded-[5px] p-2 text-sm  border-b border-[#95B4B3] text-[#0F1732]"
                />
              </div>

              <div>
                <label className="mb-3 text-sm text-[#95B4B3] font-bold">
                  USER NAME
                </label>
                <br />
                <input
                  type="text"
                  placeholder="user name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="lg:w-[60%] w-auto h-[2.5rem] rounded-[5px] p-2 text-sm  border-b border-[#95B4B3] text-[#0F1732]"
                />
              </div>

              <div>
                <label className="mb-3 text-sm text-[#95B4B3] font-bold">
                  COUNTRY/ REGION
                </label>
                <br />
                <select
                  value={userCountry}
                  onChange={(e) => setUserCountry(e.target.value)}
                  className="lg:w-[60%] w-[70vw] h-[2.5rem] rounded-[5px] p-2 text-sm  border-b border-[#95B4B3] text-[#0F1732]"
                >
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antartica">Antarctica</option>
                  <option value="Antigua and Barbuda">
                    Antigua and Barbuda
                  </option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegowina">
                    Bosnia and Herzegowina
                  </option>
                  <option value="Botswana">Botswana</option>
                  <option value="Bouvet Island">Bouvet Island</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">
                    British Indian Ocean Territory
                  </option>
                  <option value="Brunei Darussalam">Brunei Darussalam</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Central African Republic">
                    Central African Republic
                  </option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Congo">
                    Congo, the Democratic Republic of the
                  </option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                  <option value="Croatia">Croatia (Hrvatska)</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="East Timor">East Timor</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Falkland Islands">
                    Falkland Islands (Malvinas)
                  </option>
                  <option value="Faroe Islands">Faroe Islands</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="France Metropolitan">
                    France, Metropolitan
                  </option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="French Southern Territories">
                    French Southern Territories
                  </option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Greece</option>
                  <option value="Greenland">Greenland</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Heard and McDonald Islands">
                    Heard and Mc Donald Islands
                  </option>
                  <option value="Holy See">
                    Holy See (Vatican City State)
                  </option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran">Iran (Islamic Republic of)</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Democratic People's Republic of Korea">
                    Korea, Democratic People's Republic of
                  </option>
                  <option value="Korea">Korea, Republic of</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Lao">Lao People's Democratic Republic</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan Arab Jamahiriya">
                    Libyan Arab Jamahiriya
                  </option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macau">Macau</option>
                  <option value="Macedonia">
                    Macedonia, The Former Yugoslav Republic of
                  </option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia">
                    Micronesia, Federated States of
                  </option>
                  <option value="Moldova">Moldova, Republic of</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Netherlands Antilles">
                    Netherlands Antilles
                  </option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Norfolk Island</option>
                  <option value="Northern Mariana Islands">
                    Northern Mariana Islands
                  </option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pitcairn">Pitcairn</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Reunion">Reunion</option>
                  <option value="Romania">Romania</option>
                  <option value="Russia">Russian Federation</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Kitts and Nevis">
                    Saint Kitts and Nevis
                  </option>
                  <option value="Saint LUCIA">Saint LUCIA</option>
                  <option value="Saint Vincent">
                    Saint Vincent and the Grenadines
                  </option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">
                    Sao Tome and Principe
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia (Slovak Republic)</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia">
                    South Georgia and the South Sandwich Islands
                  </option>
                  <option value="Span">Spain</option>
                  <option value="SriLanka">Sri Lanka</option>
                  <option value="St. Helena">St. Helena</option>
                  <option value="St. Pierre and Miguelon">
                    St. Pierre and Miquelon
                  </option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard">
                    Svalbard and Jan Mayen Islands
                  </option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syria">Syrian Arab Republic</option>
                  <option value="Taiwan">Taiwan, Province of China</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania">Tanzania, United Republic of</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">
                    Trinidad and Tobago
                  </option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos">
                    Turks and Caicos Islands
                  </option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="United States Minor Outlying Islands">
                    United States Minor Outlying Islands
                  </option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Vietnam">Viet Nam</option>
                  <option value="Virgin Islands (British)">
                    Virgin Islands (British)
                  </option>
                  <option value="Virgin Islands (U.S)">
                    Virgin Islands (U.S.)
                  </option>
                  <option value="Wallis and Futana Islands">
                    Wallis and Futuna Islands
                  </option>
                  <option value="Western Sahara">Western Sahara</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>

              <form className="flex flex-col space-y-2">
                <label className="mb-3 text-sm text-[#95B4B3] font-bold">
                  GENDER
                </label>
                <div className="flex flex-col lg:flex-row items-center justify-center space-x-3 space-y-3 lg:space-y-0">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value={maleGender}
                      checked={gender === "Male"}
                      onChange={handleGenderChange}
                      className="form-radio h-4 text-[fcfcfc] checked:bg-[#95B4B3] cursor-pointer w-[50px] scale-150"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value={femaleGender}
                      checked={gender === "Female"}
                      onChange={handleGenderChange}
                      className="form-radio h-4 text-[fcfcfc] checked:bg-[#95B4B3] cursor-pointer w-[50px] scale-150"
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value={otherGender}
                      checked={gender === "Others"}
                      onChange={handleGenderChange}
                      className="form-radio h-4 text-[fcfcfc] checked:bg-[#95B4B3] cursor-pointer w-[50px] scale-150"
                    />
                    Others
                  </label>
                </div>
              </form>

              <div>
                <label className="mb-3 text-sm text-[#95B4B3] font-bold">
                  PHONE NUMBER
                </label>
                <br />
                <div className="flex flex-row space-x-3">
                  <DialCode countryCode={countryCode} />
                  <input
                    type="number"
                    placeholder="phone number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    className="lg:w-[60%] w-auto h-[2.5rem] rounded-[5px] p-2 text-sm  border-b border-[#95B4B3] text-[#0F1732]"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div>
          {/* button calculate/ submit */}
          <div className="my-8 w-[90vw] flex items-center justify-center">
            <button
              onClick={handleEditBtn}
              className="p-3 bg-[#95B4B3] text-[#0F1732] mb-8 flex items-center justify-center"
            >
              Save
            </button>
            {/* <div>Your score: {scorePoints1GW1} points</div> */}
          </div>

          <div
            ref={save2Ref}
            className="fixed top-1/2 left-1/2 p-10 z-[1000]"
            style={{ transform: "translate(-50%, -50%)", display: "none" }}
          >
            <div className="w-[21rem] lg:w-[29.875rem] h-[18.6487rem] bg-[#000000] border-b border-[#2F3336] flex flex-col justify-center items-center rounded-md">
              <MdOutlineVerifiedUser className="p-3 text-[#42cf42] text-7xl" />
              <h3 className="text-xl leading-[2.5rem] text-center font-medium text-[#95B4B3] mb-3">
                Are you sure you want to save new Informations
              </h3>
              <label>
                <div className="flex flex-row items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isCheckboxCheckedTerms}
                    onChange={handleCheckboxChange}
                  />
                  <Link to="/terms-and-privacy">
                    <span className="text-[#fcfcfc] mr-3 text-[0.9em] underline">
                      I have read and agree to the Terms and Privacy policy
                    </span>
                  </Link>
                </div>
              </label>
              <div className="flex flex-row">
                <button
                  onClick={handleEditBtn3}
                  className="p-3 w-[5em] mr-2 bg-[#95B4B3] text-white hover:bg-white hover:border hover:border-[#95B4B3] hover:text-[#95B4B3] rounded-lg py-2  my-5  justify-center items-center text-center"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    handleEditBtn2();
                    //   handleContext();
                  }}
                  disabled={!isCheckboxCheckedTerms}
                  className="p-3 w-[5em] mr-2 bg-[#95B4B3] text-white hover:bg-white hover:border hover:border-[#95B4B3] hover:text-[#95B4B3] rounded-lg py-2  my-5  justify-center items-center text-center"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>

          {/* confirmed alert */}
          <div
            ref={confirmedRef}
            className="fixed top-1/2 left-1/2 p-10 z-[1000]"
            style={{ transform: "translate(-50%, -50%)", display: "none" }}
          >
            <div className="w-[21rem] lg:w-[29.875rem] h-[18.6487rem] bg-white flex flex-col justify-center items-center rounded-md">
              <GiConfirmed className="p-3 text-[#95B4B3] text-7xl" />
              <h3 className="text-2xl leading-[2.5rem] text-center font-medium text-[#000000A6]">
                Successful
              </h3>
              <p className="font-normal text-base leading-5 text-center text-[#0000008A] mt-2">
                Your Profile has been saved
              </p>
            </div>
          </div>

          {/* unconfirmed alert */}
          <div
            ref={unconfirmedRef}
            className="fixed top-1/2 left-1/2 p-10 z-[1000]"
            style={{ transform: "translate(-50%, -50%)", display: "none" }}
          >
            <div className="w-[21rem] lg:w-[29.875rem] h-[18.6487rem] bg-white flex flex-col justify-center items-center rounded-md">
              <MdOutlineClose className="p-3 text-red-500 text-7xl" />
              <h3 className="text-2xl leading-[2.5rem] text-center font-medium text-[#000000A6]">
                Sorry, we can’t Update your profile now
              </h3>
              <p className="font-normal text-base leading-5 text-center text-[#0000008A] mt-2">
                Check your internet connection and try again
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEditBtn;
