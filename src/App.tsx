import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Piano from './pages/Piano'
import Golf from './pages/Golf'
import Essay from './pages/Essay'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/piano" element={<Piano />} />
      <Route path="/golf" element={<Golf />} />
      <Route path="/writing/:slug" element={<Essay />} />
    </Routes>
  )
}

export default App
