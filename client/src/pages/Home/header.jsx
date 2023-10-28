import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectCoverflow, Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import reggae from "/reggae.jpg";
import afro from "/afrobeat.jpg";
import rb from "/r&b.webp";
import hiphop from "/hiphop.jpg";
import jazz from "/jazz.jpg";
import user1 from "../../imgs/Ellipse 2.svg";
import user2 from "../../imgs/Ellipse 3.svg";
import user3 from "../../imgs/Ellipse 4.svg";
import user4 from "../../imgs/Ellipse 5.svg";
import user5 from "../../imgs/Ellipse 6.svg";
import vectorImg from "../../imgs/Vector.svg";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const playlists = [
  {
    id: 0,
    name: "R & B Hits",
    img: rb,
    desc: "All mine, Lie again, Petty call me everyday, Out of time, No love, Bad habit, and so much more",
  },
  {
    id: 1,
    name: "Kings of AfroBeats",
    img: afro,
    desc: "The curious beauty of African music is that it uplifts even as it tells a sad tale.",
  },
  {
    id: 2,
    name: "HipHop Beats",
    img: hiphop,
    desc: "Remember one thing Through every dark night, there's a bright day after that",
  },
  {
    id: 3,
    name: "Best of Reggaes",
    img: reggae,
    desc: "Money can't buy life",
  },
  {
    id: 4,
    name: "The Gospel",
    img: jazz,
    desc: "When there's music in your soul, there's soul in your music",
  },
];

function Header() {
  SwiperCore.use([Autoplay]);

  return (
    <div className=" lg:px-4">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'2'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        autoplay={true}
        className="mySwiper w-[100vw] lg:w-[40vw] h-[200px] lg:h-[40vh] mt-6 lg:mt-16 lg:mx-auto"
      >
        {playlists.map((playlist, index) => {
          return (
            <div key={index}>
            
        <SwiperSlide>
          <div className="relative rounded-[5px]">
          <img className="lg:w-[40vh] w-[200px] lg:h-[40vh] h-[200px] rounded-[5px]" src={playlist.img} />
          <div className="absolute bottom-2 left-0 p-2">
          <div className="text-[0.8em]">{playlist.name}</div>
          <div className="text-[0.5em] w-[80%]">{playlist.desc}</div>
          </div>
          </div>
        </SwiperSlide>
            </div>
          
          );
        })}
      </Swiper>
    </div>
  );
}

export default Header;
