import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home.jsx'
import Editar from './editar.jsx'
import Criar  from './criar.jsx'  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editar" element={<Editar />} />
        <Route path="/criar" element={<Criar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
