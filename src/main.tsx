import { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import router from "./pages/contacts/router.tsx";
import {RouterProvider} from "@tanstack/react-router";
import {SidebarProvider} from "./context/SidebarContext.tsx";
import './index.css';

export const CORPORAQueryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={CORPORAQueryClient}>
          <SidebarProvider>
              <Toaster position="top-right" />
              <RouterProvider router={router} />
          </SidebarProvider>
      </QueryClientProvider>
  </StrictMode>,
)
