import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/router'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres')
})

type FormData = z.infer<typeof schema>

// URL de tu API externa (ejemplo: https://api.tudominio.com/auth/login)
const API_URL = 'https://jsonplaceholder.typicode.com/posts' // Ejemplo mock

export default function Login() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Incluir aquí headers adicionales si tu API los requiere
          // 'Authorization': 'Bearer tu-token' 
        },
        body: JSON.stringify({
          // Ajustar según estructura requerida por tu API
          email: data.email,
          password: data.password
        })
      })

      if (!response.ok) throw new Error('Error en la autenticación')

      const responseData = await response.json()
      
      // Suponiendo que la API retorna un objeto con token
      // Ajustar según la estructura de tu API real
      const token = responseData.token || 'fake-token-externo'
      
      localStorage.setItem('auth-token', token)
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Error:', error)
      alert('Error al iniciar sesión. Verifica tus credenciales')
    }
  }

  // El resto del componente igual que antes...
  // [Mantener el mismo JSX del ejemplo anterior]
}