import styles from "./styles.module.css";
export default function CardProduto({ image, titulo, precoAntigo, preco }) {
  return (
    <div className={styles.container}>
      <div id={styles.imagem}>
        <img srcSet={image} alt="" />
      </div>
      <div className={styles.textos}>
        <span id={styles.titulo}>{titulo}</span>
        <span id={styles.local}>{precoAntigo}</span>
        <span id={styles.preco}>{preco}</span>
      </div>
    </div>
  );
}
