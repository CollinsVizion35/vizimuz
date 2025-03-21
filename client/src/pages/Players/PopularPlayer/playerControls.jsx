import React from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";
import { BsShuffle } from "react-icons/bs";
import { TbRepeatOnce } from "react-icons/tb";
import Slider from "./slider";
import { AppPass } from "../../../contexts/AppContext";
import { useColorTheme } from "../../../contexts/colorContext/useColorTheme";

function PlayerControls(props) {
  const {
    popular,
    percentage,
    setPercentage,
    playerAudio7Ref,
    repeat,
    setRepeat,
    shuffle,
    setShuffle,
  } = AppPass();

  const onChange = (e) => {
    const audio = playerAudio7Ref.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };
      
    const { isDark } = useColorTheme();

  return (
    <div className="flex flex-col items-center w-[60vw]">
      <div className="flex flex-row items-center w-[40vw] lg:justify-between ml-[50%] lg:ml-[0px] mb-2">
        <button
          className={
            shuffle ? "hidden lg:block" : "hidden lg:block text-[#E7E9EA]"
          }
          onClick={() => {
            setShuffle(!shuffle);
            console.log(shuffle);
          }}
        >
          <BsShuffle />
        </button>
        <button
          className="hidden lg:block"
          onClick={() => props.SkipSong(false)}
        >
          <FaStepBackward />
        </button>
        <button
          className={`${isDark ? "bg-white text-[#0F1419]" : "bg-black text-white"} p-3 bg-[#E7E9EA] text-[#000000] rounded-[50%] mr-3 lg:mr-[0px]`}
          onClick={() => props.setIsPlaying(!props.isPlaying)}
        >
          {props.isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={() => props.SkipSong()}>
          <FaStepForward />
        </button>
        <button
          className={
            repeat ? "hidden lg:block" : "hidden lg:block text-[#E7E9EA]"
          }
          onClick={() => {
            setRepeat(!repeat);
            console.log(repeat);
            console.log(popular.length);
          }}
        >
          <TbRepeatOnce />
        </button>
      </div>

      <div>
        <Slider percentage={percentage} onChange={onChange} />
      </div>
    </div>
  );
}

export default PlayerControls;
