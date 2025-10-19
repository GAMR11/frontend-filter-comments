# 🎭 Análisis de Sentimientos - Frontend

Aplicación web moderna para analizar sentimientos en comentarios usando Inteligencia Artificial. Interfaz desarrollada con React + TypeScript + Vite.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green)

**🌐 Demo en vivo:** [https://frontend-filter-comments.vercel.app/](https://frontend-filter-comments.vercel.app/)

---

## 📸 Capturas de Pantalla

### Interfaz Principal
![Interfaz Principal](./screenshots/interfaz-principal.webp)
*Vista general con ambas opciones de análisis y estado de conexión con la API*

### Análisis Individual
![Análisis Individual](./screenshots/analisis-individual.webp)
*Resultados detallados con gráficos de porcentajes y nivel de confianza*

### Análisis por Lotes (CSV/Excel)
![Análisis Batch](./screenshots/analisis-batch.webp)
*Procesamiento de múltiples comentarios con estadísticas generales*

---

## ✨ Características

- 🔍 **Análisis Individual**: Analiza comentarios de forma rápida con Ctrl+Enter
- 📊 **Análisis por Lotes**: Sube archivos CSV o Excel con múltiples comentarios
- 📈 **Visualización en Tiempo Real**: Gráficos de porcentajes y métricas detalladas
- 🎨 **Interfaz Moderna**: Diseño responsive con gradientes y animaciones
- 💾 **Exportación de Datos**: Descarga resultados en formato JSON
- 🔄 **Estado de API**: Monitoreo en tiempo real de la conexión con el backend
- ⚡ **Optimizado**: Code splitting y lazy loading para mejor rendimiento
- 🌐 **SEO Ready**: Meta tags y Open Graph configurados
- 📱 **100% Responsive**: Funciona perfectamente en móviles, tablets y desktop

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Framework** | React | 18.3 |
| **Lenguaje** | TypeScript | 5.0 |
| **Build Tool** | Vite | 5.0 |
| **Estilos** | CSS3 + CSS Modules | - |
| **HTTP Client** | Fetch API | Nativo |
| **Deploy** | Vercel | - |
| **Linting** | ESLint | Latest |

---

## 🏗️ Arquitectura

```
┌────────────────────────────────────────────────┐
│            Usuario (Navegador)                 │
└────────────────┬───────────────────────────────┘
                 │ HTTPS
                 ↓
┌────────────────────────────────────────────────┐
│         Frontend (Vercel Edge Network)         │
│  • React SPA                                   │
│  • TypeScript Type Safety                      │
│  • Component-based Architecture                │
│  • Service Layer Pattern                       │
└────────────────┬───────────────────────────────┘
                 │ REST API
                 ↓
┌────────────────────────────────────────────────┐
│         Backend API (Render)                   │
│  • FastAPI                                     │
│  • Hugging Face Integration                    │
│  • Firebase Firestore                          │
└────────────────────────────────────────────────┘
```

---

## 📋 Requisitos Previos

- **Node.js** 18.0 o superior
- **npm** 9.0 o superior (o yarn/pnpm)
- **Backend API** corriendo (local o en Render)

---

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/GAMR11/frontend-filter-comments.git
cd frontend-filter-comments
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea los siguientes archivos en la raíz del proyecto:

#### **`.env.development`** (Desarrollo local)
```env
VITE_API_URL=http://localhost:8000
```

#### **`.env.production`** (Producción)
```env
VITE_API_URL=https://tu-api.onrender.com
```

**Nota:** Reemplaza `https://tu-api.onrender.com` con la URL real de tu backend.

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

---

## 📦 Build y Deploy

### Build Local

```bash
# Crear build de producción
npm run build

# Preview del build
npm run preview
```

Los archivos optimizados se generarán en `dist/`

### Deploy en Vercel (Recomendado)

#### **Opción A: Desde GitHub (Automático)**

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Click en **"Add New Project"**
4. Importa tu repositorio
5. Vercel detectará automáticamente Vite
6. Configura la variable de entorno:
   - `VITE_API_URL` = `https://tu-api.onrender.com`
7. Click en **"Deploy"**

#### **Opción B: Desde CLI**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### **Deploy Automático**

Vercel hace redeploy automático en cada push a `main`.

---

## 📁 Estructura del Proyecto

```
frontend-filter-comments/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/              # Componentes React
│   │   ├── CommentAnalyzer.tsx  # Análisis individual
│   │   ├── FileAnalyzer.tsx     # Upload y análisis de archivos
│   │   ├── ResultCard.tsx       # Tarjeta de resultado individual
│   │   └── BatchResults.tsx     # Resultados batch con estadísticas
│   ├── services/                # Capa de servicios
│   │   └── apiService.ts        # Cliente API centralizado
│   ├── styles/                  # Estilos CSS
│   │   ├── App.css              # Estilos globales
│   │   ├── CommentAnalyzer.css  # Estilos del analizador
│   │   ├── FileAnalyzer.css     # Estilos del uploader
│   │   └── Results.css          # Estilos de resultados
│   ├── utils/                   # Utilidades
│   │   └── constants.ts         # Constantes y configuración
│   ├── App.tsx                  # Componente raíz
│   ├── main.tsx                 # Entry point
│   └── vite-env.d.ts            # Tipos de Vite
├── screenshots/                 # Capturas para README
├── .env.development             # Variables de desarrollo
├── .env.production              # Variables de producción
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json                # Configuración TypeScript
├── vite.config.ts               # Configuración Vite
└── README.md
```

---

## 🎯 Guía de Uso

### Análisis Individual

1. **Escribe tu comentario** en el área de texto
2. **Presiona "Analizar"** o usa el atajo `Ctrl + Enter`
3. **Visualiza los resultados:**
   - Etiqueta (Positivo/Negativo/Neutral)
   - Nivel de confianza
   - Porcentajes con barras de progreso
   - Comentario original

### Análisis por Lotes

1. **Prepara tu archivo:**
   - Formato: CSV o Excel (.xlsx, .xls)
   - Debe tener una columna llamada: `comentario`, `comentarios`, `texto`, `comment` o `text`
   - Tamaño máximo: 10MB

2. **Sube el archivo:**
   - Click en "Seleccionar archivo"
   - Elige tu archivo
   - Click en "Analizar Archivo"

3. **Visualiza los resultados:**
   - Resumen general con porcentajes
   - Lista completa de comentarios analizados
   - Opción para descargar en JSON

**Ejemplo de archivo CSV:**
```csv
comentario
Me encanta este producto
El servicio fue terrible
El precio es razonable
Atención al cliente excelente
No me gustó la experiencia
```

---

## 🔌 Integración con Backend

### API Service

El servicio `apiService.ts` centraliza todas las comunicaciones:

```typescript
// src/services/apiService.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  async analizarComentario(comentario: string): Promise<SentimentResult>
  async analizarCSV(archivo: File): Promise<BatchSentimentResult>
  async analizarExcel(archivo: File): Promise<BatchSentimentResult>
  async healthCheck(): Promise<HealthCheckResponse>
}
```

### Endpoints Consumidos

| Endpoint | Método | Función |
|----------|--------|---------|
| `/analizar` | POST | Analiza un comentario individual |
| `/analizar-csv` | POST | Procesa archivo CSV |
| `/analizar-excel` | POST | Procesa archivo Excel |
| `/health` | GET | Verifica estado del backend |
| `/statistics` | GET | Obtiene métricas de uso |

---

## 🎨 Personalización

### Cambiar colores del tema

Edita `src/styles/App.css`:

```css
.app-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Cambia estos valores por tus colores */
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Modificar textos de la UI

Edita `src/utils/constants.ts`:

```typescript
export const UI_TEXT = {
  APP_TITLE: '🎭 Análisis de Sentimientos',
  APP_SUBTITLE: 'Descubre si un comentario es positivo o negativo usando IA',
  // ... más textos
};
```

### Ajustar configuración de archivos

```typescript
export const FILE_CONFIG = {
  MAX_SIZE_MB: 10,  // Tamaño máximo
  ACCEPTED_FORMATS: '.csv,.xlsx,.xls',
};
```

---

## 🐛 Solución de Problemas

### Error: "API Desconectada"

**Causa:** El backend no está corriendo o la URL es incorrecta.

**Solución:**
```bash
# Verifica la variable de entorno
echo $VITE_API_URL

# Verifica que el backend esté corriendo
curl https://tu-api.onrender.com/health

# Si es local:
cd ../backend
python main.py
```

### Error: "CORS policy"

**Causa:** El backend no tiene configurado CORS para tu dominio.

**Solución:** En el backend (`main.py`), agrega tu dominio:
```python
origins = [
    "http://localhost:5173",
    "https://tu-frontend.vercel.app",  # Agrega esto
]
```

### Error al subir archivos

**Causas comunes:**
- Archivo muy grande (>10MB)
- Formato incorrecto (no CSV/Excel)
- Sin columna "comentario" o "texto"

**Validación:**
```csv
✅ CORRECTO:
comentario
Este es mi comentario

❌ INCORRECTO:
opinion
Este es mi comentario
```

### Build falla en Vercel

**Causa:** Variables de entorno no configuradas.

**Solución:**
1. Vercel Dashboard → tu proyecto
2. Settings → Environment Variables
3. Agregar: `VITE_API_URL` = `https://tu-api.onrender.com`
4. Redeploy

---

## 🧪 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo (puerto 5173)
npm run build        # Build de producción
npm run preview      # Preview del build localmente
npm run lint         # Ejecutar ESLint
npm run type-check   # Verificar tipos de TypeScript
```

---

## 📊 Características Técnicas

### Optimizaciones

- **Code Splitting:** Carga componentes bajo demanda
- **Tree Shaking:** Elimina código no usado
- **Minificación:** CSS y JS comprimidos
- **Lazy Loading:** Carga de imágenes diferida
- **Caching:** Headers optimizados en Vercel

### Performance

| Métrica | Valor |
|---------|-------|
| **First Contentful Paint** | <1s |
| **Time to Interactive** | <2s |
| **Lighthouse Score** | 95+ |
| **Bundle Size (gzip)** | ~80KB |

### SEO

- Meta tags configurados
- Open Graph para redes sociales
- Sitemap generado automáticamente
- Robots.txt incluido

---

## 🔒 Seguridad

- ✅ Variables de entorno para URLs sensibles
- ✅ Validación de archivos en cliente
- ✅ HTTPS forzado en producción (Vercel)
- ✅ Headers de seguridad configurados
- ✅ No expone credenciales en el código

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Gustavo Morales**

- 🐙 GitHub: [@GAMR11](https://github.com/GAMR11)
- 💼 LinkedIn: [gustavo-morales-640259221](https://www.linkedin.com/in/gustavo-morales-640259221)
- 📧 Email: [gamr130898@gmail.com](mailto:gamr130898@gmail.com)

---


## 🔗 Enlaces Relacionados

- **Backend API:** [github.com/GAMR11/api-filter-comments](https://github.com/GAMR11/api-filter-comments)
- **Demo en Vivo:** [tu-frontend.vercel.app](https://tu-frontend.vercel.app)
- **API Docs:** [tu-api.onrender.com/docs](https://tu-api.onrender.com/docs)
- **Modelo BETO:** [huggingface.co/finiteautomata/beto-sentiment-analysis](https://huggingface.co/finiteautomata/beto-sentiment-analysis)

---

## 🚀 Roadmap

### v2.0 (Próximo)
- [ ] Dashboard con gráficos avanzados
- [ ] Historial de análisis
- [ ] Comparación de resultados
- [ ] Exportación a PDF

### v2.1 (Futuro)
- [ ] Modo oscuro
- [ ] Análisis de emociones específicas
- [ ] Integración con Grafana

---


**Desarrollado con 💜 | 2025**

*Este proyecto es parte de un portafolio personal. Si te gusta, dale una ⭐ en GitHub!*