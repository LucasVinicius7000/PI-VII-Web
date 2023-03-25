import styles from "./styles.module.css";
export default function CardCategoria({ image, texto }) {
  return (
    <div className={styles.container}>
      <img srcSet={image} alt="pao" />
      <p id={styles.paragrafo2}>{texto}</p>
    </div>
  );
}
