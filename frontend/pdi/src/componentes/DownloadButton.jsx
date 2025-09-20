import React from "react";

function DownloadButton({ base64Image }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${base64Image}`;
    link.download = "resultado.png";
    link.click();
  };

  return (
    <button onClick={handleDownload}>
      Descargar imagen
    </button>
  );
}

export default DownloadButton;
