import React, { useEffect } from "react";
import { SiSpotify } from "react-icons/si/index";
import "../index.css";
import { useNavigate } from "react-router-dom";
// import axios from 'axios'
// import notAvailable from '../imgs/No-Photo-Available.jpg'
import { Fade, JackInTheBox, Slide } from "react-awesome-reveal";

import logo from "../imgs/logo.svg";

const Welcome = () => {
  const navigate = useNavigate();

  const CLIENT_ID = "5526fa4c632d4f06bcd1d00c6e0ff177";
  const REDIRECT_URI = "http://localhost:3000/home";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 3000);
  }, [navigate]);

  return (
    <>
      <div className="welcome bg-[#0F1732] text-white">
        <div className="h-screen w-screen flex flex-col items-center justify-center mx-auto my-auto">
          <div className="flex flex-col items-center justify-center">
            <JackInTheBox triggerOnce={false}>
              <img
                src={logo}
                alt="home icon"
                className="bg-[#000] p-4 rounded-[50%] bg-opacity-[30%]"
              />
            </JackInTheBox>

            <h1 className="mb-2 flex flex-row items-baseline">
              <Slide direction="left">
                <span className="text-[4em] text-[#9600ffcc]">Vizi</span>
              </Slide>
              <Slide direction="right">
                <span className="text-[#95B4B3] text-[2em]">Muz</span>
              </Slide>
            </h1>
          </div>

          <Fade delay={2000}>
            <div
              className="bg-[#FF2E4C] cursor-pointer p-2 px-4 rounded-[50px] w-max flex flex-row gap-2 items-center"
              // href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              Authorized with HANKO.io
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default Welcome;
