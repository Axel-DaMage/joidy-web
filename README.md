# Joidy Web

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License: GPL v3](https://img.shields.io/badge/License-GPL_v3-blue.svg?style=for-the-badge)](https://github.com/Axel-DaMage/Joidy/blob/main/LICENSE)

Sitio web oficial y documentación de **[Joidy](https://github.com/Axel-DaMage/Joidy)**. 
Joidy es un sistema de progresión disciplinario (PKM) que convierte tus notas en puntos de experiencia. Privado, open-source y alojado en tu propia máquina.

## Inicio Rápido (Desarrollo Local)

El proyecto está construido con Next.js (App Router), React y TailwindCSS.

```bash
# 1. Clonar el repositorio
git clone https://github.com/Axel-DaMage/joidy-web.git
cd joidy-web

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la página en vivo.

## Stack Tecnológico

- **Framework:** Next.js (App Router)
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion
- **Iconos:** Lucide (Custom SVG implementados localmente)
- **Despliegue:** Optimizado para Vercel (Serverless Edge Functions)

## Endpoints Dinámicos

Este proyecto incluye una API Serverless interna configurada para obtener datos en tiempo real de GitHub protegiendo los límites de tarifa (rate-limit) mediante caché (ISR):
- `/api/github/version`: Obtiene el último *release* de Joidy desde GitHub y lo almacena en caché durante 24 horas.

## Licencia

Este sitio web es de código abierto. Puedes consultar la licencia oficial del ecosistema Joidy en el [repositorio principal](https://github.com/Axel-DaMage/Joidy).
