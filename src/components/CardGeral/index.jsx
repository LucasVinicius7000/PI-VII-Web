import styles from "./styles.module.css";
export default function CardGeral
({ image, titulo, local, preco }) {
  return (
    <div className={styles.container}>
      <div id={styles.imagem}>
        <img srcSet={image} alt="" />
      </div>
      <div className={styles.textos}>
        <p id={styles.titulo}>{titulo}</p>
        <p id={styles.local}>{local}</p>
        <p id={styles.preco}>{preco}</p>
      </div>
    </div>
  );
}
