import { useState } from 'react'
import Home from './pages/Home.jsx'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ProfileByUsername from './pages/ProfileByUsername.jsx'
import NotFound404 from './pages/NotFound404.jsx'
import SearchFriends from './pages/SearchFriends.jsx'
import { useStateContext } from './context/user.jsx'
import Navbar from './components/home/NavbarSection.jsx'
import AuthRoute from './components/routes/validate.jsx'
function App() {
  const { user, loading } = useStateContext();
  const hideNavbar = location.pathname === '/' && !user;
  if (loading) {
    return <div>Cargando...</div>; // Puedes personalizar este componente de carga
  }

  return (
    <>
      {!hideNavbar && <Navbar />}
    <Routes>
      <Route path='/friends' element={
        <AuthRoute>
          <SearchFriends />
        </AuthRoute>
      } />

      <Route path='/' element={<Home />} />
      <Route path='/:username' element={<ProfileByUsername />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
    </>
    
  )
}

export default App
