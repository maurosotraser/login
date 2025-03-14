import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function AuthWrapper({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    
    const publicPaths = ['/login']
    const isPublicPath = publicPaths.includes(router.pathname)
    
    if (!token && !isPublicPath) {
      router.push('/login')
    }
    
    if (token && isPublicPath) {
      router.push('/dashboard')
    }
  }, [])

  return <Component {...pageProps} />
}

export default AuthWrapper