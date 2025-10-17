// src/components/CommentAnalyzer.tsx
import { useState } from 'react';
import apiService from '../services/apiService';
import type { SentimentResult } from '../services/apiService';
import ResultCard from './ResultCard.tsx';
import { MESSAGES, UI_TEXT } from '../utils/constants.ts';
import '../styles/CommentAnalyzer.css';

/**
 * Componente para analizar comentarios individuales
 */
function CommentAnalyzer() {
  const [comentario, setComentario] = useState<string>('');
  const [resultado, setResultado] = useState<SentimentResult | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalizar = async () => {
    // Validación
    if (!comentario.trim()) {
      setError(MESSAGES.EMPTY_COMMENT);
      return;
    }

    // Reset estados
    setError(null);
    setCargando(true);
    setResultado(null);

    try {
      const data = await apiService.analizarComentario(comentario);
      setResultado(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setCargando(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAnalizar();
    }
  };

  return (
    <div className="comment-analyzer-card">
      <h2 className="card-title">{UI_TEXT.SINGLE_TITLE}</h2>
      
      <textarea
        className="comment-textarea"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={UI_TEXT.PLACEHOLDER}
        rows={4}
        disabled={cargando}
      />

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      <button 
        className="btn-primary"
        onClick={handleAnalizar} 
        disabled={cargando || !comentario.trim()}
      >
        {cargando ? UI_TEXT.ANALYZING : UI_TEXT.ANALYZE}
      </button>

      <p className="hint-text">
        💡 Tip: Presiona Ctrl + Enter para analizar rápidamente
      </p>

      {resultado && <ResultCard resultado={resultado} />}
    </div>
  );
}

export default CommentAnalyzer;