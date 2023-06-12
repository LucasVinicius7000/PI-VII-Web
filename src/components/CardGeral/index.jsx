import styles from "./styles.module.css";
export default function CardGeral
({ image, titulo, local, preco, onClick }) {
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
    </div>
  );
}
