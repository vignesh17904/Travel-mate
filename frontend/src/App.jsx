import { useState } from 'react'
import './App.css'

import Landing from './pages/Landing.jsx'
import router from './router.jsx'
import { RouterProvider } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
    <Landing/>
    </>
  )
}

export default App
