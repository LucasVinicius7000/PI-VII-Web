import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CadastroEmpresa from "./pages/CadastroEmpresa";
import CadastroCliente from "./pages/CadastroCliente";
import UserContextProvider from "./contexts/userContext";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeCliente from "./pages/HomeCliente";
import Estabelecimentos from "./pages/Estabelecimentos";
import ProdutosCadastrados from "./pages/ProdutosCadastrados";
import CategoriaEscolhida from "./pages/CategoriaEscolhida";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
      
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/cliente/cadastro",
    element: <CadastroCliente/>
  },
  {
    path: "/estabelecimento/cadastro",
    element: <div>Tela de cadastro do estabelecimento deve vir aqui</div>
  },
  {
    path: "/cadastroEmpresa",
    element: <CadastroEmpresa />,
  },
  {
    path: "/categoriaEscolhida",
    element: <CategoriaEscolhida/>
  },
  {
    path: "/produtosCadastrados",
    element: <ProdutosCadastrados/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <RouterProvider router={router} />
    <ToastContainer/>
  </UserContextProvider>
);
