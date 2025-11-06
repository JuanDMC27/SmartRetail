# 🏪 SmartRetail

**SmartRetail** es una solución integral de análisis y gestión de ventas minoristas, desarrollada como parte de un reto de hackatón.  
El sistema permite a **empleados registrar ventas y subir archivos Excel**, mientras que los **administradores acceden a un dashboard analítico** y a un **chatbot de soporte para toma de decisiones**.

---

## 📘 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Instalación y Configuración](#instalación-y-configuración)
6. [Ejecución del Proyecto](#ejecución-del-proyecto)
7. [Rutas Principales del Backend](#rutas-principales-del-backend)
8. [Autores](#autores)
9. [Licencia](#licencia)

---

## 🧩 Descripción General

SmartRetail busca optimizar la **gestión de ventas** y la **toma de decisiones** mediante el uso de un sistema centralizado que:

- Permite **registrar ventas** de forma manual o mediante carga masiva de archivos.
- Ofrece **paneles de visualización** con métricas y reportes de rendimiento.
- Integra un **chatbot analítico** para soporte y consulta de datos.
- Implementa un **sistema de roles** (Administrador / Empleado) con autenticación.

---

## 🏗️ Arquitectura del Proyecto

El sistema está dividido en tres componentes principales:

```
SmartRetail/
│
├── frontend/ (React + Vite + Tailwind)
│   ├── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│
├── smartRetailbackend/ (API REST Node.js o Django)
│   ├── src/
│   │   ├── config/ → configuración de servidor y base de datos
│   │   ├── controllers/ → lógica de negocio
│   │   ├── middleware/ → validaciones y seguridad
│   │   ├── models/ → esquemas de base de datos
│   │   └── routes/ → definición de endpoints
│
└── prueba_api_gemina/ → entorno de pruebas y prototipos de integración
```

---

## ⚙️ Tecnologías Utilizadas

### **Frontend**
- React.js + Vite
- TailwindCSS
- Axios
- React Router DOM

### **Backend**
- Node.js / Express (según estructura actual)
- JWT para autenticación
- PostgreSQL (usando Supabase como servicio gestionado)
- Dotenv para configuración de entorno

### **Herramientas Adicionales**
- Git & GitHub (control de versiones)
- ESLint (estilo de código)
- npm / yarn (gestión de dependencias)

---

## 🧰 Instalación y Configuración

### **1️⃣ Clonar el repositorio**
```bash
git clone -b Juan --single-branch https://github.com/JuanDMC27/SmartRetail.git
cd SmartRetail
```

### **2️⃣ Backend**
```bash
cd smartRetailbackend
npm install
```

Crea el archivo `.env` con tus variables de entorno:
```env
PORT=8000
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/dbname
JWT_SECRET=clave_segura
```

### **3️⃣ Frontend**
```bash
cd ../SmartRetail
npm install
```

---

## 🚀 Ejecución del Proyecto

### **Backend**
```bash
cd smartRetailbackend
npm run dev
```

### **Frontend**
```bash
cd SmartRetail
npm run dev
```

La aplicación estará disponible en:
```
Frontend: http://localhost:5173
Backend: http://localhost:8000
```

---

## 🔗 Rutas Principales del Backend

| Módulo | Método | Ruta | Descripción |
|---------|---------|------|--------------|
| Producto | GET | `/api/productos` | Listar productos |
| Producto | POST | `/api/productos` | Crear producto |
| Usuario | POST | `/api/usuarios/login` | Iniciar sesión |
| Sucursal | GET | `/api/sucursales` | Listar sucursales |
| Venta | POST | `/api/ventas` | Registrar venta |
| DetalleVenta | GET | `/api/detalle_venta/:id` | Detalle de venta |

---

## 👥 Autores

- **Juan David Miranda** – Frontend Developer
- **Maubry Yadid Ortega Sanchez** – Desarrollador Full Stack
- **Keynner Andres Perafan** – Backend Developer

- **Equipo SmartRetail - Hackatón FUP 2025**

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.  
Consulta el archivo [LICENSE](LICENSE) para más información.

---

## 🧠 Notas Técnicas

- El sistema está diseñado bajo principios **RESTful**.  
- Se recomienda ejecutar el backend y frontend en entornos separados para facilitar la integración continua.
- Compatible con despliegue en **Render**, **Vercel** o **Supabase Edge Functions**.

---

> 💡 *SmartRetail — Digitalizando la gestión y análisis de ventas para un retail más inteligente.*
