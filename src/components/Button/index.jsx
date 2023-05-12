import styles from "./styles.module.css";

export default function Button({
  children,
  isLoading = false,
  height,
  width,
  text,
  ...rest
}) {

  return (
    <button
      style={{ width: `${width}`, height: `${height}`}}
      className={styles.container}
      {...rest}
    >{text}
    </button>
  );
}
