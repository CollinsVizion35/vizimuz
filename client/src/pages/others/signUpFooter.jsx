import React from 'react'
import logo from "../../imgs/vizimuz_logo.png";
import { useColorTheme } from '../../contexts/colorContext/useColorTheme';

function SignUpFooter() {
    
  const { isDark } = useColorTheme();
  return (
    <div className={`${isDark ? "bg-black text-white" : "bg-white text-[#0F1419]"} absolute lg:fixed bottom-[-10vh] left-1/2 p-10  border-b border-[#2F3336] space-y-3 flex flex-col items-center w-[100%] z-[999999999]`}
    style={{ transform: "translate(-50%, -50%)" }}>
      <div className='flex flex-row items-center space-x-2'>
      <img src={logo} className="w-[35px] h-[35px]" alt="home icon" />
        <div>ViziMuz</div>
      </div>
      <div className='text-[0.6em]'>A Music app for marketing upcoming artist</div>
      <div className='flex flex-row space-x-6'>
        <div>About</div>
        <div>Contact</div>
        <div>Help</div>
      </div>
      <div className='text-[0.6em]'>© 2023, Vizion Limited</div>
    </div>
  )
}

export default SignUpFooter
