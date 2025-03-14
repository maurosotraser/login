'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (!token) router.push('/login')
  }, [])

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de navegación */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold text-gray-800">Mi Dashboard</div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Bienvenido al Dashboard
            </h2>
            <p className="text-gray-600">
              Aquí puedes ver y gestionar toda la información importante.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}