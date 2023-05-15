import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from './styles.module.css';

export default function InputNumber({ titleInput }) {
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      setInputValue(newValue);

    }
  };

  const handleIncrementClick = () => {
    const newValue = inputValue + 1;
    setInputValue(newValue);

  };

  const handleDecrementClick = () => {
    const newValue = inputValue - 1;
    if (newValue >= 0) {
      setInputValue(newValue);
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Delete' && event.target.selectionStart === 0 && event.target.selectionEnd === event.target.value.length) {
      setInputValue('');
    }
  };

  const handleInputFocus = (event) => {
    event.target.select();
  };

  InputNumber.propTypes = {
    value: PropTypes.number.isRequired,
  };

  return (
    <div className={styles.container} id="containerError">
      <span>{titleInput}</span>
      <div className={styles.inputArea}>
        <button className={styles.btn} onClick={handleDecrementClick}>
          <FaMinus />
        </button>
        <input
          type="number"
          className={styles.input}
          value={inputValue}
          placeholder='Quantidade em estoque'
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={handleInputFocus}
          min={0} // adiciona o atributo min para bloquear a entrada de números negativos
        />
        <button className={styles.btn} onClick={handleIncrementClick}>
          <FaPlus />
        </button>
      </div>
      <div className={styles.verticalDeco}></div>
    </div>
  );
}
