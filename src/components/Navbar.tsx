import { useState } from 'react';
import { Menu, LogIn, X, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Logo } from './Logo';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const user = useAuthStore(state => state.user);
  const signOut = useAuthStore(state => state.signOut);

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/cursos', label: 'Cursos' },
    { path: '/horarios', label: 'Horarios' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 bg-[#2D235F]/95 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center">
              <Logo showText={false} />
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
                  
                  {user ? (
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center px-3 py-2 rounded-md bg-white/10">
                        <User className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="ml-2 text-xs px-2 py-1 bg-[#FF6B35] rounded-full capitalize">
                          {user.role}
                        </span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center px-4 py-2 rounded-md bg-[#FF6B35] hover:bg-opacity-90 transition-colors text-sm font-medium"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </button>
                    </div>
                  ) : (
                    <Link 
                      to="/login"
                      className="bg-[#FF6B35] px-6 py-2 rounded-full text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center group"
                    >
                      <LogIn className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      Iniciar Sesión
                    </Link>
                  )}
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
              {user && (
                <div className="px-3 py-2 rounded-md bg-white/10 mb-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <span className="mt-1 text-xs px-2 py-1 bg-[#FF6B35] rounded-full capitalize inline-block">
                    {user.role}
                  </span>
                </div>
              )}
              
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
              
              {user ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-[#FF6B35] hover:bg-opacity-90 transition-colors flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-[#FF6B35] hover:bg-opacity-90 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}