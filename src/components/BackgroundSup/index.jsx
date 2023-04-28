import React from 'react';
import styles from './styles.module.css';

export default function BackgoundSup(props) {
    return(
        <div style={props.style} className={styles.container}>
            <div className={styles.backgroundRight}>
                <img src="superior.svg"/>
            </div>
        </div>
    )
}