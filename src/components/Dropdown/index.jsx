import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

export default function DropdownProduct({ options, onSelect, placeholder, width, height }) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ label: placeholder });

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={styles.dropdowncontainer} style={{ height, width: width ? width : undefined }}>
      <div className={styles.dropdownheader} onClick={toggleDropdown}>
        <span style={{ color: !(placeholder === selectedOption.label ) ? "#464647" : undefined }}>{selectedOption.label}</span>
        <div className={styles.arrow} onClick={toggleDropdown}></div>
      </div>
      {isOpen && (
        <ul className={styles.dropdownmenu}>
          {options.map((option) => (
            option.label !== placeholder && (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option)}>
                {option.label}
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  );
};
