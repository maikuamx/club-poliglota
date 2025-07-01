'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  Play, 
  Upload, 
  MessageSquare,
  Star,
  Crown,
  Bell,
  Settings,
  LogOut,
  User,
  Video,
  FileText,
  Award,
  Plus,
  Edit,
  Eye,
  UserCheck,
  BarChart3
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const upcomingClasses = [
    {
      id: 1,
      title: 'Conversación Avanzada en Inglés',
      time: '19:00 - 20:30',
      date: 'Hoy',
      language: 'Inglés',
      color: 'english',
      enrolled: 6,
      maxStudents: 8,
      isToday: true
    },
    {
      id: 2,
      title: 'Gramática Francesa Intermedia',
      time: '19:00 - 20:30',
      date: 'Mañana',
      language: 'Francés',
      color: 'french',
      enrolled: 5,
      maxStudents: 8,
      isToday: false
    }
  ]

  const pendingActivities = [
    {
      id: 1,
      title: 'Ensayo sobre cultura francesa',
      submissions: 12,
      totalStudents: 15,
      dueDate: '2024-07-05',
      language: 'Francés'
    },
    {
      id: 2,
      title: 'Presentación oral en inglés',
      submissions: 8,
      totalStudents: 10,
      dueDate: '2024-07-03',
      language: 'Inglés'
    }
  ]

  const recentStudents = [
    { id: 1, name: 'María González', status: 'pending', email: 'maria@email.com' },
    { id: 2, name: 'Carlos Ruiz', status: 'approved', email: 'carlos@email.com' },
    { id: 3, name: 'Ana López', status: 'pending', email: 'ana@email.com' }
  ]

  const stats = [
    { label: 'Estudiantes Activos', value: '45', icon: Users, color: 'text-primary' },
    { label: 'Clases Este Mes', value: '24', icon: Video, color: 'text-success' },
    { label: 'Actividades Pendientes', value: '8', icon: FileText, color: 'text-warning' },
    { label: 'Calificación Promedio', value: '4.9', icon: Star, color: 'text-french' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="bg-primary rounded-lg p-2">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">Club Políglota</span>
              </Link>
              <Badge className="bg-french/20 text-french border-french/30">
                <Crown className="h-3 w-3 mr-1" />
                Panel de Profesor
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">
                  <LogOut className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Panel de Profesor
          </h1>
          <p className="text-muted-foreground">
            Gestiona tus clases, estudiantes y actividades desde aquí
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted/20 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Resumen', icon: BarChart3 },
            { id: 'classes', label: 'Clases', icon: Video },
            { id: 'students', label: 'Estudiantes', icon: Users },
            { id: 'activities', label: 'Actividades', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stats.map((stat, index) => (
                <Card key={stat.label} className="bg-card/50 backdrop-blur-sm border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Próximas Clases */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Próximas Clases</h2>
                  <Button size="sm" className="gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Clase
                  </Button>
                </div>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <Card key={classItem.id} className="bg-card/50 backdrop-blur-sm border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={`bg-${classItem.color}/20 text-${classItem.color} border-${classItem.color}/30`}>
                                {classItem.language}
                              </Badge>
                              {classItem.isToday && (
                                <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse">
                                  HOY
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                              {classItem.title}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <Calendar className="h-4 w-4 mr-1" />
                              {classItem.date}
                              <Clock className="h-4 w-4 ml-4 mr-1" />
                              {classItem.time}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="h-4 w-4 mr-1" />
                              {classItem.enrolled}/{classItem.maxStudents} estudiantes
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" className="gradient-primary">
                              <Video className="h-4 w-4 mr-2" />
                              {classItem.isToday ? 'Iniciar' : 'Ver'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Actividades Pendientes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Actividades por Revisar</h2>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Actividad
                  </Button>
                </div>
                <div className="space-y-4">
                  {pendingActivities.map((activity) => (
                    <Card key={activity.id} className="bg-card/50 backdrop-blur-sm border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                              {activity.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {activity.language} • Vence: {activity.dueDate}
                            </p>
                            <div className="flex items-center text-sm">
                              <span className="text-primary font-medium">
                                {activity.submissions}
                              </span>
                              <span className="text-muted-foreground">
                                /{activity.totalStudents} entregas
                              </span>
                            </div>
                          </div>
                          <Button size="sm" className="gradient-primary">
                            <Eye className="h-4 w-4 mr-2" />
                            Revisar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Gestión de Estudiantes</h2>
              <Button className="gradient-primary">
                <UserCheck className="h-4 w-4 mr-2" />
                Invitar Estudiante
              </Button>
            </div>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Solicitudes Pendientes</CardTitle>
                <CardDescription>
                  Estudiantes esperando aprobación para acceder a la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {student.status === 'pending' ? (
                          <>
                            <Button variant="outline" size="sm">
                              Rechazar
                            </Button>
                            <Button size="sm" className="gradient-primary">
                              Aprobar
                            </Button>
                          </>
                        ) : (
                          <Badge variant="success">Aprobado</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'classes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Gestión de Clases</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Grabación
                </Button>
                <Button className="gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Programar Clase
                </Button>
              </div>
            </div>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-8 text-center">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Gestión de Clases
                </h3>
                <p className="text-muted-foreground">
                  Aquí podrás programar nuevas clases, gestionar las existentes y subir grabaciones.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'activities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Gestión de Actividades</h2>
              <Button className="gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Actividad
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingActivities.map((activity) => (
                <Card key={activity.id} className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-foreground">{activity.title}</CardTitle>
                        <CardDescription>
                          {activity.language} • Vence: {activity.dueDate}
                        </CardDescription>
                      </div>
                      <Badge variant="warning">
                        {activity.submissions} entregas
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progreso de entregas</span>
                        <span className="text-foreground">
                          {activity.submissions}/{activity.totalStudents}
                        </span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(activity.submissions / activity.totalStudents) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button className="flex-1 gradient-primary">
                          <Eye className="h-4 w-4 mr-2" />
                          Revisar Entregas
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}