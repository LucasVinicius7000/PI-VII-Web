import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
//import SolicitaEndereco from "./components/SolicitaEndereco";
import HomeEmpresa from "./pages/HomeEmpresa";
import CadastroEmpresa from "./pages/CadastroEmpresa";
import CadastroCliente from "./pages/CadastroCliente";
import UserContextProvider from "./contexts/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeCliente from "./pages/HomeCliente";
import Estabelecimentos from "./pages/Estabelecimentos";
import ProdutosCadastrados from "./pages/ProdutosCadastrados";

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
    path: "/homeEmpresa",
    element: <HomeEmpresa />,
  },
  {
    path: "/homeCliente",
    element: <HomeCliente/>
  },
  {
    path: "/estabelecimentos",
    element: <Estabelecimentos/>
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
