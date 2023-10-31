import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AppPass } from "../../contexts/AppContext";
import Player from "./player";


import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from 'react-share'

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from 'react-share'

import { MdOutlineShare, MdOutlineDownload } from 'react-icons/md/index'
import { PiHeartBold } from 'react-icons/pi/index'

const AlbumMusicDetails = () => {
  const { id } = useParams();
  const [canShow, setCanShow] = useState(false);
  const [musicList, setMusicList] = useState([]);
  const [musicInfo, setMusicInfo] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setCanShow(true), 3000);
    return () => clearTimeout(timer);
  });

  const { currentSongIndex, setCurrentSongIndex, nextSongIndex } = AppPass();

 
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

        // // Check if 'i' is within the valid range before setting the state
        // if (i >= 0 && i < albumData.length) {
        //   setAlbumList(albumData[i].albumData[i].tracks);
        //   setAlbumInfo(albumData[i]);
        //   console.log(albumData[i].albumData[i].tracks);
        // }
  
        if (i >= 0 && i < albumData.length) {
          setAlbumList(albumData[i].albumData);
          const allAlbumList = albumData.map((albumDoc) => albumDoc.albumData[i].tracks);
          setAlbumList(allAlbumList.flat());
            
          const allAlbumInfo = albumData.map((albumDoc) => albumDoc);
          setAlbumInfo(allAlbumInfo[i]);
  
          console.log(albumList);
        }
      } catch (error) {
        console.error("Error fetching album data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("currentSongIndex2:", currentSongIndex);
    console.log("musicList:", musicList);
  }, [currentSongIndex]);

  
  const shareUrl = window.location.href



  const [showShareDiv, setShowShareDiv] = useState(false)
  const shareDivRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (shareDivRef.current && !shareDivRef.current.contains(event.target)) {
        setShowShareDiv(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleButtonClick = () => {
    setShowShareDiv(true)
  }

  return (
    <>
      <div className='bg-inherit'>
        {albumList ? (
          <>
            <div className='flex flex-col items-center mt-[20vh] space-y-8 lg:mb-16'>
              <img
                className='w-[80vw] lg:w-[300px] h-[80vw] lg:h-[300px] rounded-[50%] glowing-img'
                src={albumList[currentSongIndex]?.image}
                alt='Music '
              />
              <div className='flex flex-row w-[100%] lg:w-[50%] justify-between items-end'>
                <div className='flex flex-col space-y-1'>
                  <p className='items-start'>
                    {albumList[currentSongIndex]?.musicName}
                  </p>
                  <p className='items-start text-[0.8em]'>
                    {albumList[currentSongIndex]?.artist}
                  </p>
                  {/* <audio controls>
              <source src={musicList.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio> */}
                </div>
                <div className='flex flex-row space-x-3 items-center'>
                  <button onClick={handleButtonClick}>
                    <MdOutlineShare />
                  </button>{' '}
                  <button className='p-1 border rounded-[50%]'>
                    <MdOutlineDownload />
                  </button>{' '}
                  <button>
                    <PiHeartBold />
                  </button>
                  <div>
                    {showShareDiv && (
                      <div className=' flex flex-col bg-white rounded-t-lg fixed bottom-16 lg:bottom-0 justify-center items-center right-0 h-[60vh] w-[100vw] lg:[60vw] z-[999999999999]'>
                        <p className='text-[#040C25] pt-2'>Share with</p>
                        <div
                          ref={shareDivRef}
                          className='blue-div grid grid-cols-3 h-full w-full'
                        >
                          <TwitterShareButton
                            url={shareUrl}
                            title={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                            hashtag={["vizMuz", "music"]}
                            related={["music", "newbies"]}
                            via='vizimuz'
                          >
                            <TwitterIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </TwitterShareButton>
                          <EmailShareButton
                            url={shareUrl}
                            subject={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                            hashtag='viziMuz'
                            separator=' '
                          >
                            <EmailIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </EmailShareButton>
                          <FacebookShareButton
                            url={shareUrl}
                            quote={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                            hashtag='viziMuz'
                          >
                            <FacebookIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </FacebookShareButton>
                          <WhatsappShareButton
                            url={shareUrl}
                            title={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                            separator=' '
                          >
                            <WhatsappIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </WhatsappShareButton>
                          <OKShareButton
                            title={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                            description={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                            image={albumList[currentSongIndex]?.image}
                          >
                            <OKIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            /></OKShareButton>
                          <PinterestShareButton
                            url={shareUrl}
                            media={albumList[currentSongIndex]?.image}
                            description={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                          >
                            <PinterestIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </PinterestShareButton>
                          <RedditShareButton
                            url={shareUrl}
                            title={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                          >
                            <RedditIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </RedditShareButton>
                          <LinkedinShareButton
                            url={shareUrl}
                            title={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                            summary='Share this music from vizimuz with your friends'
                            source='viziMuz'
                          >
                            <LinkedinIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </LinkedinShareButton>
                          <TelegramShareButton
                            title={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                          >
                            <TelegramIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </TelegramShareButton>
                          <InstapaperShareButton
                            url={shareUrl}
                            title={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                            description='Music from viziMuz'
                          >
                            <InstapaperIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </InstapaperShareButton>
                          <PocketShareButton
                            title={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                          >
                            <PocketIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </PocketShareButton>
                          <TumblrShareButton
                            title={`${albumList[currentSongIndex]?.musicName} by ${albumList[currentSongIndex]?.artist} from viziMuz`}
                            tags={['vizimuz', 'music app']}
                            caption='viziMuz music app'
                            posttype={shareUrl}
                          >
                            <TumblrIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </TumblrShareButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div className="z-[99999] w-[90vw] max-w-[1440px] mx-auto my-0">
        {canShow ? (
          <Player
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            nextSongIndex={nextSongIndex}
            musicList={musicList}
          />
        ) : (
          <> </>
        )}
      </div>
      <div>
        {albumInfo ? (
          albumList ? (
            <>
              <div className="flex flex-row items-center space-x-2 my-4 ">
                <img
                  className="w-[50px] h-[50px] lg:w-[50px] lg:h-[50px] rounded-[50%]"
                  src={albumInfo?.userImage}
                  alt="user "
                />
                <p className="items-start">{albumInfo?.userName}</p>
                {/* <audio controls>
              <source src={musicInfo.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio> */}
              </div>
              <p className='items-start text-[0.8em] font-bold p-1 w-fit rounded-[5px] bg-[#c77dfccc]'>
                #{albumList[currentSongIndex]?.category}
              </p>
              {/* <p className="items-start text-[0.8em]">Total plays: {albumList[currentSongIndex]?.play}</p> */}
            </>
          ) : (
            <div>Loading...</div>
          )) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default AlbumMusicDetails;
