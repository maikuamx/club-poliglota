import { BookOpen, Users, Globe2, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {


  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#2D235F] to-[#E5E3F3] py-20 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
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
            <span className="block text-[#F4D35E]">Con Nosotros</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto">
            Clases personalizadas de francés e inglés con profesores nativos.
            Mejora tu nivel en un ambiente amigable y profesional.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect px-8 py-4 rounded-full text-[#2D235F] font-semibold flex items-center justify-center group"
            >
              Comienza Ahora
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="https://wa.me/+1234567890"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF6B35] px-8 py-4 rounded-full text-white font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center"
            >
              Contactar por WhatsApp
            </motion.a>
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
              <div className="inline-flex p-3 rounded-full bg-[#FF6B35] text-white mb-4">
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
              image: "https://images.unsplash.com/photo-1509041322357-8a3f9757a475?auto=format&fit=crop&q=80"
            },
            {
              title: "Inglés",
              schedule: "Martes y Jueves",
              time: "5:00 PM - 6:30 PM",
              image: "https://images.unsplash.com/photo-1526857240824-92be52bed6bd?auto=format&fit=crop&q=80"
            }
          ].map((course, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl card-shadow"
            >
              <div className="absolute inset-0">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D235F] to-transparent"></div>
              </div>
              
              <div className="relative p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                <div className="flex items-start mb-2">
                  <Clock className="h-5 w-5 mr-2 mt-1" />
                  <div>
                    <p className="font-medium">{course.schedule}</p>
                    <p className="text-gray-200">{course.time}</p>
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