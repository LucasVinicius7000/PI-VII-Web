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
import Produto from "./pages/Produto";
import useBeforeInstallPrompt from 'use-before-install-prompt';
import { setCookie, parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import PedidosCliente from "./pages/PedidosCliente";
import PedidoAtual from "./pages/PedidoAtual";

let deferredPrompt;

var isIos = false;
var isInStandaloneMode = false;
var iOSChecked = false;
var showIosInstallMessage = false;



const _varGlobal = {
  maxWidthDesktop: { Descricao: 'Resolução Máxima DeskTop', Value: 767 },
  GetCamposGarantia: () => {
    return [
      _varGlobal.maxWidthDesktop
    ];
  }
}

const SectionIos = props => {
  const [showIosInstall, setShowIosInstall] = useState(showIosInstallMessage);
  const [installable, setInstallable] = useState(false);

  const IsIos = () => {
    let userAgent = window.navigator.userAgent.toLowerCase();
    let isIos = /iphone|ipad|ipod/.test(userAgent);
    return isIos;
  }

  const IsInStandaloneMode = () => {
    let standaloneIsAvaiable = ('standalone' in window.navigator);
    if (!standaloneIsAvaiable)
      return false;
    let standaloneMode = window.navigator.standalone;
    return standaloneIsAvaiable && standaloneMode;
  };

  useEffect(() => {
    if (!iOSChecked) {
      iOSChecked = true;
      isIos = IsIos();
      isInStandaloneMode = IsInStandaloneMode()
      const { 'moveTreinamentos.toastIsClick': isToastClick } = parseCookies();
      const isClicked = isToastClick ? true : false;
      if (isIos && !isInStandaloneMode && !isClicked) {
        showIosInstallMessage = true;
        setShowIosInstall(showIosInstallMessage)
        toast.success('Instale este aplicativo em sua tela inicial: Pressione o botão "Compartilhar" na barra de menu abaixo. Logo após, pressione "Adicionar à tela inicial". ', {
          position: "bottom-right",
          autoClose: 100000000,
          hideProgressBar: false,
          closeOnClick: true,
          onClick: () => {
            setCookie(undefined, 'moveTreinamentos.toastIsClick', true, {
              path: '/',
            });
          },
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  })

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      console.log(installable);
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      console.log('INSTALL: Success');
    });
  }, []);
  return (
    <div />
  );
}

Modal.setAppElement('body');

function App(Component, pageProps) {

  const { isInstalled, addToHomeScreen } = useBeforeInstallPrompt();
  const [isVisibleApp, setIsVisibleApp] = useState(false);
  const [isSSR, setIsSSR] = useState(false);

  function declineApp() {
    setIsVisibleApp(false);
    setCookie(undefined, 'localStore.notVisibleApp', true, {
      path: '/',
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSSR(true);
    }
  }, [isSSR]);

  useEffect(() => {
    const { 'localStore.notVisibleApp': isVisibleAppCookie } = parseCookies();
    setIsVisibleApp(isVisibleAppCookie ? false : true)
  }, [])

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
      element: <CadastroProduto />
    },
    {
      path: "/empresa/formulario",
      element: <FormularioAplicacao />
    },
    {
      path: "/empresa/denied",
      element: <AprovacaoNegada />
    },
    {
      path: "/empresa/pending",
      element: <AprovacaoPendente />
    },
    {
      path: "/home/estabelecimento/:id",
      element: <EstabelecimentoProdutos />
    },
    {
      path: "/produto/:id",
      element: <Produto />
    },
    {
      path: "/pedidos",
      element: <PedidosCliente />
    },
    {
      path: "/pedidoAtual",
      element: <PedidoAtual/>
    }
  ]);


  return (
    <>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>

      {!isInstalled && isVisibleApp && (
        <div>
          <h7>
            <h8>
              <h9
                onClick={addToHomeScreen}
              >
                Baixe o App
              </h9>
            </h8>
            <button style={{ backgroundColor: '#000', border: '#000' }}>
              <img src="/closeModalButton.svg" alt="" style={{ cursor: 'pointer' }} onClick={declineApp} />
            </button>
          </h7>
        </div>
      )}
      <UserContextProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UserContextProvider>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
