import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './Home/Home.jsx'
import Calculator from './Calulator/Calculator.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/calculator' element={<Calculator />} />
      </Routes>
    </>
  )
}

export default App
