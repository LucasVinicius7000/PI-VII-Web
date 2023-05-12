import styles from "./styles.module.css";

export default function Button({
  children,
  isLoading = false,
  height,
  width,
  text,
  onClick,
  ...rest
}) {

  return (
    <button
      style={{ width: `${width}`, height: `${height}`}}
      className={styles.container}
      onClick={onClick}
      {...rest}
    >{text}
    </button>
  );
}
