import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './Routes/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from 'react-helmet-async'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <AuthProvider>
<HelmetProvider>
<QueryClientProvider client={queryClient}>
<RouterProvider router={router}></RouterProvider>
<ToastContainer/>

</QueryClientProvider> </HelmetProvider>  
 </AuthProvider>

   
  </StrictMode>
)
