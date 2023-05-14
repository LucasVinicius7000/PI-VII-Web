import React, { useState } from 'react';
import styles from "./styles.module.css";

export default function QuadroClicavel({ texto, titulo }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showText, setShowText] = useState(true);

  const handleClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
      setShowText(false);
    };
    fileInput.click();
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
      
      {/* Conteúdo do quadro */}
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
