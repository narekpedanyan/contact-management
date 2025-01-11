import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./pages/contacts/router.tsx";
import {RouterProvider} from "@tanstack/react-router";

export const CORPORAQueryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={CORPORAQueryClient}>
          <RouterProvider router={router} />
      </QueryClientProvider>
  </StrictMode>,
)
