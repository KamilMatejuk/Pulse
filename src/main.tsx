import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from './paths/Home'
import Marketplace from './paths/Marketplace'
import { SetsProvider } from './contexts/SetsProvider'
import { SelectedProvider } from './contexts/SelectedProvider'
import Options from './paths/Options'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SetsProvider>
      <SelectedProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/options" element={<Options />} />
          </Routes>
        </HashRouter>
      </SelectedProvider>
    </SetsProvider>
  </StrictMode>,
)
