'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Menu, 
  X, 
  User,
  LogIn,
  LogOut,
  Settings
} from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Temporal para demo

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-primary rounded-lg p-2 group-hover:scale-105 transition-transform">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Club Políglota</span>
          </Link>

          {/* Navegación desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/clases" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Clases
            </Link>
            <Link 
              href="/actividades" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Actividades
            </Link>
            <Link 
              href="/foro" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Foro
            </Link>
            <Link 
              href="/horarios" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Horarios
            </Link>
          </div>

          {/* Botones de acción */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
                  <User className="h-4 w-4 mr-2" />
                  Mi Perfil
                </Button>
                <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent">
                  <LogOut className="h-4 w-4 mr-2" />
                  Salir
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="text-foreground hover:bg-accent" asChild>
                  <Link href="/auth/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Iniciar Sesión
                  </Link>
                </Button>
                <Button size="sm" className="gradient-primary" asChild>
                  <Link href="/auth/register">
                    Solicitar Acceso
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Botón menú móvil */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-md rounded-lg mt-2 p-4 animate-slide-up border border-border">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/clases" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Clases
              </Link>
              <Link 
                href="/actividades" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Actividades
              </Link>
              <Link 
                href="/foro" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Foro
              </Link>
              <Link 
                href="/horarios" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Horarios
              </Link>
              <div className="border-t border-border pt-4 space-y-3">
                {isLoggedIn ? (
                  <>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-foreground">
                      <User className="h-4 w-4 mr-2" />
                      Mi Perfil
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-foreground">
                      <LogOut className="h-4 w-4 mr-2" />
                      Salir
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="sm" className="w-full justify-start text-foreground" asChild>
                      <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                        <LogIn className="h-4 w-4 mr-2" />
                        Iniciar Sesión
                      </Link>
                    </Button>
                    <Button size="sm" className="w-full gradient-primary" asChild>
                      <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                        Solicitar Acceso
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}