import StudyPage from './pages/study.jsx'
import SettingsPage from './pages/settings.jsx'
import { useState } from 'react'
import NavBar from './components/navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'


function App() {

  const [pdfPage, setPdfPage] = useState([1]);

  return (
    <BrowserRouter>
      <main className='min-h-screen bg-[url("/dune_bg.webp")] bg-cover bg-center'>
        <NavBar />

        <Routes>
          <Route path="/" element={<StudyPage buttons ={pdfPage}/>} />
          <Route path="/settings" element={<SettingsPage setButtons={setPdfPage} />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
