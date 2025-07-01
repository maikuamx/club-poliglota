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
  Crown,
  User,
  Phone,
  CheckCircle
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simular envío de solicitud
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      
      // Después de 3 segundos, redirigir al login
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
    }, 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-md text-center"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  ¡Solicitud Enviada!
                </h2>
                <p className="text-muted-foreground">
                  Tu solicitud de acceso premium ha sido enviada correctamente. 
                  Te contactaremos pronto para confirmar tu registro.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-muted/20 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Próximos pasos:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Revisaremos tu solicitud en 24-48 horas</li>
                    <li>• Te enviaremos un correo de confirmación</li>
                    <li>• Recibirás tus credenciales de acceso</li>
                  </ul>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Serás redirigido al login en unos segundos...
                </p>
                
                <Button className="w-full gradient-primary" asChild>
                  <Link href="/auth/login">
                    Ir al Login Ahora
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
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
            Solicitud Premium
          </Badge>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Únete a Club Políglota
          </h1>
          <p className="text-muted-foreground">
            Solicita acceso a nuestra plataforma educativa premium
          </p>
        </motion.div>

        {/* Formulario de registro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Solicitar Acceso</CardTitle>
              <CardDescription className="text-muted-foreground">
                Completa el formulario para solicitar acceso premium
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre completo */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="+52 614 123 4567"
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
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
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

                {/* Confirmar Password */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-12 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Términos y condiciones */}
                <div className="flex items-start space-x-2">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-primary focus:ring-2 mt-1"
                    required
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-muted-foreground">
                    Acepto los{' '}
                    <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                      términos y condiciones
                    </Link>
                    {' '}y la{' '}
                    <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                      política de privacidad
                    </Link>
                  </label>
                </div>

                {/* Botón de submit */}
                <Button
                  type="submit"
                  className="w-full gradient-primary"
                  disabled={isLoading || !formData.acceptTerms}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Enviando solicitud...</span>
                    </div>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">¿Ya tienes cuenta?</span>
                </div>
              </div>

              {/* Link a login */}
              <div className="text-center">
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent" asChild>
                  <Link href="/auth/login">
                    Iniciar Sesión
                  </Link>
                </Button>
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