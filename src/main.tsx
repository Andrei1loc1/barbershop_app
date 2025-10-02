import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LoginProvider } from './contexts/LoginContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <LoginProvider>
        <App />
      </LoginProvider>
    </Router>
  </StrictMode>,
)
