import styles from "./styles.module.css";
import InputMask from "react-input-mask";

export default function Input
  ({
    startIcon,
    placeholder,
    endIcon,
    onChange,
    value,
    hasError,
    passwordIsShowing = true,
    backgroundColor,
    onlyNumbers = false,
    mask
  }) {

  return <div
    style={{ backgroundColor: backgroundColor ? backgroundColor : undefined }}
    className={styles.container}
    id={hasError ? styles.containerError : undefined}
  >
    {startIcon}
    {startIcon && <div className={styles.verticalDeco}></div>}
    <InputMask
      mask={mask}
      type={onlyNumbers ? "number" : passwordIsShowing ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      id={hasError && styles.inputError}
      style={{ backgroundColor: backgroundColor ? backgroundColor : undefined }}
    ></InputMask>
    {endIcon}
  </div>
}