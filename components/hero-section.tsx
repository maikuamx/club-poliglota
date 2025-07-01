'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Users, 
  BookOpen, 
  MessageCircle,
  Star,
  Globe,
  Calendar,
  Clock,
  LogIn
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-french/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-english/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge de bienvenida */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge variant="outline" className="text-primary border-primary/50 px-6 py-2 text-sm">
              <Globe className="h-4 w-4 mr-2" />
              Plataforma educativa premium para Chihuahua, México
            </Badge>
          </motion.div>

          {/* Título principal */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Domina idiomas con{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-french">
              Club Políglota
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Clases de inglés y francés con profesores especializados. 
            Acceso exclusivo a contenido de alta calidad, actividades personalizadas y comunidad de aprendizaje.
          </motion.p>

          {/* Horarios destacados */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-border">
              <div className="w-3 h-3 bg-english rounded-full"></div>
              <div className="text-left">
                <p className="text-foreground font-semibold">Inglés</p>
                <p className="text-muted-foreground text-sm">Martes y Jueves</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-border">
              <div className="w-3 h-3 bg-french rounded-full"></div>
              <div className="text-left">
                <p className="text-foreground font-semibold">Francés</p>
                <p className="text-muted-foreground text-sm">Lunes, Miércoles y Viernes</p>
              </div>
            </div>
          </motion.div>

          {/* Estadísticas */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="flex items-center space-x-2 text-foreground">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold">150+</span>
              <span className="text-muted-foreground">Estudiantes Activos</span>
            </div>
            <div className="flex items-center space-x-2 text-foreground">
              <BookOpen className="h-5 w-5 text-success" />
              <span className="font-semibold">200+</span>
              <span className="text-muted-foreground">Clases Impartidas</span>
            </div>
            <div className="flex items-center space-x-2 text-foreground">
              <Star className="h-5 w-5 text-warning" />
              <span className="font-semibold">4.9</span>
              <span className="text-muted-foreground">Calificación Promedio</span>
            </div>
          </motion.div>

          {/* Botones de acción */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Button size="lg" className="text-lg px-8 py-6 group gradient-primary" asChild>
              <Link href="/auth/login">
                <LogIn className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Acceder a la Plataforma
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-border text-foreground hover:bg-accent" asChild>
              <Link href="/auth/register">
                <MessageCircle className="h-5 w-5 mr-2" />
                Solicitar Información
              </Link>
            </Button>
          </motion.div>

          {/* Nota de acceso */}
          <motion.div 
            className="mt-8 p-4 bg-card/30 backdrop-blur-sm rounded-xl border border-border max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <p className="text-muted-foreground text-sm">
              <strong className="text-foreground">Acceso Premium:</strong> Todas las clases requieren registro y aprobación del instructor. 
              Contáctanos para obtener acceso a nuestra plataforma educativa.
            </p>
          </motion.div>

          {/* Indicador de scroll */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >

          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}