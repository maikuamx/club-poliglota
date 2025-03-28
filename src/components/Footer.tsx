import { Mail, Phone } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const handleWhatsAppClick = () => {
    const message = "¡Hola! Me interesa tomar clases con ustedes. ¿Podrían brindarme más información?";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6143977741?text=${encodedMessage}`, '_blank');
  };

  return (
    <footer className="bg-[#2D235F] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Logo className="mb-4 md:mb-0" showText={false} />
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a 
              href="mailto:clubpoliglotamx@gmail.com"
              className="flex items-center hover:text-[#F4D35E] transition-colors duration-200"
            >
              <Mail className="h-5 w-5 mr-2" />
              clubpoliglotamx@gmail.com
            </a>
            <button 
              onClick={handleWhatsAppClick}
              className="flex items-center hover:text-[#F4D35E] transition-colors duration-200"
            >
              <Phone className="h-5 w-5 mr-2" />
              WhatsApp
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Club Políglota. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}