import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import { Provider } from 'react-redux'
import store from './store/store'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@material-tailwind/react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster richColors closeButton duration="1000" position="top-right" />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
