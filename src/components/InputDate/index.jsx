import styles from "./styles.module.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.module.css";
export default function InputDate
    ({
        placeholder,
        backgroundColor,
        onChange,
        value,
    }) {


    return <DatePicker
        calendarClassName={styles.calendar}
        className={styles.picker}
        placeholderText={placeholder}
        onChange={onChange}
        selected={value}
    >
    </DatePicker>
}