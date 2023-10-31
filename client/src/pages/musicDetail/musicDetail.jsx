import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { AppPass } from '../../contexts/AppContext'
import Player from './player'

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

const MusicDetails = () => {
  const { id } = useParams()
  const [canShow, setCanShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCanShow(true), 3000)
    return () => clearTimeout(timer)
  })

  const { currentSongIndex, setCurrentSongIndex, nextSongIndex } = AppPass()

  const [musicList, setMusicList] = useState([])
  const [musicInfo, setMusicInfo] = useState([])
  const i = 0 // Define the index 'i' here

  useEffect(() => {
  const fetchData = async () => {
    try {
      const musicCollectionRef = collection(db, "music");
      const querySnapshot = await getDocs(musicCollectionRef);

      const musicData = [];
      querySnapshot.forEach((doc) => {
        musicData.push({ id: doc.id, ...doc.data() });
      });

      // Check if 'i' is within the valid range before setting the state
      if (i >= 0 && i < musicData.length) {
        setMusicList(musicData[i].musicData);
        const allMusicList = musicData.map((musicDoc) => musicDoc.musicData);
        setMusicList(allMusicList.flat());
          
        const allMusicInfo = musicData.map((musicDoc) => musicDoc);
        setMusicInfo(musicData[i]);


        console.log(musicInfo);
      }
    } catch (error) {
      console.error("Error fetching music data: ", error);
    }
  };

  fetchData();
}, []);

  const [albumList, setAlbumList] = useState([])
  const [albumInfo, setAlbumInfo] = useState([])
  const j = 0 // Define the index 'i' here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumCollectionRef = collection(db, 'album')
        const querySnapshot = await getDocs(albumCollectionRef)

        const albumData = []
        querySnapshot.forEach(doc => {
          albumData.push({ id: doc.id, ...doc.data() })
        })
  
        if (j >= 0 && j < albumData.length) {
          setAlbumList(albumData[j].albumData);
          const allAlbumList = albumData.map((albumDoc) => albumDoc.albumData);
          setAlbumList(allAlbumList.flat());
            
          const allAlbumInfo = albumData.map((albumDoc) => albumDoc);
          setAlbumInfo(allAlbumInfo.flat());
  
          console.log(albumList);
        }
      } catch (error) {
        console.error('Error fetching album data: ', error)
      }
    }

    fetchData()
  }, [])

  const [combinedMusic, setCombinedMusic] = useState([]);

  useEffect(() => {
    const mergedData = albumList.map(item => {
      return item.tracks;
    });

    const mergedMusic = [...mergedData, musicList];

    const combinedMusicData = mergedMusic.flat();
    
    setCombinedMusic(combinedMusicData);
    
    console.log(mergedMusic)
  }, [albumList, musicList]);

  useEffect(() => {
    // console.log(mergedMusic)
    console.log(combinedMusic)
  }, [])

  const [newPlay, setNewPlay] = useState(
    combinedMusic[currentSongIndex]?.play || 0
  )

  useEffect(() => {
    console.log('currentSongIndex2:', currentSongIndex)
    console.log('musicList:', musicList)
    setNewPlay(combinedMusic[currentSongIndex]?.play + 1)
    console.log(combinedMusic[currentSongIndex]?.play)
    console.log(newPlay)
  }, [])

  // const handlePlayClick = async (index) => {
  //   const updatedCombinedMusic = [...combinedMusic];
  //   const track = updatedCombinedMusic[index];
  //   track.play += 1;

  //   // Update the play count in Firestore
  //   const collectionName = track.type === 'music' ? 'music' : 'album';
  //   const fieldToUpdate = track.type === 'music' ? 'play' : 'tracks';
  //   const docId = track.id;

  //   try {
  //     await updateDoc(doc(db, collectionName, docId), {
  //       [fieldToUpdate]: track.play,
  //     });
  //   } catch (error) {
  //     console.error('Error updating play count: ', error);
  //   }

  //   setCombinedMusic(updatedCombinedMusic);
  // };

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
        {combinedMusic ? (
          <>
            <div className='flex flex-col items-center mt-[20vh] space-y-8 lg:mb-16'>
              <img
                className='w-[80vw] lg:w-[300px] h-[80vw] lg:h-[300px] rounded-[50%] glowing-img'
                src={combinedMusic[currentSongIndex]?.image}
                alt='Music '
              />
              <div className='flex flex-row w-[100%] lg:w-[50%] justify-between items-end'>
                <div className='flex flex-col space-y-1'>
                  <p className='items-start'>
                    {combinedMusic[currentSongIndex]?.musicName}
                  </p>
                  <p className='items-start text-[0.8em]'>
                    {combinedMusic[currentSongIndex]?.artist}
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
                            title={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
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
                            subject={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
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
                            quote={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
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
                            title={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
                            separator=' '
                          >
                            <WhatsappIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </WhatsappShareButton>
                          <OKShareButton
                            title={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
                            description={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
                            image={combinedMusic[currentSongIndex]?.image}
                          >
                            <OKIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            /></OKShareButton>
                          <PinterestShareButton
                            url={shareUrl}
                            media={combinedMusic[currentSongIndex]?.image}
                            description={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
                          >
                            <PinterestIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </PinterestShareButton>
                          <RedditShareButton
                            url={shareUrl}
                            title={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
                          >
                            <RedditIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </RedditShareButton>
                          <LinkedinShareButton
                            url={shareUrl}
                            title={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
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
                            title={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
                          >
                            <TelegramIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </TelegramShareButton>
                          <InstapaperShareButton
                            url={shareUrl}
                            title={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
                            description='Music from viziMuz'
                          >
                            <InstapaperIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </InstapaperShareButton>
                          <PocketShareButton
                            title={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
                          >
                            <PocketIcon
                              size={64}
                              round={true}
                              className='mx-auto'
                            />
                          </PocketShareButton>
                          <TumblrShareButton
                            title={`${combinedMusic[currentSongIndex]?.musicName} by ${combinedMusic[currentSongIndex]?.artist} from viziMuz`}
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
      <div className='z-[99999] w-[90vw] max-w-[1440px] mx-auto my-0'>
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
        {musicInfo ? (
          combinedMusic ? (
            <>
              <div className='flex flex-row items-center space-x-2 my-4 '>
                <img
                  className='w-[50px] h-[50px] lg:w-[50px] lg:h-[50px] rounded-[50%]'
                  src={musicInfo?.userImage}
                  alt='user '
                />
                <p className='items-start'>{musicInfo?.userName}</p>
                {/* <audio controls>
              <source src={musicInfo.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio> */}
              </div>
              <p className='items-start text-[0.8em] font-bold p-1 w-fit rounded-[5px] bg-[#c77dfccc]'>
                #{combinedMusic[currentSongIndex]?.category}
              </p>
              {/* <p className='items-start text-[0.8em]'>
                Total plays: {combinedMusic[currentSongIndex]?.play}
              </p> */}
            </>
          ) : (
            <div>Loading...</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  )
}

export default MusicDetails
