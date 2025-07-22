import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import StoreProvider from './StoreProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster expand={true} richColors position="top-right" />
       <StoreProvider>
      <App />        
    </StoreProvider>
  </StrictMode>,
)
