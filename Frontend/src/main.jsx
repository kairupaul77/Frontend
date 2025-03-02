import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='776825009090-p1q6sfec7nh9jutba2opfarudr96jp0a.apps.googleusercontent.com'>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>
)