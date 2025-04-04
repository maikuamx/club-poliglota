import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panel de Profesor',
  description: 'Gestiona tus grupos, estudiantes y material didáctico.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}