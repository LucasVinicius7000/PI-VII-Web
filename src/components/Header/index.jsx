/* eslint-disable jsx-a11y/alt-text */
import styles from "./styles.module.css";
import Logo from "../../assets/LocalStoreLogoCadastro.svg"
export default function Header({ children }) {

    return <div className={styles.container}>
        <img width={80} height={80} src={Logo} />
        <div className={styles.content}>
            <h2>LocalStore</h2>
            <h3>Seu mercado em suas mãos.</h3>
        </div>
    </div>
}  