import Button from "../../components/Button";
import Search from "../../components/Search";
import styles from './styles.module.css'; 
import CardGeral from "../../components/CardGeral";
import HeaderGeral from "../../components/HeaderGeral";

export default function ProdutosCadastrados() {
  return <>
  <HeaderGeral
        titulo={"Produtos Cadastrados"}
        url={"../homeEmpresa"}
    />   
    <div className={styles.search} >
        <Search type="text"  placeholder="Qual produto você procura?"/>
    </div>  
    <div className={styles.butao}>
        <Button
            text={"Cadastrar Produto"}
            width={180}
        />
    </div>
    <div className={styles.container}>
        <div className={styles.categorias}>      
            <div className={styles.box}>
                <h2>Produtos Cadastrados</h2>                    
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