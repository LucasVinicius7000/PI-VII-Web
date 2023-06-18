import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from './styles.module.css';

export default function InputNumber({ titleInput, setValue, limit = 0, interval = 1, noFloats }) {
  const [inputValue, setInputValue] = useState(0);

  const handleInputChange = (event) => {
    if (event.target.value === '') { setInputValue(0); setValue(0) }
    let lastValue = inputValue;
    debugger;
    const newValue = noFloats ? parseInt(event.target.value) : parseFloat(event.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setInputValue(newValue);
      setValue(newValue);
    } else {
      setInputValue(0);
      setValue(newValue);
    };
    if (limit !== 0 && newValue > limit) {
      setInputValue(lastValue);
      setValue(newValue);
    };
  };

  const handleIncrementClick = () => {
    let lastValue = inputValue;
    const newValue = inputValue + interval;
    setInputValue(newValue);
    setValue(newValue);
    if (limit !== 0 && newValue > limit) {
      setInputValue(lastValue);
      setValue(newValue);
    };
  };

  const handleDecrementClick = () => {
    let lastValue = inputValue;
    const newValue = inputValue - interval;
    if (newValue >= 0) {
      setInputValue(Math.round(newValue * 100) / 100);
      setValue(Math.round(newValue * 100) / 100);
    }
    if (limit !== 0 && newValue > limit) {
      setInputValue(Math.round(lastValue * 100) / 100);
      setValue(Math.round(lastValue * 100) / 100);
    };
  };



  return (
    <div className={styles.container}>
      <span>{titleInput}</span>
      <section>
        <button className={styles.btn} onClick={handleDecrementClick}>
          <FaMinus />
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
          <FaPlus />
        </button>
      </section>
    </div>
  );
}
