import Button from "../../components/Button";
import Header from "../../components/Header";
import CardCategoria from "../../components/CardCategoria";
import Search from "../../components/Search";
import styles from './styles.module.css'; 
import CardGeral from "../../components/CardGeral";
import padaria from "./../../assets/padaria.svg";
import hortfruti from "./../../assets/hortfruti.svg";
import acougue from "./../../assets/acougue.svg";
import bebidas from "./../../assets/bebidas.svg";
import biscoitos from "./../../assets/biscoitos.svg";
import enlatados from "./../../assets/enlatados.svg";
import higiene from "./../../assets/higiene.svg";
import cereais from "./../../assets/cereais.svg";
import frios from "./../../assets/frios.svg";

export default function HomeCliente() {
  return <>
    <Header/>   
    <div className={styles.search} >
        <Search type="text"  placeholder="Qual produto você procura?"/>
    </div>  
    <div className={styles.categorias}>   
        <h2>Categorias</h2> 
    </div>
    <div className={styles.scrollmenu}>
        <div className={styles.squares}>
            <a>
                <CardCategoria
                    texto={"Padaria"}
                    image={padaria}
                />
            </a>
            <a>
                <CardCategoria
                    texto={"Hortfrutti"}
                    image={hortfruti}
                />
            </a>
            <a>
                <CardCategoria
                    texto={"Açougue"}
                    image={acougue}
                />
            </a>
            <a>
                <CardCategoria
                    texto={"Frios e Laticínio"}
                    image={frios}
                />
            </a>
            <a>
                <CardCategoria
                    texto={"Cereais"}
                    image={cereais}
                />
            </a>
            <a>
                <CardCategoria
                    texto={"Biscoitos"}
                    image={biscoitos}
                />
            </a>
            <a>
                <CardCategoria
                    texto={"Enlatados"}
                    image={enlatados}
                />
            </a>
            <a>
                <CardCategoria
                    texto={"Bebidas"}
                    image={bebidas}
                />
            </a>
            <a>
                <CardCategoria
                    texto={"Higiene e Limpeza"}
                    image={higiene}
                />
            </a>
        </div>
    </div>
    <div className={styles.container}>
        <div className={styles.categorias}>      
            <div className={styles.box}>
                <h2>Estabelecimentos</h2>  
                <div className={styles.verMais}>
                    <a href="../estabelecimentos">
                        <p>Ver mais</p>
                    </a>
                </div>                  
            </div>
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