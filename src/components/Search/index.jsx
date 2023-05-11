import styles from "./styles.module.css";
import { useState } from "react";

export default function Search({ decoIcon, searchIcon, onSearch, placeholder, value = "", listItemsResult = [], onChange, onClickItemList, width, height, paddingLeft, alignItems, paddingBottom, text }) {

    
    return <div className={styles.container} style={{ width: `${width}px`, height: `${height}px`, paddingLeft: `${paddingLeft}px`, alignItems: `${alignItems}px`, paddingBottom: `${paddingBottom}px`}}>
        <div className={styles.containerInput} id={listItemsResult.length > 0 ? styles.borderAdjust : ""}>
            <span id={styles.icon}>{decoIcon}</span>
            <input value={value} placeholder={placeholder} className={styles.input} onChange={onChange}></input>
            <span onClick={onSearch}>{searchIcon}</span>
        </div>
        <div className={styles.list}>
            {
                listItemsResult.length > 0 && listItemsResult.map((item, index) => {
                    return <span key={index + Math.random()} onClick={() => { onClickItemList(item) }}>{item.value}</span>
                })
            }
        </div>
    </div>
}