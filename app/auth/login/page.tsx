'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Crown
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simular autenticación
    setTimeout(() => {
      setIsLoading(false)
      // Simular diferentes roles para demo
      const isTeacher = email.includes('profesor') || email.includes('teacher')
      
      if (isTeacher) {
        router.push('/dashboard/teacher')
      } else {
        router.push('/dashboard/student')
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-french/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center space-x-3 group mb-6">
            <div className="bg-primary rounded-lg p-3 group-hover:scale-105 transition-transform">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">Club Políglota</span>
          </Link>
          
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            <Crown className="h-3 w-3 mr-1" />
            Acceso Premium
          </Badge>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-muted-foreground">
            Accede a tu cuenta premium para continuar aprendiendo
          </p>
        </motion.div>

        {/* Formulario de login */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Iniciar Sesión</CardTitle>
              <CardDescription className="text-muted-foreground">
                Ingresa tus credenciales para acceder a la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Recordar sesión y recuperar contraseña */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-muted-foreground">Recordar sesión</span>
                  </label>
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                {/* Botón de submit */}
                <Button
                  type="submit"
                  className="w-full gradient-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Iniciando sesión...</span>
                    </div>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">¿No tienes cuenta?</span>
                </div>
              </div>

              {/* Link a registro */}
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-4">
                  Solicita acceso a nuestra plataforma premium
                </p>
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent" asChild>
                  <Link href="/auth/register">
                    Solicitar Acceso Premium
                  </Link>
                </Button>
              </div>

              {/* Demo info */}
              <div className="mt-6 p-3 bg-muted/20 rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  <strong>Demo:</strong> Usa "profesor@email.com" para dashboard de profesor o cualquier otro email para estudiante
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Volver al inicio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  )
}