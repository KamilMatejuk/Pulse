import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './Home'
import Marketplace from './Marketplace'
import { SetsProvider } from './contexts/SetsProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SetsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </BrowserRouter>
    </SetsProvider>
  </StrictMode>,
)
