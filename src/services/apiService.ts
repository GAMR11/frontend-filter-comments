// const API_BASE_URL = 'http://localhost:8000';//dev
const API_BASE_URL = import.meta.env.URL_API_BACKEND;//prod

export interface SentimentResult {
  comentario: string;
  etiqueta: string;
  confianza: number;
  porcentaje_positivo: number;
  porcentaje_negativo: number;
}

export interface BatchSentimentResult {
  total_comentarios: number;
  porcentaje_positivo_general: number;
  porcentaje_negativo_general: number;
  porcentaje_neutral: number;
  comentarios_analizados: SentimentResult[];
}

export interface HealthCheckResponse {
  status: string;
  modelo_cargado?: boolean;
}

/**
 * Servicio para manejar todas las peticiones a la API de análisis de sentimientos
 */
class ApiService {
  /**
   * Analiza un comentario individual
   */
  async analizarComentario(comentario: string): Promise<SentimentResult> {
    try {
      const response = await fetch(`${API_BASE_URL}/analizar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comentario })
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al analizar comentario:', error);
      throw new Error('No se pudo conectar con el servidor. Verifica que la API esté corriendo.');
    }
  }

  /**
   * Analiza múltiples comentarios desde un archivo CSV
   */
  async analizarCSV(archivo: File): Promise<BatchSentimentResult> {
    return this.analizarArchivo(archivo, '/analizar-csv');
  }

  /**
   * Analiza múltiples comentarios desde un archivo Excel
   */
  async analizarExcel(archivo: File): Promise<BatchSentimentResult> {
    return this.analizarArchivo(archivo, '/analizar-excel');
  }

  /**
   * Método privado para manejar upload de archivos
   */
  private async analizarArchivo(archivo: File, endpoint: string): Promise<BatchSentimentResult> {
    try {
      const formData = new FormData();
      formData.append('file', archivo);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error al analizar archivo:', error);
      throw new Error('No se pudo procesar el archivo. Verifica el formato.');
    }
  }

  /**
   * Verifica el estado de salud de la API
   */
  async healthCheck(): Promise<HealthCheckResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      return { status: 'offline' };
    }
  }
}

// Exportar una única instancia (Singleton pattern)
export default new ApiService();