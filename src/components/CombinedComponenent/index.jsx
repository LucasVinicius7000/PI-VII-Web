import styles from './styles.module.css';
import Button from '../Button';
import DropdownProduct from '../Dropdown';
import React from "react";

export default function CombinedComponent({ titulo, componentes = [], id, width }) {
  return (
    <div id={id} style={{ width: width }}>
      <h2 className={styles.title}>{titulo}</h2>
      <div className={styles.column}>
        {componentes.map((component, index) => (
          <React.Fragment key={index}>
            {component}
          </React.Fragment>
        ))}
      </div>

    </div>
  );

}
