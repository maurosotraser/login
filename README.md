# Sistema de Autenticación con Next.js

Este proyecto implementa un sistema de autenticación completo utilizando Next.js, con funcionalidades de inicio de sesión y registro de usuarios. El proyecto está construido con tecnologías modernas y sigue las mejores prácticas de desarrollo.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para el frontend
- **TypeScript**: Para tipado estático
- **Zod**: Validación de formularios
- **React Hook Form**: Manejo de formularios
- **Tailwind CSS**: Framework de CSS para el diseño
- **JWT**: Para la autenticación basada en tokens

## Estructura del Proyecto

```
src/
├── app/
│   ├── login/           # Página de inicio de sesión
│   ├── dashboard/       # Página del dashboard
│   └── services/        # Servicios de la aplicación
│       └── auth.ts      # Servicio de autenticación
```

## Pantallas y Funcionalidades

### 1. Página de Login (`/login`)

**Ubicación**: `src/app/login/page.tsx`

**Funcionalidades**:
- Formulario de inicio de sesión con validación
- Campos:
  - Email (con validación de formato)
  - Contraseña (mínimo 6 caracteres)
- Manejo de errores de autenticación
- Redirección automática al dashboard si ya está autenticado
- Enlace para registro de nuevos usuarios

**Características técnicas**:
- Validación de formularios con Zod
- Gestión del estado del formulario con React Hook Form
- Almacenamiento del token en localStorage
- Manejo de estados de carga y errores

### 2. Dashboard (`/dashboard`)

**Ubicación**: `src/app/dashboard/page.tsx`

**Funcionalidades**:
- Vista protegida (requiere autenticación)
- Muestra información del usuario autenticado
- Opción para cerrar sesión

### 3. Servicios de Autenticación

**Ubicación**: `src/services/auth.ts`

**Endpoints y Funciones**:

1. **Login**
```typescript
login(email: string, password: string): Promise<AuthResponse>
```
- Método: POST
- URL: `http://localhost:5000/api/auth/login`
- Respuesta: `{ token: string, user: any }`

2. **Registro**
```typescript
register(email: string, password: string): Promise<AuthResponse>
```
- Método: POST
- URL: `http://localhost:5000/api/auth/register`
- Respuesta: `{ token: string, user: any }`

## Flujo de Autenticación

1. El usuario ingresa sus credenciales en el formulario de login
2. Los datos son validados localmente usando Zod
3. Se envía la petición al servidor de autenticación
4. Si las credenciales son correctas:
   - Se recibe el token de autenticación
   - Se almacena en localStorage
   - Se redirige al usuario al dashboard
5. Si hay un error:
   - Se muestra un mensaje de error al usuario
   - Se mantiene en la página de login

## Seguridad

- Validación de datos tanto en cliente como en servidor
- Almacenamiento seguro de tokens
- Protección de rutas privadas
- Manejo de sesiones mediante JWT
- Cierre de sesión con limpieza de datos

## Configuración del Proyecto

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
- Crear archivo `.env.local`
- Definir la URL del backend:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Iniciar el proyecto en desarrollo:
```bash
npm run dev
```

## Requisitos del Sistema

- Node.js 14.x o superior
- NPM 6.x o superior
- Servidor backend corriendo en `http://localhost:5000`

## Consideraciones de Desarrollo

- El proyecto utiliza el nuevo App Router de Next.js
- Implementa el patrón de "Client Components" con el uso de 'use client'
- Utiliza TypeScript para mayor seguridad y mejor DX
- Implementa un diseño responsive con Tailwind CSS
"# login" 
"# app-login" 
