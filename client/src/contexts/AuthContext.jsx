import React, { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword, 
         signOut, 
         sendPasswordResetEmail,
         onAuthStateChanged, 
         updateProfile,
         deleteUser,
         EmailAuthProvider,
         reauthenticateWithCredential,
GoogleAuthProvider,
signInWithPopup,
signInWithRedirect
         } from "firebase/auth";
import { auth, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
    
    const [user, setUser] = useState({});

    const createUser = (name, email, password, phone_number) => {
        return createUserWithEmailAndPassword(auth, name, email, password, phone_number);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const uploadPicture = async (file, user, setLoading) => {
        const fileRef = ref(storage, user.uid + '.png');

        setLoading(true);

        const snapshot = await uploadBytes(fileRef, file);

        const photoURL = await getDownloadURL(fileRef);

        updateProfile(user, {photoURL});

        setLoading(false);

        alert("Your Details has been uploaded successfully !")
    }

    const deleteSignedUser = async (password) => {
        const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        )

        const result = await reauthenticateWithCredential(
            auth.currentUser,
            credential
        )

        await deleteUser(result.user);

        console.log("User deleted successfully");
    }

    // const signInWithGoogle = () => {
    //     const provider = new GoogleAuthProvider();
    //     return signInWithPopup(auth, provider);
    //   };

    
const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <UserContext.Provider value={{ createUser, user, signIn, forgotPassword, uploadPicture, deleteSignedUser, signInWithGoogle }}>
            {children}
        </UserContext.Provider>
    )
}   

export const UseAuth = () => {
    return useContext(UserContext);
}