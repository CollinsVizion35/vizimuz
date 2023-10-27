import React from "react";
import { AppPass } from "../../../contexts/AppContext";

function PlayerDetails() {
  const {
    popular,
    currentSongIndex,
    playerImage7Ref,
    playerName7Ref,
    playerArtist7Ref,
  } = AppPass();

  return (
    <div className="flex flex-row items-center w-[70%]">
      <img
        src={popular[currentSongIndex].img}
        ref={playerImage7Ref}
        className="w-[50px] h-[50px] rounded-[5px] mr-2"
        alt="artist"
      ></img>
      <div>
        <h3 ref={playerName7Ref} className="text-[1em]">
          {popular[currentSongIndex].name}
        </h3>
        <h3 ref={playerArtist7Ref} className="text-[0.8em]">
          {popular[currentSongIndex].artist}
        </h3>
      </div>
    </div>
  );
}

export default PlayerDetails;
