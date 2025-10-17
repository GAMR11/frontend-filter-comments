// src/App.tsx
import { useEffect, useState } from 'react';
import CommentAnalyzer from './components/CommentAnalyzer';
import FileAnalyzer from './components/FileAnalyzer';
import apiService from './services/apiService';
import { UI_TEXT } from './utils/constants.ts';
import './styles/App.css';

type ApiStatus = 'checking' | 'online' | 'offline';

/**
 * Componente principal de la aplicación
 */
function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking');

  // Verificar estado de la API al cargar
  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const health = await apiService.healthCheck();
      setApiStatus(health.status === 'healthy' ? 'online' : 'offline');
    } catch {
      setApiStatus('offline');
    }
  };

  const getStatusColor = () => {
    return apiStatus === 'online' ? '#d4edda' : '#f8d7da';
  };

  const getTextColor = () => {
    return apiStatus === 'online' ? '#155724' : '#721c24';
  };

  const getDotColor = () => {
    return apiStatus === 'online' ? '#28a745' : '#dc3545';
  };

  const getStatusText = () => {
    if (apiStatus === 'checking') return 'Verificando API...';
    if (apiStatus === 'online') return 'API Conectada';
    return 'API Desconectada - Verifica que esté corriendo';
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">{UI_TEXT.APP_TITLE}</h1>
          <p className="app-subtitle">{UI_TEXT.APP_SUBTITLE}</p>
          
          {/* Indicador de estado de API */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px',
            background: getStatusColor(),
            color: getTextColor(),
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            marginTop: '15px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: getDotColor(),
              animation: apiStatus === 'checking' ? 'pulse 1.5s infinite' : 'none'
            }} />
            {getStatusText()}
          </div>
        </header>

        {/* Componentes principales */}
        <main>
          <div className="card">
            <CommentAnalyzer />
          </div>

          <div className="card">
            <FileAnalyzer />
          </div>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>{UI_TEXT.POWERED_BY}</p>
          <p style={{ fontSize: '0.85rem', marginTop: '10px', opacity: 0.8 }}>
            Desarrollado con 💜 | {new Date().getFullYear()}
          </p>
        </footer>
      </div>

      {/* Estilos para animación de pulse */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

export default App;