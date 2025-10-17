// src/utils/constants.js

/**
 * Tipos de sentimiento
 */
export const SENTIMENT_TYPES = {
    POSITIVO: 'Positivo',
    NEGATIVO: 'Negativo',
    NEUTRAL: 'Neutral'
  };
  
  /**
   * Mensajes de la aplicación
   */
  export const MESSAGES = {
    EMPTY_COMMENT: 'Por favor ingresa un comentario',
    NO_FILE: 'Por favor selecciona un archivo',
    CONNECTION_ERROR: 'No se pudo conectar con el servidor',
    PROCESSING_ERROR: 'Error al procesar la solicitud'
  };
  
  /**
   * Configuración de archivos
   */
  export const FILE_CONFIG = {
    CSV_EXTENSION: '.csv',
    EXCEL_EXTENSIONS: ['.xlsx', '.xls'],
    ACCEPTED_FORMATS: '.csv,.xlsx,.xls',
    MAX_SIZE_MB: 10
  };
  
  /**
   * Textos de la UI
   */
  export const UI_TEXT = {
    APP_TITLE: '🎭 Análisis de Sentimientos',
    APP_SUBTITLE: 'Descubre si un comentario es positivo o negativo usando IA',
    SINGLE_TITLE: '📝 Analizar Comentario Individual',
    BATCH_TITLE: '📊 Analizar Múltiples Comentarios (CSV/Excel)',
    PLACEHOLDER: 'Escribe un comentario aquí... Ejemplo: "Este producto es excelente!"',
    ANALYZING: '⏳ Analizando...',
    ANALYZE: '🔍 Analizar',
    PROCESSING: '⏳ Procesando...',
    ANALYZE_FILE: '📈 Analizar Archivo',
    SELECT_FILE: '📎 Seleccionar archivo',
    POWERED_BY: 'Powered by FastAPI + Hugging Face + React'
  };