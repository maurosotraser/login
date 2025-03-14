import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  
  return (
    <div>
      <h1>Página principal</h1>
      <button onClick={() => router.push('/login')}>Ir al Login</button>
    </div>
  )
}