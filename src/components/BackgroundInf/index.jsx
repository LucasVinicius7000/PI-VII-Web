import React from 'react';
import styles from './styles.module.css'; 

export default function BackgoundInf(props) {
    return(
        <div style={props.style} className={styles.container}>
            <div className={styles.backgroundRight}>
                <img src="inferior.svg"/>
            </div>
        </div>
    )
}