import React from 'react'
import Home from './Components/home'
import "./index.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Create from './Components/Create'
import Edit from './Components/Edit'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App