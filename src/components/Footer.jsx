import { Mail, Instagram, MessageCircle, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Empresa */}
          <div>
            <h3 className="font-bold text-lg mb-4">La Flor Latina</h3>
            <p className="text-gray-400 text-sm">
              Tienda de indumentaria moderna con las mejores colecciones para toda la familia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="hover:text-blue-400 transition">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-blue-400 transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:m.juli@live.com.ar" className="hover:text-blue-400">
                  m.juli@live.com.ar
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+541234567890" className="hover:text-blue-400">
                  +54 (123) 456-7890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/541234567890"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="mailto:m.juli@live.com.ar"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2024 La Flor Latina. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
