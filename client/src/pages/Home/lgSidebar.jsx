import React, { useState } from "react";
import LogoutModal from "../SignInUp/logoutModal";
import { RiLogoutBoxRFill, RiRadio2Fill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HiFilm } from "react-icons/hi";
import { MdHomeFilled, MdLibraryMusic, MdSettings } from "react-icons/md";
import { useColorTheme } from "../../contexts/colorContext/useColorTheme";

const options = [
  {
    id: 0,
    img: MdHomeFilled,
    navigate: "/home",
    color: "#E7E9EA",
  },
  {
    id: 1,
    img: MdLibraryMusic,
    navigate: "/collection",
    color: "#52514E",
  },
  {
    id: 2,
    img: RiRadio2Fill,
    navigate: "/radio",
    color: "#52514E",
  },
  {
    id: 3,
    img: HiFilm,
    navigate: "/musicvideos",
    color: "#52514E",
  },
];

function LgSidebar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
    
  const { isDark } = useColorTheme();

  return (
    <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"} sidebar-lg fixed hidden lg:flex flex-col mt-[2em]`}>
      <div className="flex flex-col justify-between bg-inherit border border-[#2F3336] mx-4 w-[4vw] rounded-[50px] py-4">
        {options.map((option, index) => {
          return (
            <>
              <Link to={option.navigate}>
                <div
                  key={option.id}
                  className="flex my-3 w-1/2 mx-auto items-center cursor-pointer"
                >
                  <option.img
                    className="stroke-black mx-auto w-[40px] hover:scale-[1.2]"
                    style={{ color: option.color }}
                  />
                </div>
              </Link>
            </>
          );
        })}
      </div>

      <div className="flex flex-col justify-between mt-3 bg-inherit border border-[#2F3336] mx-4 w-[4vw] rounded-[50px] my-4 py-4">
        <Link to="/profile">
          <div className="flex my-3 w-1/2 mx-auto items-center cursor-pointer">
            <BsFillPersonFill
              className="mx-auto w-[40px] hover:scale-[1.2]"
              style={{ color: "#52514E" }}
            />
          </div>
        </Link>

        <Link to="/settings">
          <div className="flex my-3 w-1/2 mx-auto items-center cursor-pointer">
            <MdSettings
              className="mx-auto w-[40px] hover:scale-[1.2]"
              style={{ color: "#52514E" }}
            />
          </div>
        </Link>

        <div onClick={() => setShowLogoutModal(true)} className="">
          <div className="flex my-3 w-1/2 mx-auto items-center cursor-pointer">
            <RiLogoutBoxRFill
              className="mx-auto w-[40px] hover:scale-[1.2]"
              style={{ color: "#52514E" }}
            />
          </div>
          {showLogoutModal === true && (
            <LogoutModal
              showLogoutModal={showLogoutModal}
              setShowLogoutModal={setShowLogoutModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LgSidebar;
