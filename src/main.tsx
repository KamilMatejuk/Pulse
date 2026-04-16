import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './paths/Home'
import Marketplace from './paths/Marketplace'
import { SetsProvider } from './contexts/SetsProvider'
import { SelectedProvider } from './contexts/SelectedProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SetsProvider>
      <SelectedProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
          </Routes>
        </BrowserRouter>
      </SelectedProvider>
    </SetsProvider>
  </StrictMode>,
)
