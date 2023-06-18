import styles from "./styles.module.css";
import { useEffect, useState } from "react";

export default function InputWithDropDown({ selected, type, placeholder, options = [], onChangeText, children, setInternal = '' }) {

    useEffect(() => {
        const handleClickOutside = (event) => {
            const component = document.getElementById("inpoutWithDrop");
            if (!component.contains(event.target)) {
                setIsShowing(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    
    const [isShowing, setIsShowing] = useState(false);

    return <div className={styles.container} id="inpoutWithDrop">
        <input className={styles.input} value={setInternal} onChange={onChangeText} type={type} placeholder={placeholder} />
        <div className={styles.options} onClick={() => setIsShowing(!isShowing)}>
            {selected}
            {
                isShowing && <div id={styles.items}>
                    {children.map((item) => item)}
                </div>
            }
        </div>

    </div>
}