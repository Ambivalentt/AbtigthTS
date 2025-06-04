import { useState } from 'react'
import Home from './pages/Home.jsx'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ProfileByUsername from './pages/ProfileByUsername.jsx'
import NotFound404 from './pages/NotFound404.jsx'
import SearchFriends from './pages/SearchFriends.jsx'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:username' element={<ProfileByUsername />} />
      <Route path='*' element={<NotFound404 />} />
      <Route path='/friends' element={<SearchFriends />} />
    </Routes>
  )
}

export default App
