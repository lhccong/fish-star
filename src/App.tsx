import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { menuConfig } from './config/menu'
import 'antd/dist/reset.css'
import './App.css'
import Home from './pages/Home'
import VideoDetail from './pages/VideoDetail'

const App: FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id/:name" element={<VideoDetail />} />
            {menuConfig.map((item) => (
              <Route
                key={item.path}
                path={item.path}
                element={<item.component />}
              />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
