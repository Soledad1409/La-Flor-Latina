# La Flor Latina - Tienda de Indumentaria

Página web moderna de e-commerce para una tienda de indumentaria con panel de administración integrado.

## 🚀 Características

- ✅ Diseño responsivo y moderno
- ✅ Catálogo de productos con filtros y búsqueda
- ✅ Carrito de compras funcional
- ✅ Panel de administración completo
- ✅ Autenticación segura
- ✅ Base de datos con Supabase
- ✅ SEO optimizado
- ✅ Interfaz intuitiva y profesional

## 📋 Requisitos

- Node.js 16+
- npm o yarn
- Cuenta en Supabase (gratuita)

## 🔧 Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/la-flor-latina.git
cd la-flor-latina
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**
```bash
cp .env.example .env.local
```

Luego edita `.env.local` con tus credenciales de Supabase:
```
VITE_SUPABASE_URL=tu_url_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
```

4. **Configura la base de datos en Supabase**

Ejecuta el siguiente SQL en tu consola de Supabase:

```sql
-- Tabla de productos
CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  imagen VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de usuarios
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255),
  rol VARCHAR(50) DEFAULT 'cliente',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de pedidos
CREATE TABLE pedidos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID REFERENCES usuarios(id),
  total DECIMAL(10, 2) NOT NULL,
  estado VARCHAR(50) DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de items del pedido
CREATE TABLE pedido_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pedido_id UUID REFERENCES pedidos(id),
  producto_id UUID REFERENCES productos(id),
  cantidad INTEGER NOT NULL,
  precio DECIMAL(10, 2) NOT NULL
);
```

## 🏃 Uso

**Modo desarrollo:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

**Compilar para producción:**
```bash
npm run build
```

## 🔐 Credenciales de Administrador

Para acceder al panel de administración:
- **Email:** m.juli@live.com.ar
- **Contraseña:** Soledad1409

## 📁 Estructura del Proyecto

```
la-flor-latina/
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── pages/           # Páginas principales
│   ├── store/           # Estado global (Zustand)
│   ├── styles/          # Estilos CSS
│   ├── lib/             # Configuración de librerías
│   ├── App.jsx
│   └── index.jsx
├── public/              # Archivos estáticos
├── .env.example         # Variables de entorno
├── vite.config.js       # Configuración de Vite
├── tailwind.config.js   # Configuración de Tailwind
└── package.json
```

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18, Vite, React Router
- **Estilos:** Tailwind CSS
- **Estado:** Zustand
- **Base de Datos:** Supabase
- **Autenticación:** Supabase Auth
- **Iconos:** Lucide React

## 📝 Funcionalidades

### Para Clientes
- ✅ Ver catálogo de productos
- ✅ Buscar y filtrar por categoría
- ✅ Agregar productos al carrito
- ✅ Realizar compras
- ✅ Contactar con la tienda

### Para Administradores
- ✅ Agregar nuevos productos
- ✅ Editar información de productos
- ✅ Eliminar productos
- ✅ Gestionar stock
- ✅ Cambiar precios
- ✅ Ver pedidos recibidos

## 🚀 Deploy

### Vercel
```bash
npm run build
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

## 📞 Contacto

- Email: m.juli@live.com.ar
- WhatsApp: +54 (123) 456-7890
- Instagram: @laflorlatina

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Hecho con ❤️ por La Flor Latina**
