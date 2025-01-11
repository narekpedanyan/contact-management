import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import router from "./pages/contacts/router.tsx";
import {RouterProvider} from "@tanstack/react-router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <RouterProvider router={router} />
      </BrowserRouter>
  </StrictMode>,
)
