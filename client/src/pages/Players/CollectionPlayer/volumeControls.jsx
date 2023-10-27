import React from "react";
import { FaVolumeUp, FaVolumeMute, FaVolumeDown } from "react-icons/fa/index";
import VolumeSlider from "./volumeSlider";
import { AppPass } from "../../../contexts/AppContext";

function VolumeControls() {
  const { playerAudioRef, volume, setVolume } = AppPass();

  const onChange = (e) => {
    const audio = playerAudioRef.current;
    audio.volume = volume;
    setVolume(e.target.value);
  };

  return (
    <div className=" hidden lg:flex flex-row items-center">
      {volume === "0" ? (
        <FaVolumeMute className="mr-2" />
      ) : volume > "0" && volume <= "0.5" ? (
        <FaVolumeDown className="mr-2" />
      ) : (
        <FaVolumeUp className="mr-2" />
      )}
      <VolumeSlider onChange={onChange} />
    </div>
  );
}

export default VolumeControls;
