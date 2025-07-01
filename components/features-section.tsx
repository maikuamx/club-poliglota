'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Video, 
  Upload, 
  MessageSquare, 
  Crown,
  Clock,
  Users,
  Shield,
  Zap,
  Calendar,
  BookOpen
} from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Video,
    title: 'Clases en Vivo',
    description: 'Participa en clases exclusivas con profesores especializados en grupos reducidos.',
    badge: 'Premium',
    badgeVariant: 'default' as const,
    color: 'text-primary'
  },
  {
    icon: BookOpen,
    title: 'Contenido Exclusivo',
    description: 'Accede a material didáctico especializado y recursos premium para tu aprendizaje.',
    badge: 'Exclusivo',
    badgeVariant: 'secondary' as const,
    color: 'text-french'
  },
  {
    icon: Upload,
    title: 'Actividades Personalizadas',
    description: 'Sube tus tareas y recibe retroalimentación detallada de nuestros instructores.',
    badge: 'Interactivo',
    badgeVariant: 'outline' as const,
    color: 'text-success'
  },
  {
    icon: MessageSquare,
    title: 'Foro de Estudiantes',
    description: 'Conecta con otros estudiantes, practica el idioma y resuelve dudas.',
    badge: 'Comunidad',
    badgeVariant: 'outline' as const,
    color: 'text-warning'
  }
]

const benefits = [
  {
    icon: Clock,
    title: 'Horarios Estructurados',
    description: 'Inglés: Martes y Jueves. Francés: Lunes, Miércoles y Viernes.'
  },
  {
    icon: Users,
    title: 'Grupos Exclusivos',
    description: 'Máximo 8 estudiantes por clase para atención completamente personalizada.'
  },
  {
    icon: Shield,
    title: 'Acceso Controlado',
    description: 'Plataforma premium con acceso aprobado únicamente por el instructor.'
  },
  {
    icon: Zap,
    title: 'Metodología Avanzada',
    description: 'Técnicas de enseñanza especializadas para acelerar tu dominio del idioma.'
  }
]

const schedule = [
  { day: 'Lunes', language: 'Francés', color: 'french',  },
  { day: 'Martes', language: 'Inglés', color: 'english',  },
  { day: 'Miércoles', language: 'Francés', color: 'french',  },
  { day: 'Jueves', language: 'Inglés', color: 'english',  },
  { day: 'Viernes', language: 'Francés', color: 'french',  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experiencia educativa{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-french">
              completamente personalizada   
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Una plataforma exclusiva diseñada para estudiantes comprometidos con el dominio 
            de idiomas a través de metodologías avanzadas y atención personalizada.
          </p>
        </motion.div>

        {/* Características principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group hover:scale-105 h-full">
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 p-3 rounded-xl bg-muted/50 w-fit group-hover:scale-110 transition-transform ${feature.color}`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <div className="flex justify-center mb-2">
                    <Badge variant={feature.badgeVariant} className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-foreground text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Horarios de clases */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Horarios de Clases
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {schedule.map((item, index) => (
              <motion.div
                key={item.day}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">{item.day}</h4>
                      <div className={`w-4 h-4 rounded-full mx-auto bg-${item.color}`}></div>
                      <p className="text-sm font-medium text-foreground">{item.language}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Beneficios adicionales */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            ¿Por qué elegir Club Políglota?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10 w-fit group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-foreground font-semibold mb-2">{benefit.title}</h4>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}