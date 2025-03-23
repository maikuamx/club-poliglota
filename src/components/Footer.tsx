import { Mail, Phone, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2D235F] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Globe className="h-8 w-8 text-[#F4D35E]" />
            <span className="ml-2 text-xl font-bold">Club Políglota</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a 
              href="mailto:clubpoliglotamx@gmail.com"
              className="flex items-center hover:text-[#F4D35E] transition-colors duration-200"
            >
              <Mail className="h-5 w-5 mr-2" />
              clubpoliglotamx@gmail.com
            </a>
            <a 
              href="https://wa.me/+1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-[#F4D35E] transition-colors duration-200"
            >
              <Phone className="h-5 w-5 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Club Políglota. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}