import React from 'react'
import { Routes, Route } from "react-router-dom";

import LandingPage from './Pages/LandingPage'
import UserProvider from './Context/UserContext';


const App = () => {
  return (
    <UserProvider>
      <Routes>
      <Route path='/'element={<LandingPage/>}/>
    </Routes>
    </UserProvider>
   
  )
   
}

export default App
