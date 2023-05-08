import styles from "./styles.module.css";

export default function Button
({
placeholder, 
alternativeStyle,
width,
onClick
})
{
    return <div
    onClick={onClick} 
    className={alternativeStyle ? styles.alternative : styles.container}
    style={{ width: `${width}px` }}> {placeholder}
    </div>
}
