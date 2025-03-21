import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found";
  });

  return (
    <>
      <div className="text-center flex h-screen">
        <div id="page-wrap" className="w-full bg-[#000000] border-b border-[#2F3336]">
          <div className="flex">
            <div className="w-full py-8 px-8 md:px-14">
              <div className="flex flex-col justify-center items-center min-h-screen">
                <h4 className="text-lg md:text-xl lg:text-3xl text-[#E7E9EA] mb-8 font-semibold font-Nunito">
                  404 Page Not Found
                </h4>
                <Link to="/profile">
                  <p className="underline decoration-[#E7E9EA] text-[#E7E9EA] text-base">
                    Go back to sign in
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
