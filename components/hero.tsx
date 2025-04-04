"use client"

import { BookOpen, Users, Globe2, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function Hero() {
  const handleWhatsAppClick = () => {
    const message = "¡Hola! Me interesa tomar clases con ustedes. ¿Podrían brindarme más información?";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6143977741?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary to-secondary min-h-screen pt-32 pb-16">
      <div className="absolute inset-0">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover opacity-10"
          priority
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Aprende Idiomas
            <span className="block text-highlight">Con Nosotros</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto">
            Clases personalizadas de francés e inglés con profesores nativos.
            Mejora tu nivel en un ambiente amigable y profesional.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect px-8 py-4 rounded-full text-white font-semibold flex items-center justify-center group"
            >
              Comienza Ahora
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent px-8 py-4 rounded-full text-white font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center"
            >
              Contactar por WhatsApp
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            {
              icon: Globe2,
              title: "Profesores Nativos",
              description: "Aprende con expertos que dominan el idioma y su cultura"
            },
            {
              icon: Users,
              title: "Grupos Reducidos",
              description: "Atención personalizada en grupos pequeños"
            },
            {
              icon: BookOpen,
              title: "Método Efectivo",
              description: "Aprendizaje estructurado con enfoque en la conversación"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-6 text-center"
            >
              <div className="inline-flex p-3 rounded-full bg-accent text-white mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2"
        >
          {[
            {
              title: "Francés",
              schedule: "Lunes, Miércoles y Viernes",
              time: "5:00 PM - 6:30 PM",
              image: "/france-bg.jpg"
            },
            {
              title: "Inglés",
              schedule: "Martes y Jueves",
              time: "5:00 PM - 6:30 PM",
              image: "/england-bg.jpg"
            }
          ].map((course, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="neumorphic relative overflow-hidden rounded-2xl p-8"
            >
              <div className="relative">
                <Image 
                  src={course.image} 
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
              
              <div className="text-primary">
                <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 mt-1 text-accent" />
                  <div>
                    <p className="font-medium">{course.schedule}</p>
                    <p className="text-gray-600">{course.time}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}