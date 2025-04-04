"use client"

import { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './logo';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/cursos', label: 'Cursos' },
    { path: '/horarios', label: 'Horarios' },
    { path: '/contacto', label: 'Contacto' },
  ];

  return (
    <nav className="fixed w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center">
              <Logo showText={false} />
            </Link>
          </motion.div>
          
          <div className="hidden md:block">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="ml-10 flex items-center space-x-4"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors duration-200 text-white"
                >
                  {item.label}
                </Link>
              ))}
              
              <Link
                href="/auth"
                className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-accent hover:bg-accent/90 transition-colors duration-200 text-white"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Link>
            </motion.div>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-effect border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <Link
                href="/auth"
                className="block px-3 py-2 rounded-md text-base font-medium bg-accent hover:bg-accent/90 transition-colors text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Iniciar Sesión
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}