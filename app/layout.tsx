import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Club Políglota - Aprende idiomas en línea',
  description: 'Plataforma educativa para estudiantes en Chihuahua, México. Clases en vivo, contenido pregrabado y foros de discusión.',
  keywords: 'idiomas, educación, clases en línea, Chihuahua, México, inglés, francés, alemán',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-[#0A0A0A] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  )
}