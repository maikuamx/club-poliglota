"use client"

import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from './logo';

export function Footer() {
  const handleWhatsAppClick = () => {
    const message = "¡Hola! Me interesa tomar clases con ustedes. ¿Podrían brindarme más información?";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6143977741?text=${encodedMessage}`, '_blank');
  };

  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <Logo className="mb-4 md:mb-0" showText={false} />
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <motion.a 
              href="mailto:clubpoliglotamx@gmail.com"
              className="flex items-center hover:text-highlight transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="h-5 w-5 mr-2" />
              clubpoliglotamx@gmail.com
            </motion.a>
            <motion.button 
              onClick={handleWhatsAppClick}
              className="flex items-center hover:text-highlight transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="h-5 w-5 mr-2" />
              WhatsApp
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center text-sm text-gray-400"
        >
          <p>© {new Date().getFullYear()} Club Políglota. Todos los derechos reservados.</p>
          <p className="mt-2">
            Sitio web desarrollado por{' '}
            <a 
              href="https://maikua.com.mx/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-highlight transition-colors duration-200"
            >
              Maikua
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}