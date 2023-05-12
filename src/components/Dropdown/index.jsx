import React, { useState } from 'react';
import styles from './styles.module.css';

export default function DropdownProduct({ options, onSelect, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ label: placeholder });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdowncontainer}>
      <div className={styles.dropdownheader} onClick={toggleDropdown}>
        <span>{selectedOption.label}</span>
        <i className={`fas fa-caret-${isOpen ? 'up' : 'down'}`} onClick={toggleDropdown}></i>
      </div>
      {isOpen && (
        <ul className={styles.dropdownmenu}>
          {options.map((option) => (
            option.label !== placeholder && (
              <li key={option.value} onClick={() => handleOptionClick(option)}>
                {option.label}
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  );
};
