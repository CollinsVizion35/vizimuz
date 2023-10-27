import { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { register, Hanko } from "@teamhanko/hanko-elements";
import { UseAuth } from "../../../contexts/AuthContext";
import "../HankoAuth/hanko.css"

export default function HankoAuth() {
  const navigate = useNavigate();
  const { auth, user, signInWithGoogle } = UseAuth();
  const hankoApi = "https://648fc619-1158-423c-a7cf-5fb5053314d5.hanko.io";
  const hanko = useMemo(() => new Hanko(hankoApi), []);

  const redirectToProfile = useCallback(() => {
    navigate("/profile");
  }, [navigate]);



  useEffect(
    () =>
      hanko.onAuthFlowCompleted(() => {
        if (user) {
          redirectToProfile();
        } else {
          signInWithGoogle().then(() => {
            redirectToProfile();
          });
        }
      }),
    [hanko, signInWithGoogle, redirectToProfile, user]
  );


  useEffect(() => {
    register(hankoApi).catch((error) => {
      console.error("Hanko registration error:", error);
      alert("Hanko registration error:", error);
    });
  }, []);

  return <hanko-auth />;
}