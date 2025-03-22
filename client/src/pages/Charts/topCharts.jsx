import React, { useEffect, useState } from "react";
// import { AppPass } from '../contexts/AppContext';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "../../index.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import disc from "../../imgs/disc.png";
import { AppPass } from "../../contexts/AppContext";
import { useColorTheme } from "../../contexts/colorContext/useColorTheme";

const TopChart = () => {
  const { currentAlbumIndex, setCurrentAlbumIndex } = AppPass();

  const [albumList, setAlbumList] = useState([]);
  const [albumInfo, setAlbumInfo] = useState([]);
  const i = 0; // Define the index 'i' here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumCollectionRef = collection(db, "album");
        const querySnapshot = await getDocs(albumCollectionRef);

        const albumData = [];
        querySnapshot.forEach((doc) => {
          albumData.push({ id: doc.id, ...doc.data() });
        });

        // Check if 'i' is within the valid range before setting the state
        if (i >= 0 && i < albumData.length) {
          // setAlbumList(albumData[i].albumData);
          setAlbumList(albumData[i].albumData);
                    setAlbumInfo(albumData[i]);
                    console.log(albumData[i].albumData);
                    const allAlbumList = albumData.map((albumDoc) => albumDoc.albumData).flat();
                    const allAlbumInfo = allAlbumList.map((album) => album.tracks).flat()
                    setAlbumList(allAlbumList);
        }
      } catch (error) {
        console.error("Error fetching album data: ", error);
      }
    };

    fetchData();
  }, []);

  // swipper containers
  const getSlidesPerView = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 992) {
      return 7;
    } else if (screenWidth >= 768) {
      return 4;
    } else {
      return 1.8;
    }
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  const handleResize = () => {
    setSlidesPerView(getSlidesPerView());
  };

  useEffect(() => {
    // Update slidesPerView on window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
  const { isDark } = useColorTheme();

  return (
    <>
      <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"} border-b border-[#2F3336] w-[95vw] lg:w-[40%] flex flex-col `}>
        <div className="flex flex-row justify-between pt-4 w-[100%] items-baseline">
        <h1 className="font-black">Top Album</h1>
        <h1 className=" opacity-70 text-[0.8em]">View more</h1>
        </div>

        <div className="hidden lg:grid pt-2 grid-cols-2 xl:grid-cols-3">
          {albumInfo ? (
            albumList ? (
              albumList.map((newAlbum, index) => (
                <div
                key={index}
                  onClick={() => {
                    setCurrentAlbumIndex(index);
                    console.log("currentAlbumIndex:", currentAlbumIndex, index);
                  }}
                >
                  <Link
                    to={`/album/${newAlbum.artist}/${newAlbum.name}/${albumInfo.id}`}
                  >
                    <div className="mb-2 rounded-[5px] group hover:scale-105">
                      <div className="py-3 pr-3 flex flex-col items-start">
                        <div className="relative ">
                          <img
                            className=" w-[150px] h-[150px] absolute top-0 right-[-40%]"
                            src={disc}
                            alt="album"
                          />
                          <img
                            className="relative w-[150px] h-[150px] z-[9999]"
                            src={newAlbum.image}
                            alt="album"
                          />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-[1em]">{newAlbum.name}</div>
                          <div className="text-[.6em] opacity-[70%]">
                            {newAlbum.artist}
                          </div>
                        </div>
                        <div className="w-[10%]">
                          {/* <div className="border border-gray p-2 rounded-[50%] w-fit">
                    <FaRegHeart className="text-[#E7E9EA] group-hover:text-[#EE4B2B]" />
                  </div> */}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )
          ) : null}
        </div>

        <div className="flex flex-row justify-between py-4 pt-2 w-[95vw]">
          <Swiper spaceBetween={10} slidesPerView={1.9} className="lg:hidden">
            {/* <div className="hidden h-[30vh] lg:flex"> */}
            {albumInfo ? (
              albumList ? (
                albumList.map((newAlbum, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => {
                        setCurrentAlbumIndex(index);
                        console.log(
                          "currentAlbumIndex:",
                          currentAlbumIndex,
                          index
                        );
                      }}
                    >
                      <Link
                        to={`/album/${newAlbum.artist}/${newAlbum.name}/${albumInfo.id}`}
                      >
                        <div className="mb-2 rounded-[2px] w-fit hover:scale-105">
                          <div className="py-3 flex flex-col items-start">
                            <div className="relative">
                              <img
                                className="rounded-[2px] w-[150px] h-[150px] absolute top-0 right-[-40%]"
                                src={disc}
                                alt="album"
                              />
                              <img
                                className="relative w-[150px] h-[150px] z-[9999]"
                                src={newAlbum.image}
                                alt="album"
                              />
                            </div>
                            <div className="flex flex-col">
                              <div className="text-[1em]">{newAlbum.name}</div>
                              <div className="text-[.6em] opacity-70">
                                {newAlbum.artist}
                              </div>
                            </div>
                            <div className="w-[10%]">
                              {/* Your additional content */}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <div>Loading...</div>
              )
            ) : null}

            {/* </div>? */}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TopChart;
