// import React, { useRef, useState } from "react";

// import homeIcon from "../../imgs/Home.svg";
// import collectionIcon from "../../imgs/playlist.svg";
// import radioIcon from "../../imgs/radio.svg";
// import musicVidIcon from "../../imgs/videos.svg";
// import profileIcon from "../../imgs/profile.svg";
// import logoutIcon from "../../imgs/Logout.svg";
// import logo from "../../imgs/logo.svg";

// import { TbMenu, TbSearch } from "react-icons/tb/index";

// import Logout from "../SignInUp/logout";
// import { Link, useNavigate } from "react-router-dom";
// import SearchArtist from "../Home/searchArtist";

// import { MdHomeFilled, MdLibraryMusic } from "react-icons/md/index";
// import { RiRadio2Fill, RiLogoutBoxRFill } from "react-icons/ri/index";
// import { HiFilm } from "react-icons/hi/index";
// import { BsFillPersonFill } from "react-icons/bs/index";

// const options = [
//   {
//     id: 0,
//     img: MdHomeFilled,
//     text: "Home",
//     navigate: "/home",
//   },
//   {
//     id: 1,
//     img: MdLibraryMusic,
//     text: "My Collections",
//     navigate: "/collection",
//   },
//   {
//     id: 2,
//     img: RiRadio2Fill,
//     text: "Radio",
//     navigate: "/radio",
//   },
//   {
//     id: 3,
//     img: HiFilm,
//     text: "Music Videos",
//     navigate: "/musicvideos",
//   },
//   {
//     id: 4,
//     img: BsFillPersonFill,
//     text: "Profile",
//     navigate: "/profile",
//   },
// ];

// const Sidebar = ({ props }) => {
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const [showSideBar, setShowSideBar] = useState(true);
//   const tabRef = useRef();
//   const searchRef = useRef();

//   const handleLogout = () => {
//     setShowLogoutModal(true);
//     setShowSideBar(false);
//   };

//   const handleShowSideBar = () => {
//     setShowSideBar(false);
//   };
//   const handleShowSearchBar = (event) => {
//     setIsSearchActive((current) => !current);
//   };

//   const [isActive, setIsActive] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);

//   const handleClick = (event) => {
//     setIsActive((current) => !current);
//   };

//   const navigate = useNavigate();

//   return (
//     // Pass on our props
//     <div className="flex flex-col items-center">
//       <div className="flex flex-row items-center justify-between mx-auto h-[3em] p-3 mt-3">
//         <div className="w-[85vw] flex flex-row items-center">
//           <button onClick={handleClick} className="mr-3">
//             <TbMenu />
//           </button>
//           <img src={logo} alt="home icon" />
//         </div>

//         <button onClick={handleShowSearchBar} className="w-[10vw] float-right">
//           <TbSearch />
//         </button>
//       </div>

//       <div
//         ref={searchRef}
//         className={!isSearchActive ? "hidden" : "block x-[999999999999]"}
//       >
//         <SearchArtist />
//       </div>
//       <div
//         showSideBar={showSideBar}
//         ref={tabRef}
//         left
//         {...props}
//         className={
//           !isActive
//             ? "hidden"
//             : "block absolute top-0 left-0 w-[100vw] h-screen mt-[4em] bg-[#1D2123] text-white z-[999999]"
//         }
//       >
//         {options.map((option) => {
//           return (
//             <>
//               <div className="flex flex-col my-8 pl-4">
//                 <Link
//                   className="flex justify-start  items-center pl-2"
//                   to={option.navigate}
//                 >
//                   <option.img className="mr-5" />
//                   <p onClick={handleShowSideBar} className="text-base">
//                     {option.text}
//                   </p>
//                 </Link>
//               </div>
//             </>
//           );
//         })}
//         <div className="flex pl-4 cursor-pointer mt-8">
//           <div
//             onClick={handleLogout}
//             className="flex justify-start text-center pl-2"
//           >
//             <RiLogoutBoxRFill className="mr-5" />
//             <p className=" font-Poppins text-base">Logout</p>
//           </div>
//           {showLogoutModal === true && (
//             <Logout
//               showLogoutModal={showLogoutModal}
//               setShowLogoutModal={setShowLogoutModal}
//             />
//           )}
//         </div>

//         <button  onClick={() => navigate('/upload_music')} className="w-fit ml-4 mt-16 bg-[#9600ffcc] p-3 rounded-[20px] cursor-pointer">
//             Upload Music
//           </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import {
  MdCollectionsBookmark,
  MdHeadphones,
  MdOutlineHistory,
  MdOutlineSettings,
  MdOutlineSettingsPower,
  MdOutlineStadium,
  MdOutlineWaterfallChart,
  MdRadio,
  MdTableRows,
} from "react-icons/md";
import { HiOutlineDotsVertical, HiOutlineTable } from "react-icons/hi";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { GiSoccerKick } from "react-icons/gi";
import logo from "../../imgs/logo.svg";
import { RiMovieFill } from "react-icons/ri";

function Sidebar() {
  

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // toggle color navbar
  const location = useLocation();

  const isPageInRoute = (route) => {
    return location.pathname === route;
  };

  return (
    <>
     <div className="fixed top-0 left-0 p-6 flex items-center justify-center bg-[#1A1E1F] w-screen z-[99999999999]">
           
           <img src={logo} alt="home icon" />
         </div>


      <div className="lg:hidden flex flex-row justify-around fixed bottom-0 left-0 w-[100vw] rounded-t-md bg-[#1A1E1F] border-t-1 border-[#9600ffcc] py-4 z-[99999999999]">
        <Link to="/home">
          <div 
            className={`flex flex-col text-[1em] items-center space-y-1 ${
              isPageInRoute("/home") ||
              isPageInRoute("/music/:artist/:text/:id")
                ? "text-[#9600ffcc]"
                : "text-[#fcfcfc]"
            }`}
          >
          <MdHeadphones/>

            <div className="text-[0.5em]">Home</div>
          </div>
        </Link>

        <Link to="/collection">
          <div 
            className={`flex flex-col text-[1em] items-center space-y-1 ${
              isPageInRoute("/collection") ||
              isPageInRoute("/likes")
                ? "text-[#9600ffcc]"
                : "text-[#fcfcfc]"
            }`}
          >

<MdCollectionsBookmark/>
            <div className="text-[0.5em]">Collection</div>
          </div>
        </Link>

        <Link to="/radio">
          <div 
            className={`flex flex-col text-[1em] items-center space-y-1 ${
              isPageInRoute("/radio") 
                ? "text-[#9600ffcc]"
                : "text-[#fcfcfc]"
            }`}
          >

<MdRadio/>
            <div className="text-[0.5em]">Radio</div>
          </div>
        </Link>
        
        
        <Link to="/musicvideos">
          <div 
            className={`flex flex-col text-[1em] items-center space-y-1 ${
              isPageInRoute("/musicvideos") 
                ? "text-[#9600ffcc]"
                : "text-[#fcfcfc]"
            }`}
          >
          <RiMovieFill/>

            <div className="text-[0.5em]">Videos</div>
          </div>
        </Link>


<Link to="/profile">
  <div 
    className={`flex flex-col text-[1em] items-center space-y-1 ${
      isPageInRoute("/profile") ||
      isPageInRoute("/editprofile") ||
      isPageInRoute("/signup") ||
      isPageInRoute("/signOut") 
        ? "text-[#9600ffcc]"
        : "text-[#fcfcfc]"
    }`}
  >

<FaRegUserCircle/>
    <div className="text-[0.5em]">Profile</div>
  </div>
</Link>


        <Link to="/settings">
          <div 
            className={`flex flex-col text-[1em] items-center space-y-1 ${
              isPageInRoute("/settings") 
                ? "text-[#9600ffcc]"
                : "text-[#fcfcfc]"
            }`}
          >

<HiOutlineDotsVertical/>
            <div className="text-[0.5em]">More</div>
          </div>
          </Link>
      </div>
    </>
  );
}

export default Sidebar;

