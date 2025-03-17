'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

const AdminContent = () => (
  <div className="bg-purple-100 p-6 rounded-lg">
    <h2 className="text-2xl font-bold text-purple-800 mb-4">Panel de Administrador</h2>
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-purple-700">Gestión de Usuarios</h3>
        <p>Administra todos los usuarios del sistema</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-purple-700">Configuración del Sistema</h3>
        <p>Configura los parámetros globales</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-purple-700">Reportes Avanzados</h3>
        <p>Accede a estadísticas detalladas</p>
      </div>
    </div>
  </div>
)

const EditorContent = () => (
  <div className="bg-blue-100 p-6 rounded-lg">
    <h2 className="text-2xl font-bold text-blue-800 mb-4">Panel de Editor</h2>
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-blue-700">Gestión de Contenido</h3>
        <p>Crea y edita contenido del sitio</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-blue-700">Moderación de Comentarios</h3>
        <p>Modera los comentarios de usuarios</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-blue-700">Biblioteca Multimedia</h3>
        <p>Gestiona imágenes y videos</p>
      </div>
    </div>
  </div>
)

const UserContent = () => (
  <div className="bg-green-100 p-6 rounded-lg">
    <h2 className="text-2xl font-bold text-green-800 mb-4">Panel de Usuario</h2>
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-green-700">Mi Perfil</h3>
        <p>Actualiza tu información personal</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-green-700">Mis Actividades</h3>
        <p>Revisa tu historial de actividades</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-green-700">Preferencias</h3>
        <p>Configura tus preferencias</p>
      </div>
    </div>
  </div>
)

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth-user')
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                {user.email} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {user.role === 'admin' && <AdminContent />}
        {user.role === 'editor' && <EditorContent />}
        {user.role === 'user' && <UserContent />}
      </main>
    </div>
  )
}