import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Inicia sesión o regístrate para acceder a tus clases de idiomas en Club Políglota.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}