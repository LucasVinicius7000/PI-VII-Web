import BackgoundInf from "../../components/BackgroundInf";
import BackgoundSup from "../../components/BackgroundSup";
import Button from "../../components/Button";
import Header from "../../components/Header";
import CardCategoria from "../../components/CardCategoria";
import CardProduto from "../../components/CardProduto";
import Input from "../../components/Input";
import Search from "../../components/Search";
import styles from './styles.module.css';
import { IoAccessibility } from "react-icons/io5" ;   
import CardGeral from "../../components/CardGeral";

export default function HomeEmpresa() {
  return <>
    <Header/>    
    <Search
        width={475}
        paddingLeft={600}
        paddingBottom={20}
        placeholder={"Qual produto você procura?"}
    />
    <div className={styles.container}>
        <div className={styles.button}>
            <Button
                text={"Cadastrar Produto"}
                paddingLeft={1400}
                width={600}
            />
        </div>
        <div className={styles.categorias}>     
            <div className={styles.box}>
                <h2>Categorias</h2> 
                <p>Ver mais</p>  
            </div>
            <br/>     
            <div className={styles.box}>
                <CardCategoria
                    texto={"Hortfrutti"}
                />
                <CardCategoria
                    texto={"Hortfrutti"}
                />
                <CardCategoria
                    texto={"Hortfrutti"}
                />
                <CardCategoria
                    texto={"Hortfrutti"}
                />
                <CardCategoria
                    texto={"Hortfrutti"}
                />
                <CardCategoria
                    texto={"Hortfrutti"}
                />
                <CardCategoria
                    texto={"Hortfrutti"}
                />
                <CardCategoria
                    texto={"Hortfrutti"}
                />
                <CardCategoria
                    texto={"Hortfrutti"}
                />
                <CardCategoria
                    texto={"Hortfrutti"}
                />
            </div>
        </div>
        <div className={styles.categorias}>      
            <div className={styles.box}>
                <h2>Produtos</h2>  
                <p>Ver mais</p>  
            </div>
            <br/>     
            <div className={styles.box}>
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