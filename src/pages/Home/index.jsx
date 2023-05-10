import styles from "./styles.module.css";
import Endereco from "../../components/Endereco";

export default function Home() {
  return <div className={styles.container}>
    explicação: uma vez que vc forneceu suas coordenadas vc já pode visualizar a tela Home
    <br></br>
    <button><a href="../cadastroEmpresa">Cadastro de Empresa</a></button>
  </div>;
}
