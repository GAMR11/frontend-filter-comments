// src/components/FileAnalyzer.tsx
import { useState } from 'react';
import apiService from '../services/apiService';
import type { BatchSentimentResult } from '../services/apiService'; // ✅ SOLUCIÓN
import BatchResults from './BatchResults.tsx';
import { MESSAGES, UI_TEXT, FILE_CONFIG } from '../utils/constants.ts';
import '../styles/FileAnalyzer.css';

/**
 * Componente para analizar archivos CSV/Excel
 */
function FileAnalyzer() {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [resultadoBatch, setResultadoBatch] = useState<BatchSentimentResult | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > FILE_CONFIG.MAX_SIZE_MB) {
        setError(`El archivo es muy grande. Máximo ${FILE_CONFIG.MAX_SIZE_MB}MB`);
        setArchivo(null);
        return;
      }
      setArchivo(file);
      setError(null);
    }
  };

  const handleAnalizar = async () => {
    if (!archivo) {
      setError(MESSAGES.NO_FILE);
      return;
    }

    setError(null);
    setCargando(true);
    setResultadoBatch(null);

    try {
      let data: BatchSentimentResult;
      if (archivo.name.endsWith(FILE_CONFIG.CSV_EXTENSION)) {
        data = await apiService.analizarCSV(archivo);
      } else {
        data = await apiService.analizarExcel(archivo);
      }
      setResultadoBatch(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setCargando(false);
    }
  };

  const handleRemoveFile = () => {
    setArchivo(null);
    setResultadoBatch(null);
    setError(null);
  };

  return (
    <div className="file-analyzer-card">
      <h2 className="card-title">{UI_TEXT.BATCH_TITLE}</h2>

      <div className="file-upload-section">
        <input
          type="file"
          accept={FILE_CONFIG.ACCEPTED_FORMATS}
          onChange={handleFileChange}
          id="file-input"
          className="file-input-hidden"
          disabled={cargando}
        />
        
        <label htmlFor="file-input" className="file-label">
          {archivo ? (
            <span className="file-selected">
              📄 {archivo.name}
              <button 
                className="remove-file-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFile();
                }}
                type="button"
              >
                ✕
              </button>
            </span>
          ) : (
            UI_TEXT.SELECT_FILE
          )}
        </label>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <button 
          className="btn-secondary"
          onClick={handleAnalizar}
          disabled={cargando || !archivo}
        >
          {cargando ? UI_TEXT.PROCESSING : UI_TEXT.ANALYZE_FILE}
        </button>

        <div className="file-info">
          <p>✅ Formatos aceptados: CSV, Excel (.xlsx, .xls)</p>
          <p>✅ El archivo debe tener una columna llamada "comentario" o "texto"</p>
          <p>✅ Tamaño máximo: {FILE_CONFIG.MAX_SIZE_MB}MB</p>
        </div>
      </div>

      {resultadoBatch && <BatchResults resultados={resultadoBatch} />}
    </div>
  );
}

export default FileAnalyzer;