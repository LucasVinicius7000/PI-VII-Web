import Header from "../../components/Header";
import CombinedComponent from "../../components/columCard";
import styles from "./styles.module.css";
import Button from "../../components/Button";

export default function CadastroProduto() {
  return (
    <div className={styles.container}>
      <Header />

      <CombinedComponent texto={"Insira uma Imagem"}/>

    </div>
  );
}
