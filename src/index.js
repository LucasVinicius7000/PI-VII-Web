import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CadastroEmpresa from "./pages/CadastroEmpresa";
import CadastroCliente from "./pages/CadastroCliente";
import UserContextProvider from "./contexts/userContext";
import CadastroProduto from "./pages/CadastroProduto";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeCliente from "./pages/HomeCliente";
import Estabelecimentos from "./pages/Estabelecimentos";
import ProdutosCadastrados from "./pages/ProdutosCadastrados";
import CategoriaEscolhida from "./pages/CategoriaEscolhida";
import HomeEmpresa from "./pages/HomeEmpresa";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { UserContext } from "./contexts/userContext";
import Endereco from "./components/Endereco";
import FormularioAplicacao from "./pages/FormularioAplicacao";
import AprovacaoNegada from "./pages/AprovacaoNegada";
import AprovacaoPendente from "./pages/AprovacaoPendente";
import EstabelecimentoProdutos from "./pages/EstabelecimentoProdutos";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/home",
      element: <Endereco></Endereco>
    },
    {
      path: "/cliente/cadastro",
      element: <CadastroCliente />
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
      path: "/estabelecimentos",
      element: <Estabelecimentos />
    },
    {
      path: "/categoriaEscolhida",
      element: <CategoriaEscolhida />
    },
    {
      path: "/produtosCadastrados",
      element: <ProdutosCadastrados />
    },
    {
      path: "/empresa/produto/cadastro",
      element: <CadastroProduto/>
    },
    {
      path: "/empresa/formulario",
      element: <FormularioAplicacao/>
    },
    {
      path: "/empresa/denied",
      element: <AprovacaoNegada/>
    },
    {
      path: "/empresa/pending",
      element: <AprovacaoPendente/>
    },
    {
      path: "/home/estabelecimento/:id",
      element: <EstabelecimentoProdutos/>
    }
  ]);


  return (
    <UserContextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </UserContextProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
