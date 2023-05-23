import React, { useState } from 'react';
import styles from "./styles.module.css";
import ImageEncoder from '../../services/ImageEncoder';

export default function QuadroClicavel({ texto, titulo, handleImage }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showText, setShowText] = useState(true);

  const handleClick = () => {
    if (selectedFile == null) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.click();
      fileInput.onchange = async (e) => {
        let result;
        await ImageEncoder(e).then((res) => {
          result = res?.base64;
          setSelectedFile(result);
          handleImage(result);
          setShowText(false);
        })
          .catch(() => {
            return;
          });
      };
    } else{
      setShowText(true);
      setSelectedFile(null);
      handleImage(null);
    };
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={styles.column}>
      <h2 className={styles.title}>{titulo}</h2>
      <div
        className={styles.card}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showText && <p className={styles.texto}>{texto}</p>}
        {selectedFile && (
          <img
            className={styles.imagem}
            src={selectedFile}
            alt="Imagem carregada"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        )}

      </div>

    </div>

  );
}
