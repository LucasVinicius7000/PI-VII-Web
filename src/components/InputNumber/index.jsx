import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from './styles.module.css';

export default function InputNumber({ titleInput, setValue }) {
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setInputValue(newValue);
    } else {
      setInputValue(0);
    };
  };

  const handleIncrementClick = () => {
    const newValue = inputValue + 1;
    setInputValue(newValue);
    setValue(newValue);
  };

  const handleDecrementClick = () => {
    const newValue = inputValue - 1;
    if (newValue >= 0) {
      setInputValue(newValue);
      setValue(newValue);
    }
  };



  return (
    <div className={styles.container}>
      <span>{titleInput}</span>
      <div className={styles.inputArea}>
        <button className={styles.btn} onClick={handleDecrementClick}>
          <FaMinus size={16} />
        </button>
        <input
          type="number"
          className={styles.input}
          value={inputValue}
          placeholder='Quantidade em estoque'
          onChange={handleInputChange}
          min={0}
        />
        <button className={styles.btn} onClick={handleIncrementClick}>
          <FaPlus size={16} />
        </button>
      </div>
    </div>
  );
}
