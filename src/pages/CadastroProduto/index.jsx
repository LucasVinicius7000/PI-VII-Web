import Header from "../../components/Header";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import CombinedComponent from "../../components/ColumCard";

export default function CadastroProduto() {
  return (
    <div className={styles.container}>
      <Header />

      <CombinedComponent texto={"Insira uma Imagem"}/>

    </div>
  );
}
