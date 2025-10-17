// src/components/BatchResults.tsx
import { useState } from 'react';
import type { BatchSentimentResult } from '../services/apiService';
import '../styles/Results.css';

interface BatchResultsProps {
  resultados: BatchSentimentResult;
}

/**
 * Componente para mostrar resultados de análisis batch (múltiples comentarios)
 */
function BatchResults({ resultados }: BatchResultsProps) {
  const [mostrarTodos, setMostrarTodos] = useState<boolean>(false);
  
  const comentariosMostrar = mostrarTodos 
    ? resultados.comentarios_analizados 
    : resultados.comentarios_analizados.slice(0, 10);

  const getSentimentEmoji = (etiqueta: string): string => {
    switch(etiqueta) {
      case 'Positivo': return '😊';
      case 'Negativo': return '😞';
      default: return '😐';
    }
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(resultados, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analisis-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="resultado-container">
      <h3>📊 Resumen General</h3>
      
      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-label">Total Comentarios</span>
          <span className="stat-value">{resultados.total_comentarios}</span>
        </div>
        
        <div className="stat-box positivo">
          <span className="stat-label">Positivos</span>
          <span className="stat-value">{resultados.porcentaje_positivo_general}%</span>
        </div>
        
        <div className="stat-box negativo">
          <span className="stat-label">Negativos</span>
          <span className="stat-value">{resultados.porcentaje_negativo_general}%</span>
        </div>
        
        <div className="stat-box neutral">
          <span className="stat-label">Neutrales</span>
          <span className="stat-value">{resultados.porcentaje_neutral}%</span>
        </div>
      </div>

      <div className="comentarios-section">
        <h4>💬 Comentarios Analizados</h4>
        
        <div className="comentarios-list">
          {comentariosMostrar.map((item, index) => (
            <div key={index} className="comentario-item">
              <div className="comentario-content">
                <span className="comentario-number">#{index + 1}</span>
                <p className="comentario-texto">"{item.comentario}"</p>
              </div>
              
              <div className="comentario-badge-group">
                <span className={`badge ${item.etiqueta.toLowerCase()}`}>
                  {getSentimentEmoji(item.etiqueta)} {item.etiqueta}
                </span>
                <span className="badge-percentage">
                  {item.etiqueta === 'Positivo' 
                    ? item.porcentaje_positivo 
                    : item.porcentaje_negativo}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {resultados.comentarios_analizados.length > 10 && (
          <button 
            className="toggle-button"
            onClick={() => setMostrarTodos(!mostrarTodos)}
          >
            {mostrarTodos 
              ? '▲ Mostrar menos' 
              : `▼ Ver todos (${resultados.comentarios_analizados.length} comentarios)`
            }
          </button>
        )}
      </div>

      <div className="export-section">
        <button 
          className="export-button"
          onClick={handleDownload}
        >
          💾 Descargar Resultados (JSON)
        </button>
      </div>
    </div>
  );
}

export default BatchResults;