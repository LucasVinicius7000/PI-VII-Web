import styles from "./styles.module.css";

export default function Input
    ({
        startIcon,
        placeholder,
        endIcon,
        onChange,
        hasError
    }) {

    return <div className={styles.container} id={hasError && styles.containerError}>
        {startIcon}
        {startIcon && <div className={styles.verticalDeco}></div>}
        <input onChange={onChange} placeholder={placeholder} id={hasError && styles.inputError}></input>
        {endIcon}
    </div>
}