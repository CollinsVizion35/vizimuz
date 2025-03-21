import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { UseAuth } from "../../contexts/AuthContext";

const Logout = ({ open, showLogoutModal, setShowLogoutModal }) => {
  const auth = getAuth();
  const navigate = useNavigate();

  const { signOutUser } = UseAuth()

  const logoutRef = useRef();

  const handleLogout = async () => {
    try {
      await signOut(auth).then(() => navigate("/home"));
    } catch (e) {
      console.log(e.message);
    }
    localStorage.removeItem("none");
    localStorage.removeItem("flex");
  };

  useEffect(() => {
    logoutRef.current.style.display = "none"
  }, [])

  const handleHideModal = () => {
    logoutRef.current.style.display = "none",
    navigate("/home")
  }
  

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div ref={logoutRef} className="fixed top-0 left-0 right-0 bottom-0 bg-[#63636354] z-[1000]" />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 p-10 z-[1000]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-[17rem] h-[15rem] lg:w-[28rem] lg:h-[16.5rem] bg-white flex flex-col justify-center items-center">
          {/* <div className='flex justify-items-end justify-end cursor-pointer'>
                  <img className='text-[#777] h-4' onClick={() => setShowLogoutModal(false)} src={closeModalIcon} alt="close icon"/>
                </div> */}
          <h3 className="text-2xl leading-[2.5rem] text-center text-[#7772D3] font-bold">
            Log out
          </h3>
          <p className="font-normal text-base leading-5 text-center text-[#0000008A] mt-2">
            Are you sure you want to log out?
          </p>
          <div className="mt-6">
            <button
              onClick={ handleHideModal }
              className="mr-4 rounded-md bg-[#7772D3] px-7 py-2 text-white"
            >
              No
            </button>
            <button
              onClick={signOutUser}
              className="rounded-md bg-[#EBEAFD] hover:bg-[#63636354] px-7 py-2 text-black hover:text-white"
            >
              Yes
            </button>
          </div>
        </div>
        {/* text-[#000000A6] */}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Logout;
