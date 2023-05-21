import styles from "./styles.module.css";

export default function Input
  ({
    startIcon,
    placeholder,
    endIcon,
    onChange,
    value,
    hasError,
    passwordIsShowing = true,
    backgroundColor
  }) {

  return <div
    style={{ backgroundColor: backgroundColor ? backgroundColor : undefined }}
    className={styles.container}
    id={hasError ? styles.containerError : undefined}
  >
    {startIcon}
    {startIcon && <div className={styles.verticalDeco}></div>}
    <input
      type={passwordIsShowing ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      id={hasError && styles.inputError}
      style={{ backgroundColor: backgroundColor ? backgroundColor : undefined }}
    ></input>
    {endIcon}
  </div>
}