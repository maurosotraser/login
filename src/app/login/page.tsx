'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { login } from '@/services/auth'
import { useAuth } from '@/contexts/AuthContext'

// Esquema de validación actualizado según la documentación de la API
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Por favor, ingrese un email válido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'La contraseña debe contener al menos un carácter especial')
})

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordHelp, setShowPasswordHelp] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // Verificar si ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (token) router.push('/dashboard')
  }, [router])

  // Manejar el envío del formulario
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true)
      const { token, user } = await login(data.email, data.password)
      localStorage.setItem('auth-token', token)
      localStorage.setItem('auth-user', JSON.stringify(user))
      setUser(user)
      router.push('/dashboard')
    } catch (error: any) {
      console.error('Error:', error)
      setError('root', { 
        message: error.message || 'Error al iniciar sesión. Por favor, intente nuevamente.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Por favor ingrese sus credenciales
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="usuario@ejemplo.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
                <button
                  type="button"
                  onClick={() => setShowPasswordHelp(!showPasswordHelp)}
                  className="ml-2 text-xs text-indigo-600 hover:text-indigo-500"
                >
                  {showPasswordHelp ? 'Ocultar requisitos' : 'Ver requisitos'}
                </button>
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="••••••••"
              />
              {showPasswordHelp && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
                  <p className="font-medium mb-1">La contraseña debe tener:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Al menos 8 caracteres</li>
                    <li>Al menos una letra mayúscula</li>
                    <li>Al menos una letra minúscula</li>
                    <li>Al menos un número</li>
                    <li>Al menos un carácter especial (!@#$%^&*)</li>
                  </ul>
                  <p className="mt-2 text-xs">Ejemplo: "ContraseñaSegura123!"</p>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          {errors.root && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <p className="text-sm">{errors.root.message}</p>
            </div>
          )}

          {/* Botón de submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </>
            ) : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Enlace opcional para registro */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}