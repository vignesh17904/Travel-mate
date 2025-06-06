import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import router from './router.jsx';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
    <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>
);
