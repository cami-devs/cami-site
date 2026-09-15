import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Piano from './pages/Piano'
import Essay from './pages/Essay'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/piano" element={<Piano />} />
      <Route path="/writing/:slug" element={<Essay />} />
    </Routes>
  )
}

export default App
