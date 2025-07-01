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
  Award
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const upcomingClasses = [
    {
      id: 1,
      title: 'Conversación Avanzada en Inglés',
      instructor: 'Prof. García',
      time: '19:00 - 20:30',
      date: 'Hoy',
      language: 'Inglés',
      color: 'english',
      isToday: true,
      meetingUrl: '#'
    },
    {
      id: 2,
      title: 'Gramática Francesa Intermedia',
      instructor: 'Prof. Martínez',
      time: '19:00 - 20:30',
      date: 'Mañana',
      language: 'Francés',
      color: 'french',
      isToday: false,
      meetingUrl: '#'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      title: 'Ensayo sobre cultura francesa',
      dueDate: '2024-07-05',
      status: 'pending',
      language: 'Francés'
    },
    {
      id: 2,
      title: 'Presentación oral en inglés',
      dueDate: '2024-07-03',
      status: 'submitted',
      language: 'Inglés',
      grade: 9.5
    }
  ]

  const recordedClasses = [
    {
      id: 1,
      title: 'Fundamentos de Pronunciación Inglesa',
      duration: '45 min',
      views: 89,
      language: 'Inglés',
      thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Vocabulario Francés: La Vida Cotidiana',
      duration: '35 min',
      views: 67,
      language: 'Francés',
      thumbnail: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
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
              <Badge className="bg-primary/20 text-primary border-primary/30">
                <Crown className="h-3 w-3 mr-1" />
                Estudiante Premium
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
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-muted-foreground">
            Continúa tu aprendizaje con nuestras clases premium de idiomas
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted/20 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Resumen', icon: User },
            { id: 'classes', label: 'Clases', icon: Video },
            { id: 'activities', label: 'Actividades', icon: FileText },
            { id: 'forum', label: 'Foro', icon: MessageSquare }
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Próximas Clases */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">Próximas Clases</h2>
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
                            <p className="text-muted-foreground text-sm mb-2">
                              {classItem.instructor}
                            </p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4 mr-1" />
                              {classItem.date}
                              <Clock className="h-4 w-4 ml-4 mr-1" />
                              {classItem.time}
                            </div>
                          </div>
                          <Button className="gradient-primary">
                            <Video className="h-4 w-4 mr-2" />
                            {classItem.isToday ? 'Unirse' : 'Programada'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actividades Recientes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Actividades Recientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="border-l-2 border-primary/30 pl-4">
                        <h4 className="font-medium text-foreground text-sm">
                          {activity.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {activity.language} • Vence: {activity.dueDate}
                        </p>
                        <div className="mt-2">
                          {activity.status === 'submitted' ? (
                            <div className="flex items-center space-x-2">
                              <Badge variant="success" className="text-xs">Entregada</Badge>
                              {activity.grade && (
                                <span className="text-xs text-success font-medium">
                                  Calificación: {activity.grade}
                                </span>
                              )}
                            </div>
                          ) : (
                            <Badge variant="warning" className="text-xs">Pendiente</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Progreso */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Tu Progreso
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground">Inglés</span>
                        <span className="text-muted-foreground">75%</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div className="bg-english h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground">Francés</span>
                        <span className="text-muted-foreground">60%</span>
                      </div>
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div className="bg-french h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-foreground">Biblioteca de Clases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recordedClasses.map((classItem) => (
                <Card key={classItem.id} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                  <div className="relative">
                    <img 
                      src={classItem.thumbnail} 
                      alt={classItem.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-black/60 text-white border-0">
                        {classItem.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-foreground text-lg group-hover:text-primary transition-colors">
                      {classItem.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{classItem.views} visualizaciones</span>
                      <Badge variant="outline">{classItem.language}</Badge>
                    </div>
                    
                    <Button className="w-full gradient-primary">
                      <Play className="h-4 w-4 mr-2" />
                      Ver Clase
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'activities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-foreground">Actividades Semanales</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentActivities.map((activity) => (
                <Card key={activity.id} className="bg-card/50 backdrop-blur-sm border-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-foreground">{activity.title}</CardTitle>
                        <CardDescription>
                          {activity.language} • Vence: {activity.dueDate}
                        </CardDescription>
                      </div>
                      {activity.status === 'submitted' ? (
                        <Badge variant="success">Entregada</Badge>
                      ) : (
                        <Badge variant="warning">Pendiente</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {activity.status === 'submitted' ? (
                      <div className="space-y-2">
                        {activity.grade && (
                          <p className="text-success font-medium">
                            Calificación: {activity.grade}/10
                          </p>
                        )}
                        <Button variant="outline" className="w-full">
                          Ver Retroalimentación
                        </Button>
                      </div>
                    ) : (
                      <Button className="w-full gradient-primary">
                        <Upload className="h-4 w-4 mr-2" />
                        Subir Actividad
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'forum' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Foro de Estudiantes</h2>
              <Button className="gradient-primary">
                <MessageSquare className="h-4 w-4 mr-2" />
                Nuevo Tema
              </Button>
            </div>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Foro en Desarrollo
                </h3>
                <p className="text-muted-foreground">
                  El foro de estudiantes estará disponible próximamente. 
                  Podrás conectar con otros estudiantes y practicar idiomas.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}