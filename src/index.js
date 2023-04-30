import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Endereco from "./components/Endereco";
import UserContextProvider from "./contexts/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
      
  },
  {
    path: "/login",
    element: <div>Tela de login deve vir aqui</div>
  },
  {
    path: "/usuario/cadastro",
    element: <div>Tela de cadastro do cliente deve vir aqui</div>
  },
  {
    path: "/estabelecimento/cadastro",
    element: <div>Tela de cadastro do estabelecimento deve vir aqui</div>
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
);
