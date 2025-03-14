import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// URL de tu API externa para verificar token
const VERIFY_TOKEN_URL = 'https://jsonplaceholder.typicode.com/posts/1' // Ejemplo mock

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('auth-token')
      
      if (!token) {
        router.push('/login')
        return
      }

      try {
        // Verificar token con API externa
        const response = await fetch(VERIFY_TOKEN_URL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) throw new Error('Token inválido')
        
        setLoading(false)
        
      } catch (error) {
        localStorage.removeItem('auth-token')
        router.push('/login')
      }
    }

    verifyToken()
  }, [])

  if (loading) return <div>Cargando...</div>

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Bienvenido al panel de control</p>
      <button onClick={() => {
        localStorage.removeItem('auth-token')
        router.push('/login')
      }}>Cerrar sesión</button>
    </div>
  )
}