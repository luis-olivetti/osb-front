import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { Proposicoes } from "./pages/app/proposicoes";
import { SignIn } from "./pages/auth/sign-in";
import { Projetos } from "./pages/app/projetos";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/proposicao", element: <Proposicoes /> }],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/projeto", element: <Projetos /> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sign-in", element: <SignIn /> }],
  },
]);
