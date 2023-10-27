import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Hanko } from "@teamhanko/hanko-elements";
import { getAuth, signOut } from "firebase/auth";


function HankoLogOut() {
  const navigate = useNavigate();
    const hankoApi = "https://648fc619-1158-423c-a7cf-5fb5053314d5.hanko.io";
    const hanko = useMemo(() => new Hanko(hankoApi), [hankoApi]);

  
    const auth = getAuth();

  const logout = async () => {
    try {
      await hanko?.user.logout();
      await signOut(auth)
      navigate("/home");
      alert("loggedOut");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <button onClick={logout} className="rounded-md bg-[#EBEAFD] hover:bg-[#63636354] px-7 py-2 text-black hover:text-white">Yes</button>;

}

export default HankoLogOut;
