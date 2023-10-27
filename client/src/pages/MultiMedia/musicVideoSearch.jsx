/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { AppPass } from '../contexts/AppContext';

import searchIcon from "../../imgs/search.svg";

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

  return (
    <>
      <div className="bg-[#1D2123] text-white">
        <div>
          {/* {token ? */}
          <form
            className="relative w-[30vw] float-left pl-2 pb-3 mx-auto items-center justify-center"
            onSubmit={searchVideos}
          >
            <input
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="search music video"
              className=" bg-[#1D2123] lg:px-20 w-[95vw] ml-[1.5vw] px-10 py-2 rounded-[50px]"
            />
            <img
              src={searchIcon}
              onClick={searchVideos}
              className="w-[20px] absolute top-0 left-0 py-2 ml-3 cursor-pointer"
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
                    <div className="text-[#9600ffcc]">{video.video.title}</div>
                    <div className="text-[#95B4B3]">
                      {video.video.publishedTimeText}
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="h-screen w-full mx-auto text-center items-center pt-[4em] lg:my-auto">
              Search For a Music Video and get your result
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MusicVideoSearch;
