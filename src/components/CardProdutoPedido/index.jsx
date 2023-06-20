import styles from "./styles.module.css";
import { BiTrash } from 'react-icons/bi';

export default function CardProdutoPedido
    ({ image, titulo, local, preco, onClick, quantidade, onClickTrash, onClickMinus, onClickMore }) {
    return (
        <div className={styles.container} onClick={onClick}>
            <div id={styles.imagem}>
                <img srcSet={image} alt="" />
            </div>
            <div className={styles.textos}>
                <span id={styles.titulo}>{titulo}</span>
                <span id={styles.local}>{local}</span>
                <span id={styles.preco}>{preco}</span>
            </div>
            <div className={styles.last}>
                <div><BiTrash onClick={onClickTrash} style={{ cursor: 'pointer' }} color="var(--details-1)" size={30} /></div>
                <div className={styles.calculate}>
                    <div onClick={onClickMinus}>-</div>
                    <span>{quantidade}</span>
                    <div onClick={onClickMore}>+</div>
                </div>
            </div>
        </div>
    );
}
