import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel de Estudiante',
  description: 'Accede a tus cursos, materiales y grabaciones de clases.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}