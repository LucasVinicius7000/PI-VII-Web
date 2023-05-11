
import Search from "../../components/Search";
import styles from './styles.module.css'; 
import CardGeral from "../../components/CardGeral";
import HeaderGeral from "../../components/HeaderGeral";

export default function CategoriaEscolhida() {
  return <>
  <HeaderGeral
        titulo={"Hortfrutti"} /* O nome será dinâmico de acordo com cada categoria, esse é só um exemplo */
        url={"../homeCliente"}
    />   
    <div className={styles.search} >
        <Search type="text"  placeholder="Qual produto você procura?"/>
    </div>  
    <div className={styles.container}>
        <div className={styles.categorias}>      
            <div className={styles.box}>
                <h2>Hortfrutti</h2> 
            </div>
            <br/>     
            <div className={styles.infiniteContainer}>
                <CardGeral
                    titulo={"Morango"}
                    local={" Supermercado Tonin center"}
                    preco={8.99}
                />
                <CardGeral
                    titulo={"Morango"}
                    local={" Supermercado Tonin center"}
                    preco={8.99}
                />
                <CardGeral
                    titulo={"Morango"}
                    local={" Supermercado Tonin center"}
                    preco={8.99}
                />
                <CardGeral
                    titulo={"Morango"}
                    local={" Supermercado Tonin center"}
                    preco={8.99}
                />
                <CardGeral
                    titulo={"Morango"}
                    local={" Supermercado Tonin center"}
                    preco={8.99}
                />
            </div>
        </div>
    </div>
</>
}