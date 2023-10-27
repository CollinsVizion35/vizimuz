import React, { useEffect } from "react";
import PlayerControls from "./playerControls";
import PlayerDetails from "./playerDetails";
import VolumeControls from "./volumeControls";
import { AppPass } from "../../../contexts/AppContext";

function Player() {
  const {
    tTunes,
    currentSongIndex,
    setCurrentSongIndex,
    isPlaying,
    setIsPlaying,
    setDuration,
    setCurrentTime,
    setPercentage,
    playerAudio5Ref,
    repeat,
    shuffle,
  } = AppPass();

  useEffect(() => {
    if (isPlaying) {
      setTimeout(() => {
      playerAudio5Ref.current.play();
    }, 500);
    } else {
      
        playerAudio5Ref.current.pause();
    }
  });

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));

    console.log(percent);

    if (percent > 99.5) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;

        if (temp > tTunes.length - 1) {
          temp = 0;
        }

        return temp;
      });
    }

    if (!shuffle && percent > 99.5) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp = Math.floor(Math.random() * tTunes.length - 1);

        return temp;
      });
    }

    if (!repeat && percent > 99.5) {
      setCurrentSongIndex(() => {
        const audio = playerAudio5Ref.current;
        audio.currentTime = 0;
        setPercentage(0);
        let temp = currentSongIndex;

        return temp;
      });
    }

    if (!repeat && !shuffle && percent > 99.5) {
      setCurrentSongIndex(() => {
        const audio = playerAudio5Ref.current;
        audio.currentTime = 0;
        setPercentage(0);
        let temp = currentSongIndex;

        return temp;
      });
    }
  };

  const SkipSong = (fowards = true) => {
    if (fowards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;

        if (temp > tTunes.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else if (!fowards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = tTunes.length - 1;
        }

        return temp;
      });
    }

    if (!shuffle && fowards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp = Math.floor(Math.random() * tTunes.length - 1);

        return temp;
      });
    }

    if (!repeat) {
      setCurrentSongIndex(() => {
        const audio = playerAudio5Ref.current;
        audio.currentTime = 0;
        setPercentage(0);
        let temp = currentSongIndex;

        return temp;
      });
    }
  };

  return (
    <div className="flex flex-col z-[999999999] w-screen bg-[#1A1E1F] bg-opacity-[95%] px-2 mt-12 text-white">
      <audio
        src={tTunes[currentSongIndex].audio}
        ref={playerAudio5Ref}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2));
        }}
      ></audio>

      <div className="flex flex-row items-center justify-between mx-2 my-4">
        <PlayerDetails song={tTunes[currentSongIndex]} className="w-[50%]" />
        <PlayerControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          SkipSong={SkipSong}
          className="w-[50%]"
        />
        <VolumeControls />
      </div>
    </div>
  );
}

export default Player;
