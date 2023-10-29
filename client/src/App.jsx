import { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AppContextPage } from "./contexts/AppContext";
import PageNotFound from "./pages/404";
import { UseAuth } from "./contexts/AuthContext";
import Home from "./pages/Home/home";
import NewReleases from "./pages/Home/trending";
import SearchArtist from "./pages/Home/searchArtist";
import Welcome from "./pages/welcome";
import Player from "./pages/Home/popular";
import Header from "./pages/Home/header";
import MusicVideos from "./pages/MultiMedia/musicVideo";
import Radio from "./pages/MultiMedia/radio";
// import SignIn from './pages/signIn';
// import SignUp from './pages/signUp';
import EditProfile from "./pages/Profile/editProfile";
// import Profile from './pages/profile';
import GoldenAge from "./pages/Charts/goldenAge";
import SignUpProfile from "./pages/SignInUp/signinUp";
import ReggaeBlues from "./pages/Charts/reggaeBlues";
import Tomorrow from "./pages/Charts/tomorrowTunes";
import Collection from "./pages/Collection/collection";
import Likes from "./pages/Collection/likes";
import SignInUp from "./pages/SignInUp/signinUp";
import SignInUpProfile from "./pages/SignInUp/signInUpProfile";
import UploadMusic from "./pages/upload/musicUpload";
import UploadBox from "./pages/upload/uploadBox";
import MusicID from "./pages/upload/musicID";
import MusicDetails from "./pages/musicDetail/musicDetail";
import MusicDetailBox from "./pages/musicDetail/musicDetailBox";
import HankoAuth from "./pages/SignInUp/HankoAuth/hankoSignIn";
import HankoLogOut from "./pages/SignInUp/HankoAuth/hankoLogOut";
import ProtectedRoute from "./pages/SignInUp/protectedRoute";
import SignInBox from "./pages/SignInUp/HankoAuth/signInBox";
import HankoProfile from "./pages/SignInUp/HankoAuth/settings";
import SettingsBox from "./pages/SignInUp/HankoAuth/boxSettings";
import { ProfileContextPage } from "./contexts/ProfileContext";
import AlbumDetail from "./pages/album/albumDetail";
import AlbumMusicDetailBox from "./pages/album/musicDetailBox";
import NewJamComponent from "./pages/homeSection/newJams";

export const AppContext = createContext();
// export const PhoneContext = createContext();

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <AuthContextProvider>
        <AppContextPage>
          
        <ProfileContextPage>
          <Routes>
            <Route path="/" element={<Welcome />} />
            {/* 
            {/* <Route path='/signIn' element={<SignIn isOpen={isOpen} setIsOpen={setIsOpen} />}/>

                <Route path='/signup' element={<SignUp isOpen={isOpen} setIsOpen={setIsOpen} />}/> */}

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <SignInUpProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/editprofile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            <Route path="/home" element={<Home />} />

            <Route path="/player" element={<Player />} />

            <Route path="/newRelease" element={<NewReleases />} />

            <Route path="/collection" element={<Collection />} />

            <Route path="/likes" element={<Likes />} />

            <Route path="/goldenAge" element={<GoldenAge />} />

            <Route path="/reggaeblues" element={<ReggaeBlues />} />

            <Route path="/tomorrow" element={<Tomorrow />} />

            <Route path="/head" element={<Header />} />

            <Route path="/musicvideos" element={<MusicVideos />} />

            <Route path="/radio" element={<Radio />} />

            {/* <Route path='/profile' element={<Pr/>}/>           */}

            <Route path="/searchArtist" element={<SearchArtist />} />

            <Route
              path="/upload_music"
              element={
                <ProtectedRoute>
                  <UploadBox />
                </ProtectedRoute>
              }
            />

            <Route
              path="/music/:artist/:musicName/:id"
              element={<MusicDetailBox />}
            />

            <Route
              path="/Album_music/:artist/:musicName/:id"
              element={<AlbumMusicDetailBox />}
            />

            <Route
              path="/album/:artist/:name/:id"
              element={<AlbumDetail />}
            />

            <Route
              path="/newest_jams"
              element={<NewJamComponent />}
            />



            <Route path="/signup" element={<SignInBox />} />

            <Route path="/signOut" element={<HankoLogOut />} />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsBox />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
          </ProfileContextPage>
        </AppContextPage>
      </AuthContextProvider>
    </div>
  );
}

export default App;
