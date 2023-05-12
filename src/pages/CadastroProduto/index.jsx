import Header from "../../components/Header";
import CombinedComponent from "../../components/columCard";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import QuadroClicavel from '../../components/cardRegister';


export default function CadastroProduto() {
  return (
    <>
    <Header />
    <div className={styles.container}>
      
      <div className={styles.wrapper}>


      <QuadroClicavel texto={"Insira uma Imagem"} titulo = "teste" />
        
      <CombinedComponent
        
                  componentes={[
            <input className={styles.input} type="text" id="Input1" name="fname" placeholder="Teste"/>,
            <input className={styles.input} type="text" id="Input3" name="fname" placeholder="Teste"/>,
            <input className={styles.input} type="text" id="Input2" name="fname" placeholder="Teste"/>,
            <input className={styles.input} type="text" id="Input4" name="fname" placeholder="Teste"/>,
            <input className={styles.input} type="text" id="Input5" name="fname" placeholder="Teste"/>,
        ]} titulo = "teste"
        />
        
        <CombinedComponent
          componentes={[
            <input className={styles.input} type="text" id="Input1" name="fname" placeholder="Teste"/>,
            <input className={styles.input} type="text" id="Input2" name="fname" placeholder="Teste"/>,
            <input className={styles.input} type="text" id="Input3" name="fname" placeholder="Teste"/>,
            <input className={styles.input} type="text" id="Input4" name="fname" placeholder="Teste"/>,
            <input className={styles.input} type="text" id="Input5" name="fname" placeholder="Teste"/>,
          ]} titulo = "teste"
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button placeholder={"Cadastrar Produto"} onClick={""} width={450} />
      </div>
      </div>
    </>
  );
}
