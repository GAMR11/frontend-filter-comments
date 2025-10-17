// src/components/ResultCard.tsx
import type { SentimentResult } from '../services/apiService';
import '../styles/Results.css';

interface ResultCardProps {
  resultado: SentimentResult;
}

/**
 * Componente para mostrar el resultado del análisis de un comentario
 */
function ResultCard({ resultado }: ResultCardProps) {
  const getSentimentClass = (): string => {
    return resultado.etiqueta.toLowerCase();
  };

  return (
    <div className="resultado-container">
      <h3>✨ Resultado del Análisis</h3>
      
      <div className="stats-grid">
        <div className={`stat-box ${getSentimentClass()}`}>
          <span className="stat-label">Sentimiento</span>
          <span className="stat-value">{resultado.etiqueta}</span>
        </div>
        
        <div className="stat-box">
          <span className="stat-label">Confianza</span>
          <span className="stat-value">{resultado.confianza}%</span>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-item">
          <div className="progress-header">
            <span>😊 Positivo</span>
            <span className="percentage">{resultado.porcentaje_positivo}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill positivo"
              style={{ width: `${resultado.porcentaje_positivo}%` }}
            />
          </div>
        </div>

        <div className="progress-item">
          <div className="progress-header">
            <span>😞 Negativo</span>
            <span className="percentage">{resultado.porcentaje_negativo}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill negativo"
              style={{ width: `${resultado.porcentaje_negativo}%` }}
            />
          </div>
        </div>
      </div>

      <div className="analyzed-comment">
        <p className="comment-label">Comentario analizado:</p>
        <p className="comment-text">"{resultado.comentario}"</p>
      </div>
    </div>
  );
}

export default ResultCard;