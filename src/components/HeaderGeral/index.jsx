import styles from "./styles.module.css";
import Voltar from "./../../assets/Voltar.svg";

export default function HeaderGeral({ children,  url, titulo }){

    return <div className={styles.container}>
        {children} 
        <div className={styles.box}>
            <a href={url}>
                <div className={styles.imagem}>
                    <img  width={40} height={40} src={Voltar}/>
                </div>
            </a>
            <div className={styles.colun}>
                <h2>{titulo}</h2>
            </div>
        </div>
    </div>
}  