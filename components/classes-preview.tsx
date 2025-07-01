'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Play, 
  Clock, 
  Users, 
  Calendar,
  Crown,
  Star,
  Lock,
  BookOpen
} from 'lucide-react'
import { motion } from 'framer-motion'

const upcomingClasses = [
  {
    id: 1,
    title: 'Conversación Avanzada en Inglés',
    instructor: 'Prof. Especialista',
    time: '19:00 - 20:30',
    date: 'Martes 2 Julio',
    students: 6,
    maxStudents: 8,
    language: 'Inglés',
    level: 'Avanzado',
    color: 'english',
    isToday: true,
    rating: 4.9
  },
  {
    id: 2,
    title: 'Gramática Francesa Intermedia',
    instructor: 'Prof. Especialista',
    time: '19:00 - 20:30',
    date: 'Miércoles 3 Julio',
    students: 5,
    maxStudents: 8,
    language: 'Francés',
    level: 'Intermedio',
    color: 'french',
    isToday: false,
    rating: 4.8
  },
  {
    id: 3,
    title: 'Pronunciación y Fonética en Inglés',
    instructor: 'Prof. Especialista',
    time: '19:00 - 20:30',
    date: 'Jueves 4 Julio',
    students: 7,
    maxStudents: 8,
    language: 'Inglés',
    level: 'Intermedio',
    color: 'english',
    isToday: false,
    rating: 4.9
  }
]

const recordedClasses = [
  {
    id: 1,
    title: 'Fundamentos de Pronunciación Inglesa',
    duration: '45 min',
    views: 89,
    language: 'Inglés',
    level: 'Principiante',
    color: 'english',
    thumbnail: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'Vocabulario Francés: La Vida Cotidiana',
    duration: '35 min',
    views: 67,
    language: 'Francés',
    level: 'Principiante',
    color: 'french',
    thumbnail: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'Tiempos Verbales Complejos en Inglés',
    duration: '60 min',
    views: 124,
    language: 'Inglés',
    level: 'Avanzado',
    color: 'english',
    thumbnail: 'https://images.pexels.com/photos/5427648/pexels-photo-5427648.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
]

const getLanguageColor = (color: string) => {
  switch (color) {
    case 'english': return 'bg-english/20 text-english border-english/30'
    case 'french': return 'bg-french/20 text-french border-french/30'
    default: return 'bg-muted/20 text-muted-foreground border-border'
  }
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Principiante': return 'bg-success/20 text-success border-success/30'
    case 'Intermedio': return 'bg-warning/20 text-warning border-warning/30'
    case 'Avanzado': return 'bg-destructive/20 text-destructive border-destructive/30'
    default: return 'bg-muted/20 text-muted-foreground border-border'
  }
}

export default function ClassesPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clases próximas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Próximas Clases Premium
              </h2>
              <p className="text-muted-foreground">
                Únete a nuestras clases exclusivas con acceso controlado
              </p>
            </div>
            <Button variant="outline" className="border-border text-foreground hover:bg-accent">
              Ver Calendario Completo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-2">
                        <Badge className={getLanguageColor(classItem.color)}>
                          {classItem.language}
                        </Badge>
                        <Badge className={getLevelColor(classItem.level)}>
                          {classItem.level}
                        </Badge>
                      </div>
                      {classItem.isToday && (
                        <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse">
                          HOY
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-foreground text-lg group-hover:text-primary transition-colors">
                      {classItem.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {classItem.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {classItem.date}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {classItem.time}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        {classItem.students}/{classItem.maxStudents} estudiantes
                      </div>
                      <div className="flex items-center text-sm text-warning">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        {classItem.rating}
                      </div>
                    </div>

                    <Button 
                      className="w-full gradient-primary" 
                      disabled={classItem.students >= classItem.maxStudents}
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      {classItem.isToday ? 'Unirse Ahora' : 'Reservar Lugar'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Clases grabadas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Biblioteca Premium
              </h2>
              <p className="text-muted-foreground">
                Accede a nuestro contenido exclusivo grabado
              </p>
            </div>
            <Button variant="outline" className="border-border text-foreground hover:bg-accent">
              Ver Biblioteca Completa
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordedClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden h-full">
                  <div className="relative">
                    <img 
                      src={classItem.thumbnail} 
                      alt={classItem.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-center">
                        <Crown className="h-8 w-8 text-primary mx-auto mb-2" />
                        <span className="text-primary text-sm font-medium">Premium</span>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-black/60 text-white border-0">
                        {classItem.duration}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex gap-2 mb-2">
                      <Badge className={getLanguageColor(classItem.color)}>
                        {classItem.language}
                      </Badge>
                      <Badge className={getLevelColor(classItem.level)}>
                        {classItem.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-foreground text-lg group-hover:text-primary transition-colors">
                      {classItem.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{classItem.views} visualizaciones</span>
                    </div>
                    
                    <Button className="w-full gradient-primary">
                      <Play className="h-4 w-4 mr-2" />
                      Ver Clase Premium
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}