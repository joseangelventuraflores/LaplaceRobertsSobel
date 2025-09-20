import React from "react";
import DownloadButton from "./DownloadButton";
import ImageCompareSlider from "./ImageCompareSlider";
import "./hojas-de-estilo/ResultPreview.css"

function ResultPreview({ result, originalFile }) {
  if (!result || !result.original) return null;

  const beforeSrc = result.original;
  const afterSrc = `data:image/png;base64,${result.imagen}`;



  return (
    <div className="result-preview">
      <h2>Resultado</h2>
      <ImageCompareSlider beforeSrc={beforeSrc} afterSrc={afterSrc} />
      <p><strong>Filtro:</strong> {result.filtro}</p>
      <p id="exp"><strong>Explicación:</strong> {result.kernel}</p>
      <DownloadButton base64Image={result.imagen} />
    </div>
  );
}

export default ResultPreview;

