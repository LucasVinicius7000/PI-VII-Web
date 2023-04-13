import styles from "./styles.module.css";
export default function CardEstabelecimento({
  image,
  titulo,
  endereco,
  onClick,
}) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.image}>
        <img srcSet={image} alt="" />
      </div>
      <div className={styles.text}>
        <p id={styles.titulo}>{titulo}</p>
        <p id={styles.endereco}>{endereco}</p>
      </div>
    </div>
  );
}
