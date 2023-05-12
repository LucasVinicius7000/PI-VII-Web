import styles from "./styles.module.css";

export default function Button
    ({
        placeholder,
        alternativeStyle,
        width,
        onClick // nova prop onClick
    }) {
    return <div className={alternativeStyle ? styles.alternative : styles.container}
        style={{ width: `${width}px` }} onClick={onClick}> {placeholder} {/* adiciona a prop onClick */}
    </div>
}
