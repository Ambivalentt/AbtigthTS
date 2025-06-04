import { useState } from 'react'
import Home from './pages/Home.jsx'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ProfileByUsername from './pages/ProfileByUsername.jsx'
import AuthRoute from './components/routes/validate.jsx'
import NotFound404 from './pages/NotFound404.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/:username' element={<ProfileByUsername/>} />
        <Route path='*' element={<NotFound404 />} />
    </Routes>
  )
}

export default App
