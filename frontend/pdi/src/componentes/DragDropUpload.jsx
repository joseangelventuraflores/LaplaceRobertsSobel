import React, { useState, useRef } from "react";
import "./hojas-de-estilo/DragDropUpload.css";

function DragDropUpload({ onFileSelect }) {
  const [fileName, setFileName] = useState(""); 
  const [isDragging, setIsDragging] = useState(false); // <-- detecta cuando está arrastrando
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
      setIsDragging(false); // por si había animación
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true); // activa animación cuando el archivo está encima
  };

  const handleDragLeave = () => {
    setIsDragging(false); // vuelve al estado normal si el usuario se aleja
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-container">
      <div
        className={`drop-zone ${isDragging ? "dragging" : ""} ${fileName ? "selected" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p>{fileName ? `✅ ${fileName} lista para aplicar filtro` : "Arrastra una imagen aquí"}</p>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <button type="button" onClick={handleButtonClick} className="select-button">
        Seleccionar archivo
      </button>

      {fileName ? (
        <p className="file-name">Archivo seleccionado: <strong>{fileName}</strong> </p>
      ) : (
        <p className="file-name">No se eligió ningún archivo</p>
      )}
    </div>
  );
}

export default DragDropUpload;
