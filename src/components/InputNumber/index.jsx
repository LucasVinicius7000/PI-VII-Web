import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from './styles.module.css';

export default function InputNumber({ value, onValueChange }) {
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      setInputValue(newValue);
      onValueChange(newValue);
    }
  };

  const handleIncrementClick = () => {
    const newValue = inputValue + 1;
    setInputValue(newValue);
    onValueChange(newValue);
  };

  const handleDecrementClick = () => {
    const newValue = inputValue - 1;
    if (newValue >= 0) {
      setInputValue(newValue);
      onValueChange(newValue);
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Delete' && event.target.selectionStart === 0 && event.target.selectionEnd === event.target.value.length) {
      setInputValue('');
      onValueChange('');
    }
  };

  const handleInputFocus = (event) => {
    event.target.select();
  };

  const handleInputBlur = (event) => {
    event.target.selectionStart = event.target.selectionEnd = 0;
  };

  InputNumber.propTypes = {
    value: PropTypes.number.isRequired,
    onValueChange: PropTypes.func.isRequired,
  };

  return (
    <div className={styles.container} id="containerError">
      <button className={styles.btn} onClick={handleDecrementClick}>
        <FaMinus />
      </button>
      <input
        type="number"
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        min={0} // adiciona o atributo min para bloquear a entrada de números negativos
      />
      <button className={styles.btn} onClick={handleIncrementClick}>
        <FaPlus />
      </button>
      <div className={styles.verticalDeco}></div>
    </div>
  );
}
