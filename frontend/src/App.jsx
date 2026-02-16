import StudyPage from './pages/study.jsx'
import NavBar from './components/navbar.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <main className='min-h-screen bg-[url("/dune_bg.webp")] bg-cover bg-center'>
        <NavBar />
        
        <Routes>
          <Route path="/" element={<StudyPage />} />
          <Route path="/settings" element={<div>Settings Page</div>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
