import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes.jsx'
import ThemeProvider from './context/ThemeProvider.jsx'
import SignalProvider from './context/SignalProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignalProvider>
      <ThemeProvider>
        <RouterProvider router={Routes}></RouterProvider>
      </ThemeProvider>
    </SignalProvider>
  </StrictMode>,
)
