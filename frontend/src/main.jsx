import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import router from './router.jsx';
import UserContextProvider from './context/UserContextProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = import.meta.env.VITE_CLIENT_ID;
createRoot(document.getElementById("root")).render(
  <StrictMode>
  <GoogleOAuthProvider clientId = {clientId}>
    <UserContextProvider>
    <RouterProvider router={router} />
    </UserContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>
  
);
