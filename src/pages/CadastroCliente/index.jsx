import styles from "./styles.module.css";
import DecorationIconsTop from "./../../assets/DecorationIconsTop.svg";
import DecorationIconsBottom from "./../../assets/DecorationIconsBottom.svg";

export default function CadastroCliente() {
    return <div className={styles.container}>
        <img id={styles.iconTop} alt="Ícones diversos no topo." src={DecorationIconsTop} />
        <img id={styles.iconBottom} alt="Ícones diversos no topo." src={DecorationIconsBottom} />
        <section>

        </section>
    </div>
}