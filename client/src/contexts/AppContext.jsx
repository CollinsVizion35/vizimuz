import { useEffect, useState, createContext, useContext, useRef } from "react";

import otilo from "../imgs/poco.jpeg";
import mMWTV from "../imgs/asake.jpeg";
import rush from "../imgs/ayra-starr.jpg";
import remaRaves from "../imgs/Rema-Rave-Roses.jpeg";
import breezy from "../imgs/Chris-Brown-Call-me-everyday.jpg";
import pSquare from "../imgs/p-square.jpeg";
import coughKizz from "../imgs/Kizz-Daniel-Cough.jpg";
import blaqUni from "../imgs/Blaqbonez-Back-To-Uni.jpeg";
import PheelzElec from "../imgs/electricity.png";

// collections

import gkmc from "../imgs/gkmcLamar.jpg";
import dangerous from "../imgs/dangerous.jpg";
import sheriff from "../imgs/I_Shot_the_Sheriff_by_Bob_Marley_and_the_Wailers_German_vinyl.jpg";

// reggaes

import kaya from "../imgs/kaya.webp";
import respect from "../imgs/respect.jpg";
import buffaloSoldier from "../imgs/BuffaloSoldier.jpg";
import prisoner from "../imgs/Prisoner.jpg";
import houseOfEx from "../imgs/houseOfExile.jpg";
import exodus from "../imgs/exodus.png";
import nattyDread from "../imgs/nattyDread.jpg";
import soulTaker from "../imgs/soulTaker.jpg";

// golden Age

import invincible from "../imgs/theLostChildren.jpg";
import allEyesOnMe from "../imgs/allEyesOnMe.webp";
import mjHistory from "../imgs/MJ-HIStory.jpg";
import collection2000 from "../imgs/collection2000.webp";
import usa4Africa from "../imgs/USA4Africa.jpg";
import fallingIntoYou from "../imgs/Falling into You.jpg";
import colours from "../imgs/colours.jpg";
import pacsLife from "../imgs/2pac-Pac's_Life.jpg";

//tomorrow's tune

import badGuy from "../imgs/badGuy.webp";
import homicide from "../imgs/homicide.jpg";
import theBox from "../imgs/theBox.jpg";
import trollz from "../imgs/trollz.png";
import xxivk from "../imgs/Bruno_Mars_-_24K_Magic_(Official_Album_Cover).png";
import royalty from "../imgs/Royalty_Chris_Brown.jpg";
import JonTHC from "../imgs/jonBellionTHC.jpg";
import adhd from "../imgs/adhdJoyner.jpg";
import astroworld from "../imgs/Travis Scott_Astroworld.webp";

export const AppContext = createContext();

const releases = [
  {
    id: 0,
    artist: "Poco Lee Ft Hotkid",
    img: otilo,
    name: "Otilo",
    audio: "Poco_Lee_-_Otilo_Izz_Gone_feat_Hotkid__@BaseNaija.com.mp3",
  },
  {
    id: 1,
    artist: "Blaqbonez",
    img: blaqUni,
    name: "Back in Uni",
    audio: "Blaqbonez-JAE5-Back-In-Uni_@BaseNaija.com_.mp3",
  },
  {
    id: 2,
    artist: "Asake",
    img: mMWTV,
    name: "Organise",
    audio: "Asake_-_Organise_@BaseNaija.com.mp3",
  },
  {
    id: 3,
    artist: "Kizz Daniel",
    img: coughKizz,
    name: "Cough (Odo)",
    audio: "Kizz_Daniel_-_Cough_Odo__@BaseNaija.com.mp3",
  },
  {
    id: 4,
    artist: "Asake",
    img: mMWTV,
    name: "Dull",
    audio: "Asake_-_Dull_@BaseNaija.com.mp3",
  },
  {
    id: 5,
    artist: "Ayra Starr",
    img: rush,
    name: "Rush",
    audio: "Ayra_Starr_-_Rush_@BaseNaija.com.mp3",
  },
  {
    id: 6,
    artist: "Pheelz Ft Davido",
    img: PheelzElec,
    name: "Electricity",
    audio: "Pheelz_-_Electricity_feat_Davido__@BaseNaija.com.mp3",
  },
  {
    id: 7,
    artist: "Chris Brown Ft Wizkid",
    img: breezy,
    name: "Call Me Everyday",
    audio: "Chris_Brown_-_Call_Me_Everyday_feat_Wizkid__@BaseNaija.com.mp3",
  },
  {
    id: 8,
    artist: "Rema",
    img: remaRaves,
    name: "Are You There",
    audio: "Rema_-_Are_You_There__@BaseNaija.com.mp3",
  },
  {
    id: 9,
    artist: "P-Square",
    img: pSquare,
    name: "Ihe Geme",
    audio: "P-Square_-_Jaiye_Ihe_Geme__@BaseNaija.com.mp3",
  },
];

const popular = [
  {
    id: 0,
    artist: "Kizz Daniel",
    img: coughKizz,
    name: "Cough (Odo)",
    audio: "Kizz_Daniel_-_Cough_Odo__@BaseNaija.com.mp3",
  },
  {
    id: 1,
    artist: "Rema",
    img: remaRaves,
    name: "Are You There",
    audio: "Rema_-_Are_You_There__@BaseNaija.com.mp3",
  },
  {
    id: 2,
    artist: "Asake",
    img: mMWTV,
    name: "Organise",
    audio: "Asake_-_Organise_@BaseNaija.com.mp3",
  },
  {
    id: 3,
    artist: "Poco Lee Ft Hotkid",
    img: otilo,
    name: "Otilo",
    audio: "Poco_Lee_-_Otilo_Izz_Gone_feat_Hotkid__@BaseNaija.com.mp3",
  },
  {
    id: 4,
    artist: "P-Square",
    img: pSquare,
    name: "Ihe Geme",
    audio: "P-Square_-_Jaiye_Ihe_Geme__@BaseNaija.com.mp3",
  },
  {
    id: 5,
    artist: "Ayra Starr",
    img: rush,
    name: "Rush",
    audio: "Ayra_Starr_-_Rush_@BaseNaija.com.mp3",
  },
  {
    id: 6,
    artist: "Chris Brown Ft Wizkid",
    img: breezy,
    name: "Call Me Everyday",
    audio: "Chris_Brown_-_Call_Me_Everyday_feat_Wizkid__@BaseNaija.com.mp3",
  },
  {
    id: 7,
    artist: "Pheelz Ft Davido",
    img: PheelzElec,
    name: "Electricity",
    audio: "Pheelz_-_Electricity_feat_Davido__@BaseNaija.com.mp3",
  },
  {
    id: 8,
    artist: "Blaqbonez",
    img: blaqUni,
    name: "Back in Uni",
    audio: "Blaqbonez-JAE5-Back-In-Uni_@BaseNaija.com_.mp3",
  },
  {
    id: 9,
    artist: "Asake",
    img: mMWTV,
    name: "Dull",
    audio: "Asake_-_Dull_@BaseNaija.com.mp3",
  },
];

const collections = [
  {
    id: 0,
    artist: "P-Square",
    img: pSquare,
    name: "Ihe Geme",
    audio: "P-Square_-_Jaiye_Ihe_Geme__@BaseNaija.com.mp3",
    album: "Singles",
  },
  {
    id: 1,
    artist: "Bob Marley",
    img: sheriff,
    name: "I Shot The Sheriff",
    audio: "Bob Marley - I Shot The Sheriff.mp3",
    album: "Singles",
  },
  {
    id: 2,
    artist: "Michael Jackson",
    img: dangerous,
    name: "Dangerous",
    audio: "Michael Jackson - Dangerous (1995) _ Studio Version _.mp3",
    album: "Dangerous",
  },
  {
    id: 3,
    artist: "Kendrick Lamar",
    img: gkmc,
    name: "Backstreet Freestyle",
    audio: "03 - Backstreet Freestyle.mp3",
    album: "good kid, m.A.A.d city",
  },
];

const likes = [
  {
    id: 0,
    artist: "Bob Marley",
    img: sheriff,
    name: "I Shot The Sheriff",
    audio: "Bob Marley - I Shot The Sheriff.mp3",
    album: "Singles",
  },
  {
    id: 1,
    artist: "Kendrick Lamar",
    img: gkmc,
    name: "Backstreet Freestyle",
    audio: "03 - Backstreet Freestyle.mp3",
    album: "good kid, m.A.A.d city",
  },
  {
    id: 2,
    artist: "P-Square",
    img: pSquare,
    name: "Ihe Geme",
    audio: "P-Square_-_Jaiye_Ihe_Geme__@BaseNaija.com.mp3",
    album: "Singles",
  },
  {
    id: 3,
    artist: "Michael Jackson",
    img: dangerous,
    name: "Dangerous",
    audio: "Michael Jackson - Dangerous (1995) _ Studio Version _.mp3",
    album: "Dangerous",
  },
];

const reggaes = [
  {
    id: 0,
    artist: "Bob Marley",
    img: kaya,
    name: "Is This Love",
    audio: "Bob Marley - Is This Love.mp3",
    album: "Kaya",
  },
  {
    id: 2,
    artist: "Bob Marley",
    img: sheriff,
    name: "I Shot The Sheriff",
    audio: "Bob Marley - I Shot The Sheriff.mp3",
    album: "Singles",
  },
  {
    id: 3,
    artist: "Bob Marley",
    img: buffaloSoldier,
    name: "Buffalo Soldier",
    audio: "Bob Marley -Buffalo Soldier.mp3",
    album: "Singles",
  },
  {
    id: 4,
    artist: "Lucky Dube",
    img: prisoner,
    name: "Prisoner",
    audio: "Lucky_Dube_-_Prisoner.mp3",
    album: "Prisoner",
  },
  {
    id: 5,
    artist: "Lucky Dube",
    img: houseOfEx,
    name: "Freedom Fighters",
    audio: "lucky dube  fredom fighters.mp3",
    album: "House of Exile",
  },
  {
    id: 6,
    artist: "Bob Marley",
    img: exodus,
    name: "Three Little Birds",
    audio: "Bob Marley- don't worry about a thing.mp3",
    album: "Exodus",
  },
  {
    id: 7,
    artist: "Lucky Dube",
    img: houseOfEx,
    name: "Crazy World",
    audio: "lucky dube  crazy world.mp3",
    album: "House of Exile",
  },
  {
    id: 8,
    artist: "Lucky Dube",
    img: prisoner,
    name: "War and Crime",
    audio: "Lucky_Dube_-_War_Crime.mp3",
    album: "Prisoner",
  },
  {
    id: 9,
    artist: "Bob Marley",
    img: nattyDread,
    name: "No Woman No Cry",
    audio: "Bob_Marley_No_Woman_No_Cry.mp3",
    album: "Natty Dread",
  },
  {
    id: 10,
    artist: "Lucky Dube",
    img: soulTaker,
    name: "Soul Taker",
    audio: "lucky dube 5ve soul 2aker.mp3",
    album: "Soul Taker",
  },
];

// Golden Age

const golden = [
  {
    id: 0,
    artist: "Michael Jackson",
    img: invincible,
    name: "The Lost Children",
    audio: "The Lost Children.mp3",
    album: "Invincible",
  },
  {
    id: 1,
    artist: "2Pac",
    img: allEyesOnMe,
    name: "Life Goes On",
    audio: "2Pac - Life Goes On.mp3",
    album: "All Eyez on Me",
  },
  {
    id: 2,
    artist: "Michael Jackson",
    img: dangerous,
    name: "Dangerous",
    audio: "Michael Jackson - Dangerous (1995) _ Studio Version _.mp3",
    album: "Dangerous",
  },
  {
    id: 3,
    artist: "Michael Jackson",
    img: mjHistory,
    name: "Earth Song",
    audio: "Michael Jackson - Earth Song.mp3",
    album: "HIStory: Past, Present and Future, Book I",
  },
  {
    id: 4,
    artist: "Celine Dion",
    img: collection2000,
    name: "Drove all night",
    audio: "Celine Dion-Drove all night.mp3",
    album: "2000 Collection",
  },
  {
    id: 5,
    artist: "Michael Learns",
    img: colours,
    name: "Sleeping Child",
    audio: "Michael Learns- Sleeping Child.mp3",
    album: "Colours",
  },
  {
    id: 6,
    artist: "2pac",
    img: pacsLife,
    name: "Pac's life",
    audio: "2pac-Pac's life.mp3",
    album: "Pac's Life",
  },
  {
    id: 7,
    artist: "Celine Dion",
    img: fallingIntoYou,
    name: "I love you",
    audio:
      "https://mp3gaga.com/wp-content/uploads/2022/02/Mp3gaga.com-Celine-Dion-I-Love-You.mp3",
    album: "Falling into You",
  },
  {
    id: 8,
    artist: "Celine Dion",
    img: collection2000,
    name: "In His Touch",
    audio:
      "https://mp3gaga.com/wp-content/uploads/2022/02/Mp3gaga.com-Celine-Dion-In-His-Touch.mp3",
    album: "2000 Collection",
  },
  {
    id: 9,
    artist: "Michael Jackson",
    img: usa4Africa,
    name: "We are the world",
    audio: "MICHEAL JACKSON =  USA for Africa {We are the world}.mp3",
    album: "Singles",
  },
];

const tTunes = [
  {
    id: 0,
    artist: "Billie Ellish ft. Justin Bieber",
    img: badGuy,
    name: "Bad Guy (Remix)",
    audio:
      "[Waploaded]_Billie_Eilish_-_Bad_Guy_Remix_feat_Justin_Bieber-1563035495.mp3",
    album: "Singles",
  },
  {
    id: 1,
    artist: "Roddy Ricch",
    img: theBox,
    name: "The Box",
    audio: "02 The Box - (SongsLover.com).mp3",
    album: "Please Excuse Me for Being Antisocial",
  },
  {
    id: 2,
    artist: "Logic ft. Eminem",
    img: homicide,
    name: "Homicide",
    audio: "02. Homicide (feat. Eminem) - (SongsLover.com).mp3",
    album: "Confessions of a Dangerous Mind",
  },
  {
    id: 3,
    artist: "Kendrick Lamar",
    img: gkmc,
    name: "Backstreet Freestyle",
    audio: "03 - Backstreet Freestyle.mp3",
    album: "good kid, m.A.A.d city",
  },
  {
    id: 4,
    artist: "6ix9ine ft. Nicki Minaj",
    img: trollz,
    name: "Trollz",
    audio: "6ix9ine & Nicki Minaj - TROLLZ (NetNaija.com).mp3",
    album: "TattleTales",
  },
  {
    id: 5,
    artist: "Bruno Mars",
    img: xxivk,
    name: "24K Magic",
    audio: "24K Magic - Bruno Mars (Lyrics).mp3",
    album: "XXIVK Magic",
  },
  {
    id: 6,
    artist: "Chris Brown",
    img: royalty,
    name: "Zero",
    audio: "Chris Brown - Zero.mp3",
    album: "Royalty",
  },
  {
    id: 7,
    artist: "Jon Bellion",
    img: JonTHC,
    name: "iRobot",
    audio: "Jon%20Bellion%20-%20iRobot%20(The%20Human%20Condition)-2.mp3",
    album: "The Human Condition",
  },
  {
    id: 8,
    artist: "Joyner Lucas ft. Logic",
    img: adhd,
    name: "Isis",
    audio: "Joyner Lucas - Isis (feat. Logic) - (SongsLover.com).mp3",
    album: "ADHD",
  },
  {
    id: 9,
    artist: "Travis Scott ft. Drake",
    img: astroworld,
    name: "Sicko Mode",
    audio: "Travis-Scott-ft-Drake-Sicko-Mode.mp3",
    album: "Astroworld",
  },
];

export const AppContextPage = ({ children }) => {
  const [token, setToken] = useState("");
  // const [releases, setReleases] = useState([])
  const [currentSongIndex, setCurrentSongIndex] = useState(() => {
    // getting stored value
    const saved = sessionStorage.getItem("currentSongIndex");
    const initialValue = JSON.parse(saved);
    return initialValue || 0;
  });

  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(() => {
    // getting stored value
    const saved = sessionStorage.getItem("currentAlbumIndex");
    const initialValue = JSON.parse(saved);
    return initialValue || 0;
  });

  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
  const [nextAlbumIndex, setNextAlbumIndex] = useState(currentAlbumIndex + 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [volume, setVolume] = useState("1");

  const [phone, setPhone] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("phone");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [cert, setCert] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("expertcert");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [fName, setFName] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("fname");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [lName, setLName] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("lname");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [eMail, setEMail] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("email");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  useEffect(() => {
    localStorage.setItem("phone", JSON.stringify(phone));
    localStorage.setItem("fname", JSON.stringify(fName));
    localStorage.setItem("lname", JSON.stringify(lName));
    localStorage.setItem("email", JSON.stringify(eMail));
    sessionStorage.setItem(
      "currentSongIndex",
      JSON.stringify(currentSongIndex)
    );
    sessionStorage.setItem(
      "currentAlbumIndex",
      JSON.stringify(currentAlbumIndex)
    );
  }, [phone, fName, lName, eMail, currentSongIndex, currentAlbumIndex]);

  // const getToken = () => {
  //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
  //     let token = urlParams.get('access_token');
  // }

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem("token");

    // getToken()

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.sessionStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.sessionStorage.removeItem("token");
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  const audioEl = useRef(null);

  const playerAudioRef = useRef(null);
  const playerImageRef = useRef(null);
  const playerNameRef = useRef(null);
  const playerArtistRef = useRef(null);

  // for collection
  const playerAudio2Ref = useRef(null);
  const playerImage2Ref = useRef(null);
  const playerName2Ref = useRef(null);
  const playerArtist2Ref = useRef(null);

  // for Likes
  const playerAudio3Ref = useRef(null);
  const playerImage3Ref = useRef(null);
  const playerName3Ref = useRef(null);
  const playerArtist3Ref = useRef(null);

  // for reggae
  const playerAudio4Ref = useRef(null);
  const playerImage4Ref = useRef(null);
  const playerName4Ref = useRef(null);
  const playerArtist4Ref = useRef(null);

  // for tomorrow
  const playerAudio5Ref = useRef(null);
  const playerImage5Ref = useRef(null);
  const playerName5Ref = useRef(null);
  const playerArtist5Ref = useRef(null);

  // for goldenAge
  const playerAudio6Ref = useRef(null);
  const playerImage6Ref = useRef(null);
  const playerName6Ref = useRef(null);
  const playerArtist6Ref = useRef(null);

  // for popular
  const playerAudio7Ref = useRef(null);
  const playerImage7Ref = useRef(null);
  const playerName7Ref = useRef(null);
  const playerArtist7Ref = useRef(null);

  const signInRef = useRef();
  const signUpRef = useRef();
  const profileRef = useRef();

  const [none, setNone] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("none");
    const initialValue = JSON.parse(saved);
    return initialValue || "flex";
  });

  const [flex, setFlex] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("flex");
    const initialValue = JSON.parse(saved);
    return initialValue || "none";
  });

  // shuffle an repeat state
  const [repeat, setRepeat] = useState(true);
  const [shuffle, setShuffle] = useState(true);

  useEffect(() => {
    localStorage.setItem("none", JSON.stringify(none));
    localStorage.setItem("flex", JSON.stringify(flex));
  }, [none, flex]);

  return (
    <>
      <AppContext.Provider
        value={{
          phone,
          setPhone,
          cert,
          setCert,
          fName,
          setFName,
          lName,
          setLName,
          eMail,
          setEMail,
          token,
          setToken,
          none,
          setNone,
          flex,
          setFlex,

          releases,
          collections,
          likes,
          reggaes,
          golden,
          tTunes,
          popular,

          currentSongIndex,
          setCurrentSongIndex,
          currentAlbumIndex,
          setCurrentAlbumIndex,
          nextSongIndex,
          setNextSongIndex,
          nextAlbumIndex,
          setNextAlbumIndex,
          isPlaying,
          setIsPlaying,
          duration,
          setDuration,
          currentTime,
          setCurrentTime,
          percentage,
          setPercentage,
          volume,
          setVolume,
          repeat,
          setRepeat,
          shuffle,
          setShuffle,
          getCurrDuration,
          audioEl,
          playerAudioRef,
          playerImageRef,
          playerNameRef,
          playerArtistRef,

          playerAudio2Ref,
          playerImage2Ref,
          playerName2Ref,
          playerArtist2Ref,

          playerAudio3Ref,
          playerImage3Ref,
          playerName3Ref,
          playerArtist3Ref,

          // for reggae
          playerAudio4Ref,
          playerImage4Ref,
          playerName4Ref,
          playerArtist4Ref,

          // for tomorrow
          playerAudio5Ref,
          playerImage5Ref,
          playerName5Ref,
          playerArtist5Ref,

          // for goldenAge
          playerAudio6Ref,
          playerImage6Ref,
          playerName6Ref,
          playerArtist6Ref,

          // for popular
          playerAudio7Ref,
          playerImage7Ref,
          playerName7Ref,
          playerArtist7Ref,
          signInRef,
          signUpRef,
          profileRef,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export const AppPass = () => {
  return useContext(AppContext);
};
