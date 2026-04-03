import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const isRender = import.meta.env.VITE_RENDER === 'true'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={isRender ? '/' : '/canteen-app/'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
