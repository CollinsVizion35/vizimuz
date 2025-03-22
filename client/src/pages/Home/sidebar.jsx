// import React, { useRef, useState } from "react";

// import homeIcon from "../../imgs/Home.svg";
// import collectionIcon from "../../imgs/playlist.svg";
// import radioIcon from "../../imgs/radio.svg";
// import musicVidIcon from "../../imgs/videos.svg";
// import profileIcon from "../../imgs/profile.svg";
// import logoutIcon from "../../imgs/Logout.svg";
// import logo from "../../imgs/vizimuz_logo.png";

// import { TbMenu, TbSearch } from "react-icons/tb";

// import Logout from "../SignInUp/logout";
// import { Link, useNavigate } from "react-router-dom";
// import SearchArtist from "../Home/searchArtist";

// import { MdHomeFilled, MdLibraryMusic } from "react-icons/md";
// import { RiRadio2Fill, RiLogoutBoxRFill } from "react-icons/ri";
// import { HiFilm } from "react-icons/hi";
// import { BsFillPersonFill } from "react-icons/bs";

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
//           <img src={logo} className="w-[35px] h-[35px]" alt="home icon" />
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
//             : "block absolute top-0 left-0 w-[100vw] h-screen mt-[4em] bg-[#000000] border-b border-t border-[#2F3336] text-white z-[999999]"
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

//         <button  onClick={() => navigate('/upload_music')} className="w-fit ml-4 mt-16 bg-[#E7E9EA] text-[#000000] p-3 rounded-[20px] cursor-pointer">
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiSoccerKick } from "react-icons/gi";
import logo from "../../imgs/vizimuz_logo.png";
import { RiMovieFill } from "react-icons/ri";
import SearchArtist from "./searchArtist";

function Sidebar() {
  

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // toggle color navbar
  const location = useLocation();

  const isPageInRoute = (route) => {
    return location.pathname === route;
  };

  
  const navigate = useNavigate();

  return (
    <>
     <div className="fixed top-0 left-0 p-3 py-6 flex flex-row items-center justify-between bg-[#000000] border-b border-t border-[#2F3336] w-screen z-[99999999999]">
           
           <img src={logo} className="w-[35px] h-[35px]" alt="home icon" />

           <div className="flex flex-row w-[65vw] items-center justify-between">
            <div className="w-[50vw]">
           <SearchArtist />
           </div>
          <button
            onClick={() => navigate("/upload_music")}
            className="w-fit relative bg-[#E7E9EA] text-[#000000] p-2 rounded-[20px] cursor-pointer"
          >
            Upload
          </button>
           </div>
         </div>


      <div className="lg:hidden flex flex-row justify-around fixed bottom-0 left-0 w-[100vw]  bg-[#000000] border-b border-t border-[#2F3336]  py-4 z-[99999999999]">
        <Link to="/home">
          <div 
            className={`flex flex-col text-[1em] items-center space-y-1 text-[#E7E9EA] ${
              isPageInRoute("/home") ||
              isPageInRoute("/music/:artist/:text/:id")
                ? "font-black"
                : "font-light"
            }`}
          >
          <MdHeadphones/>

            <div className="text-[0.5em]">Home</div>
          </div>
        </Link>

        <Link to="/collection">
          <div 
            className={`flex flex-col text-[1em] items-center space-y-1 text-[#E7E9EA] ${
              isPageInRoute("/collection") ||
              isPageInRoute("/likes")
                ? "font-black"
                : "font-light"
            }`}
          >

<MdCollectionsBookmark/>
            <div className="text-[0.5em]">Collection</div>
          </div>
        </Link>

        <Link to="/radio">
          <div 
            className={`flex flex-col text-[1em] items-center space-y-1 text-[#E7E9EA] ${
              isPageInRoute("/radio") 
                ? "font-black"
                : "font-light"
            }`}
          >

<MdRadio/>
            <div className="text-[0.5em]">Radio</div>
          </div>
        </Link>
        
        
        <Link to="/musicvideos">
          <div 
            className={`flex flex-col text-[1em] items-center space-y-1 text-[#E7E9EA] ${
              isPageInRoute("/musicvideos") 
                ? "font-black"
                : "font-light"
            }`}
          >
          <RiMovieFill/>

            <div className="text-[0.5em]">Videos</div>
          </div>
        </Link>


<Link to="/profile">
  <div 
    className={`flex flex-col text-[1em] items-center space-y-1 text-[#E7E9EA] ${
      isPageInRoute("/profile") ||
      isPageInRoute("/editprofile") ||
      isPageInRoute("/signup") ||
      isPageInRoute("/signOut") 
        ? "font-black"
        : "font-light"
    }`}
  >

<FaRegUserCircle/>
    <div className="text-[0.5em]">Profile</div>
  </div>
</Link>


        <Link to="/settings">
          <div 
            className={`flex flex-col text-[1em] items-center space-y-1 text-[#E7E9EA] ${
              isPageInRoute("/settings") 
                ? "font-black"
                : "font-light"
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

