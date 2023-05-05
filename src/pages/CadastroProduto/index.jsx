import Header from "../../components/Header";
import CombinedComponent from "../../components/columCard/columCard";
import styles from "./styles.module.css";

export default function CadastroProduto() {
  return (
    <div className={styles.container}>
      <Header />

       <CombinedComponent texto={"Insira uma Imagem"}/>
    </div>
  );
}
