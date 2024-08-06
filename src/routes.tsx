import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Proposicoes } from "./pages/app/proposicoes";
import { SignIn } from "./pages/auth/sign-in";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <Proposicoes /> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sign-in", element: <SignIn /> }],
  },
]);
