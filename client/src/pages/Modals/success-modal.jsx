import React from "react";
import successIcon from "../../imgs/success-icon.svg";
import ReactDOM from "react-dom";

const SuccessModal = ({
  open,
  modalSuccessMsgTitle,
  modalSuccessMsgDetails,
}) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#63636354] z-[1000]" />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 p-10 z-[1000]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="w-[21rem] lg:w-[29.875rem] h-[18.6487rem] bg-white flex flex-col justify-center items-center">
          <img
            className="w-[6.25rem] h-[6.25rem]"
            src={successIcon}
            alt="success icon"
          />
          <h3 className="text-2xl leading-[2.5rem] text-center font-medium text-[#000000A6]">
            {modalSuccessMsgTitle}
          </h3>
          <p className="font-normal text-base leading-5 text-center text-[#0000008A] mt-2">
            {modalSuccessMsgDetails}
          </p>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default SuccessModal;
