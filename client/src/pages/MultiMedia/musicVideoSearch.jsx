/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { AppPass } from '../contexts/AppContext';

import searchIcon from "../../imgs/search.svg";
import { useColorTheme } from "../../contexts/colorContext/useColorTheme";

const MusicVideoSearch = () => {
  // const {token} = AppPass()

  const [searchKey, setSearchKey] = useState("");
  const [videos, setVideos] = useState([]);
  const [canShow, setCanShow] = useState(false);

  const searchVideos = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://youtube138.p.rapidapi.com/search/",
      {
        headers: {
          "X-RapidAPI-Key":
            "6ed6cedd6fmshd8e759bfbb8f31ep15789fjsnb435e620a8a3",
          "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
        },
        params: {
          q: searchKey,
          hl: "en",
          gl: "US",
          type: "video",
          maxResults: 2,
        },
      }
    );
    console.log(data.contents.slice(0, 9));

    const filtered = data.contents.slice(0, 9).filter((video) => {
      return video.type === "video";
    });
    setVideos(filtered);

    console.log(filtered);
  };

  useEffect(() => {
    const timer = setTimeout(() => setCanShow(true), 5000);
    return () => clearTimeout(timer);
  });
      
      const { isDark } = useColorTheme();

  return (
    <>
      <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"}  border-b border-[#2F3336] `}>
        <div>
          {/* {token ? */}
          <form
            className="relative w-[30vw] float-left pl-2 pb-3 mx-auto items-center justify-center mt-12 lg:mt-24"
            onSubmit={searchVideos}
          >
            <input
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="search music video"
              className=" bg-inherit border-b border-[#2F3336] lg:px-20 w-[75vw] lg:w-[60vw] lg:ml-[1.5vw] px-12 py-2 rounded-[50px] lg:border border-2 border-[#040C25]"
            />
            <img
              src={searchIcon}
              onClick={searchVideos}
              className="w-[20px] py-2 ml-3 cursor-pointer absolute top-1/3 lg:left-12 left-4 z-[1000]"
              style={{ transform: "translate(-50%, -50%)"}}
              alt="search icon"
            />
          </form>

          {/* : <h2>Loading...</h2>
                    } */}
        </div>

        <div>
          {videos.length > 0 ? (
            videos.map((video, watch) => {
              return (
                <>
                  <div key={watch} className="w-[90vw] my-2">
                    <iframe
                      className="w-[100%] h-[50vh]"
                      src={`https://www.youtube.com/embed/${video.video.videoId}`}
                      title={video.video.title}
                    ></iframe>
                    <div className="text-[#E7E9EA]">{video.video.title}</div>
                    <div className="text-[#95B4B3]">
                      {video.video.publishedTimeText}
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="h-screen w-full mx-auto text-center items-center pt-40 lg:my-auto">
              Search For a Music Video and get your result
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MusicVideoSearch;
