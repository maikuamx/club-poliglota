import { useState } from 'react';
import { Menu, Globe, LogIn, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/cursos', label: 'Cursos' },
    { path: '/horarios', label: 'Horarios' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#2D235F]/95 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center group">
              <Globe className="h-8 w-8 text-[#F4D35E] group-hover:rotate-12 transition-transform duration-300" />
              <span className="ml-2 text-xl font-bold">Club Políglota</span>
            </Link>
          </motion.div>
          
          {!isLoginPage && (
            <>
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
                      to={item.path}
                      className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link 
                    to="/login"
                    className="bg-[#FF6B35] px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center group"
                  >
                    <LogIn className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                    Iniciar Sesión
                  </Link>
                </motion.div>
              </div>
              
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-md hover:bg-white/10 transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#2D235F] border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-[#FF6B35] hover:bg-opacity-90 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}