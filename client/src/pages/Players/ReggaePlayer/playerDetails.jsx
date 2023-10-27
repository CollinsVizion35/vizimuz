import React from "react";
import { AppPass } from "../../../contexts/AppContext";

function PlayerDetails() {
  const {
    reggaes,
    currentSongIndex,
    playerImage4Ref,
    playerName4Ref,
    playerArtist4Ref,
  } = AppPass();

  return (
    <div className="flex flex-row items-center w-[70%]">
      <img
        src={reggaes[currentSongIndex].img}
        ref={playerImage4Ref}
        className="w-[50px] h-[50px] rounded-[5px] mr-2"
        alt="artist"
      ></img>
      <div>
        <h3 ref={playerName4Ref} className="text-[1em]">
          {reggaes[currentSongIndex].name}
        </h3>
        <h3 ref={playerArtist4Ref} className="text-[0.8em]">
          {reggaes[currentSongIndex].artist}
        </h3>
      </div>
    </div>
  );
}

export default PlayerDetails;
