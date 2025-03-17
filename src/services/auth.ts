// Tipos de respuesta de la API
export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// URL base para las peticiones de autenticación
const API_URL = 'http://localhost:3000/auth';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const register = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log('Respuesta del registro:', data);

    if (!response.ok) {
      console.error('Error de registro:', {
        status: response.status,
        data
      });
      throw new Error(data.message || 'Error en el registro');
    }

    return data;
  } catch (error) {
    console.error('Error completo de registro:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('No se pudo conectar al servidor. Por favor, verifica que el servidor esté corriendo.');
    }
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    console.log('Intentando login con:', { email, password: '****' });
    console.log('URL de la petición:', `${API_URL}/login`);
    
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: defaultHeaders,
      credentials: 'include', // Incluir cookies en la petición
      body: JSON.stringify({ email, password }),
    });

    console.log('Respuesta recibida:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    // Intentar obtener el cuerpo de la respuesta incluso si no es OK
    const data = await response.json().catch(e => {
      console.error('Error al parsear respuesta:', e);
      return null;
    });

    console.log('Datos de respuesta:', data);

    if (!response.ok) {
      // Manejar diferentes códigos de error
      switch (response.status) {
        case 401:
          throw new Error('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
        case 404:
          throw new Error('El servidor de autenticación no está disponible.');
        case 429:
          throw new Error('Demasiados intentos. Por favor, espere unos minutos.');
        case 500:
          throw new Error('Error interno del servidor. Por favor, intente más tarde.');
        default:
          throw new Error(data?.message || `Error ${response.status}: ${response.statusText}`);
      }
    }

    // Validar la estructura de la respuesta
    if (!data || !data.token || !data.user) {
      console.error('Respuesta inválida del servidor:', data);
      throw new Error('Respuesta inválida del servidor');
    }

    // Validar que el usuario tenga un rol válido
    if (!data.user.role || !['admin', 'editor', 'user'].includes(data.user.role)) {
      console.error('Rol de usuario inválido:', data.user.role);
      throw new Error('Rol de usuario inválido');
    }

    return data as AuthResponse;
  } catch (error) {
    console.error('Error completo de login:', error);
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('No se pudo conectar al servidor. Por favor, verifica que el servidor esté corriendo en http://localhost:3000');
    }

    // Re-lanzar el error si ya es un Error personalizado
    if (error instanceof Error) {
      throw error;
    }

    // Error desconocido
    throw new Error('Error inesperado durante el login');
  }
}; 