import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import SolicitaEndereco from "./components/SolicitaEndereco";
import CadastroEmpresa from "./pages/CadastroEmpresa";
import HomeEmpresa from "./pages/HomeEmpresa";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SolicitaEndereco>
      <Home />
    </SolicitaEndereco>,
  },
  {
    path: "/cadastroEmpresa",
    element: <CadastroEmpresa />,
  },
  {
    path: "/homeEmpresa",
    element: <HomeEmpresa />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
);
