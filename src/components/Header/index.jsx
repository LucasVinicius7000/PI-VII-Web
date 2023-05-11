import styles from "./styles.module.css";

export default function Header({ children }){

    return <div className={styles.container}>
        {children}
    </div>
}  