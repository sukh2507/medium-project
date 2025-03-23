// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Create } from './pages/Create'

import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import {BrowserRouter , Route , Routes } from "react-router-dom"
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
<BrowserRouter>
<Routes>
  <Route path="/blogs/:id" element={< Blog/>} />
  <Route path="/signin" element={<Signin />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/blogs" element={<Blogs />} />
  <Route path="/create" element={<Create/>} />

</Routes>
</BrowserRouter>
    </>
  )
}

export default App
