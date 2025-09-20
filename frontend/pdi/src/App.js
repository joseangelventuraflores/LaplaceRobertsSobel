import React, { useState } from "react";
import DragDropUpload from "./componentes/DragDropUpload";
import FilterSelector from "./componentes/FilterSelector";
import ResultPreview from "./componentes/ResultPreview";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result); // conserva todo, incluido el encabezado
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });


  const applyFilter = async (filtro, variante) => {
    if (!file) return alert("Sube una imagen primero");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filtro", filtro);
    if (variante) formData.append("variante", variante);

    console.log("Enviando archivo:", file.name, filtro, variante);

    try {
      const res = await fetch("http://127.0.0.1:8000/procesar", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const texto = await res.text();
        throw new Error(`HTTP ${res.status}: ${texto}`);
      }

      const data = await res.json();

      if (data.error) {
        alert("Error del backend: " + data.error);
        return;
      }

      const base64Original = await fileToBase64(file);
      setResult({ ...data, original: base64Original });


    } catch (err) {
      console.error("Error al llamar al backend:", err);
      alert("Error comunicándose con el backend: " + err.message);
    }
  };

  return (
    <div className="container">
      <h1>Filtros PDI en la Web</h1>
      <DragDropUpload onFileSelect={setFile} />
      <FilterSelector onFilterApply={applyFilter} />
      <ResultPreview result={result} />
    </div>
  );
}

export default App;
