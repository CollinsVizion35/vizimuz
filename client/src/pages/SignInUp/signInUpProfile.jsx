import React from 'react'

import { Routes, Route } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import SignInUp from './signinUp';
import Profile from '../Profile/profile';
import SignIn from './signIn';

function SignInUpProfile() {
    
  
    // const user = auth.currentUser;
  return (
    <>
    <Profile/>
    </>
  )
}

export default SignInUpProfile