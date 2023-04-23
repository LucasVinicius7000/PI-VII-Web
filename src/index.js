import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import Home from "./pages/Home";
import SolicitaEndereco from "./components/SolicitaEndereco";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SolicitaEndereco>
      <Home />
    </SolicitaEndereco>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
);
