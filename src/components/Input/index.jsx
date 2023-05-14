import styles from "./styles.module.css";

export default function Input({
  startIcon,
  placeholder,
  endIcon,
  onChange,
  value,
  hasError,
  passwordIsShowing = true,
  width,
  height, //nova prop de altura
  backgroundColor
}) {
  const containerClassName = hasError ? styles.containerError : styles.container;
  const containerStyle = width ? { width } : {};
  const inputStyle = height ? { height } : {};

  return (
    <div className={containerClassName} style={{ ...containerStyle, ...inputStyle, backgroundColor: backgroundColor }}>
      {startIcon}
      {startIcon && <div className={styles.verticalDeco}></div>}
      <input
        type={passwordIsShowing ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={hasError && styles.inputError}
        style={{ backgroundColor: backgroundColor }}
      />
      {endIcon}
    </div>
  );
}
