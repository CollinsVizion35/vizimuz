import React, { useState, useEffect } from "react";
import { UseAuth } from "../../contexts/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Profile from "../Profile/profile";
import SignIn from "./signIn";
import SignUp from "./signUp";

const SignInUp = ({ isOpen, setIsOpen }) => {
  const { user } = UseAuth();

  const [usersId, setUsersId] = useState("");
  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(db, "Users"),
        where("user_id", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data().user_id);
        setUsersId(doc.data().user_id);
      });
    }
    fetchData();
  }, []);

  console.log(usersId);

  // setTimeout(() => setIsOpen(false), 2000);

  // const handleButtonClick = () => {
  //     setIsOpen(!isOpen);
  // }

  return (
    <>
      <SignIn isOpen={isOpen} setIsOpen={setIsOpen} />
      <SignUp isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* <Profile /> */}
    </>
  );
};

export default SignInUp;
