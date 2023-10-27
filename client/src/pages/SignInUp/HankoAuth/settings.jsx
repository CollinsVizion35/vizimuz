import { useEffect } from "react";
import { register } from "@teamhanko/hanko-elements";

// const hankoApi = process.env.REACT_APP_HANKO_API_URL;

export default function HankoProfile() {
    
  const hankoApi = "https://648fc619-1158-423c-a7cf-5fb5053314d5.hanko.io";

  useEffect(() => {
    register(hankoApi).catch((error) => {
      alert("error in updating profile")
    });
  }, []);

  return <hanko-profile />;
}
