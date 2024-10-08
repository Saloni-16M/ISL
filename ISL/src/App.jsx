import React from 'react'
// import { Router } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import FirstPage from './components/First_Page/FirstPage'
import MainPage from './components/MainPage/MainPage'
import NextPage from './components/NextPage/NextPage';


const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/next-page" element={<NextPage />} />
        <Route path="/main-page" element={<MainPage />} />
      </Routes>
    </Router>
    
  )
}

export default App
