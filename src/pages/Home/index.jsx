import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import CardCategoria from "../../components/CardCategoria";
import CardEstabelecimento from "../../components/CardEstabelecimento";
import CardProduto from "../../components/CardProduto";
import useGeolocation from "../../hooks/useGeolocation";
import SolicitaEndereco from "./../../components/SolicitaEndereco";

export default function Home() {
  return <div className={styles.container}>
    explicação: uma vez que vc forneceu suas coordenadas vc já pode visualizar a tela Home
  return <div>
    <br></br>
    <button><a href="../cadastroEmpresa">Cadastro de Empresa</a></button>
  </div>;
}
