import { useEffect, useState, createContext, useContext } from "react";
export const ProfileContext = createContext();

export const ProfileContextPage = ({ children }) => {
  

  
  const [countryCode, setCountryCode] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("countryCode");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [phoneNumber, setPhoneNumber] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("phoneNumber");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  localStorage.setItem("countryCode", JSON.stringify(countryCode));

  localStorage.setItem("phoneNumber", JSON.stringify(phoneNumber));


  return (
    <>
      <ProfileContext.Provider
        value={{
          countryCode,
          setCountryCode,
          phoneNumber,
          setPhoneNumber,
        }}
      >
        {children}
      </ProfileContext.Provider>
    </>
  );
};

export const ProfilePass = () => {
  return useContext(ProfileContext);
};
