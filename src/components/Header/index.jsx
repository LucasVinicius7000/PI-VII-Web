import styles from "./styles.module.css";

export default function Header({ children }){

    return <div className={styles.container}>
        {children} 
        <div className={styles.box}>
            <div className={styles.imagem}><img  width={80} height={80} src="Logo.svg"/></div>
            <div className={styles.colun}>
                <h2>LocalStore</h2>
                <h3>Seu mercado em suas mãos.</h3>
            </div>
        </div>
    </div>
}  