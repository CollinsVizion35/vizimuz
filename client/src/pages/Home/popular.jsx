import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

// import {SiSpotify} from 'react-icons/si';
// import axios from 'axios'
import { AppPass } from "../../contexts/AppContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useColorTheme } from "../../contexts/colorContext/useColorTheme";

const Popular = () => {
  const {
    popular,
    currentSongIndex,
    isPlaying,
    setIsPlaying,
    setDuration,
    getCurrDuration,
    playerAudioRef,
    playerImageRef,
    playerNameRef,
    playerArtistRef,
  } = AppPass();

  const audioEl = useRef(null);
  audioEl.current = [];
  const audioToEl = (el) => {
    if (el && !audioEl.current.includes(el)) {
      audioEl.current.push(el);
    }
  };

  const imageEl = useRef(null);
  imageEl.current = [];
  const imageToEl = (el) => {
    if (el && !imageEl.current.includes(el)) {
      imageEl.current.push(el);
    }
  };

  const musicNameEl = useRef(null);
  musicNameEl.current = [];
  const musicNameToEl = (el) => {
    if (el && !musicNameEl.current.includes(el)) {
      musicNameEl.current.push(el);
    }
  };

  const artistNameEl = useRef(null);
  artistNameEl.current = [];
  const artistNameToEl = (el) => {
    if (el && !artistNameEl.current.includes(el)) {
      artistNameEl.current.push(el);
    }
  };

  const musicBoxEl = useRef(null);
  musicBoxEl.current = [];
  const musicBoxToEl = (el) => {
    if (el && !musicBoxEl.current.includes(el)) {
      musicBoxEl.current.push(el);
    }
  };

  const audioSignEl = useRef(null);
  audioSignEl.current = [];
  const audioSignToEl = (el) => {
    if (el && !audioSignEl.current.includes(el)) {
      audioSignEl.current.push(el);
    }
  };

  // swipper containers
const getSlidesPerView = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 992) {
    return 7;
  } else if (screenWidth >= 768) {
    return 4;
  } else {
    return 2.5;
  }
};

const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

const handleResize = () => {
  setSlidesPerView(getSlidesPerView());
};

useEffect(() => {
  // Update slidesPerView on window resize
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const { isDark } = useColorTheme();

  return (
    <>
      <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"} flex flex-col bg-[#000000] border-b border-[#2F3336] lg:w-[90vw]  w-[95vw] m-auto max-w-[1440px]  lg:px-4 float-right `}>
      <div className="flex flex-row justify-between w-[100%]  pt-4 items-baseline">
        <h1 className="font-black">Popular in your area</h1>
        <h1 className=" opacity-70 text-[0.8em]">View more</h1>
        </div>

        <div className="flex flex-row justify-between py-4 pt-2 lg:w-[90%] w-[95vw]">
          <Swiper
            spaceBetween={20}
            slidesPerView={slidesPerView}
          >
            {popular.map((populae, index) => {
              return (
                <SwiperSlide>
                  <>
                    <div
                      key={index}
                      ref={musicBoxToEl}
                      onClick={() => {
                        console.log(imageEl.current);
                        console.log(audioEl.current[index]);
                        console.log(musicNameEl.current[index]);
                        console.log(artistNameEl.current[index]);
                        console.log(popular[currentSongIndex].name);
                        // musicBoxEl.current[0].style.display = 'none'
                        // musicBoxEl.current[0].style.scale = '0'
                        console.log(isPlaying);

                        console.log(playerAudioRef.current.currentSrc);
                        console.log(playerImageRef.current.outerHTML);
                        console.log(imageEl);
                        console.log(playerNameRef.current.innerHTML);
                        console.log(playerArtistRef.current.innerHTML);
                        isPlaying === true
                          ? setIsPlaying(isPlaying)
                          : setIsPlaying(!isPlaying);
                        playerAudioRef.current.src = audioEl.current[index].src;
                        playerImageRef.current.src = imageEl.current[index].src;
                        console.log(audioSignEl.current[index]);
                        console.log(audioSignEl.current);
                        // !audioSignEl.current[index] === true ? audioSignEl.current.style.display = 'none' : audioSignEl.current.style.display = 'block'
                        // audioSignEl.current[index].style.display = 'block'
                        playerNameRef.current.innerHTML =
                          musicNameEl.current[index].innerHTML;
                        playerArtistRef.current.innerHTML =
                          artistNameEl.current[index].innerHTML;
                      }}
                      className="flex flex-col relative text-left my-3 mx-auto cursor-pointer"
                    >
                      <audio
                        src={populae.audio}
                        ref={audioToEl}
                        onTimeUpdate={getCurrDuration}
                        onLoadedData={(e) => {
                          setDuration(e.currentTarget.duration.toFixed(2));
                        }}
                      ></audio>
                      <img
                        className="lg:w-[200px] w-[150px] h-[150px] rounded-[5px] mb-2"
                        title={populae.img}
                        ref={imageToEl}
                        src={populae.img}
                        alt="artist"
                      />
                      <h2
                        ref={musicNameToEl}
                        className=" text-[1em]"
                      >
                        {populae.name}
                      </h2>
                      <h5
                        ref={artistNameToEl}
                        className=" text-[.6em] opacity-70"
                      >
                        {populae.artist}
                      </h5>
                    </div>
                    <div
                      ref={audioSignToEl}
                      className="w-max p-2 bg-[#E7E9EA] text-[#000000] absolute mt-4 mr-4 rounded-[5px] top-0 left-0 hidden"
                    >
                      <FaVolumeUp />
                    </div>
                  </>
                </SwiperSlide>
              );
            })}
          </Swiper>

        </div>
      </div>
    </>
  );
};

export default Popular;
