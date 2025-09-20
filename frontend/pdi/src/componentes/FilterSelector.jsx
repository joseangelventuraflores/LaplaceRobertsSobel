import React, { useState } from "react";

function FilterSelector({ onFilterApply }) {
  const [filtro, setFiltro] = useState("laplaciano");
  const [variante, setVariante] = useState("");

  const handleApply = () => onFilterApply(filtro, variante);

  return (
    <div className="filter-selector">
      <h2>Selecciona un filtro</h2>
      <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
        <option value="laplaciano">Laplaciano</option>
        <option value="roberts">Roberts</option>
        <option value="sobel">Sobel</option>
      </select>

      {(filtro === "roberts" || filtro === "sobel") && (
        <select value={variante} onChange={(e) => setVariante(e.target.value)}>
          {filtro === "roberts" && (
            <>
              <option value="↘">↘ clásica</option>
              <option value="↙">↙ ortogonal</option>
              <option value="↖">↘ invertida</option>
              <option value="↗">↙ alternativa</option>
            </>
          )}
          {filtro === "sobel" && (
            <>
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
              <option value="diag_↘">diag_↘</option>
              <option value="diag_↙">diag_↙</option>
              <option value="diag_↖">diag_↖</option>
              <option value="diag_↗">diag_↗</option>
            </>
          )}
        </select>
      )}

      <button onClick={handleApply}>Aplicar filtro</button>
    </div>
  );
}

export default FilterSelector;
