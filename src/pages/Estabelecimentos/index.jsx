import HeaderGeral from "../../components/HeaderGeral";
import Search from "../../components/Search";
import styles from './styles.module.css'; 
import CardGeral from "../../components/CardGeral";

export default function Estabelecimentos() {
  return <>
    <HeaderGeral
        titulo={"Estabelecimentos"}
        url={"../homeCliente"}
    />   
    <div className={styles.search} >
        <Search type="text" placeholder="Qual produto você procura?"/>
    </div>  
    <div className={styles.container}>
        <div className={styles.categorias}>     
            <br/>     
            <div className={styles.infiniteContainer}>
                <CardGeral
                    titulo={"Master Supermecados"}
                    local={"Rua tal tal, n°123, bairro  Santo Antornio"}
                />
                <CardGeral
                    titulo={"Master Supermecados"}
                    local={"Rua tal tal, n°123, bairro  Santo Antornio"}
                />
                <CardGeral
                    titulo={"Master Supermecados"}
                    local={"Rua tal tal, n°123, bairro  Santo Antornio"}
                />
                <CardGeral
                    titulo={"Master Supermecados"}
                    local={"Rua tal tal, n°123, bairro  Santo Antornio"}
                />
                <CardGeral
                    titulo={"Master Supermecados"}
                    local={"Rua tal tal, n°123, bairro  Santo Antornio"}
                />
                <CardGeral
                    titulo={"Master Supermecados"}
                    local={"Rua tal tal, n°123, bairro  Santo Antornio"}
                />
            </div>
        </div>
    </div>
</>
}