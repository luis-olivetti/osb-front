import "./global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import { queryClient } from "./lib/react-query";
import { router } from "./routes";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | observatorio.social.brasil" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
        />
      </QueryClientProvider>
    </HelmetProvider>
  );
}
