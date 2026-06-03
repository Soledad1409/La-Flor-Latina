import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingCart, LogOut, Settings } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCartStore()
  const { isAuthenticated, logout, role } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            <span className="font-bold text-xl text-gray-800">La Flor Latina</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition">
              Inicio
            </Link>
            <Link to="/catalogo" className="text-gray-600 hover:text-blue-600 transition">
              Catálogo
            </Link>
            <Link to="/contacto" className="text-gray-600 hover:text-blue-600 transition">
              Contacto
            </Link>
            {isAuthenticated && role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-blue-600 transition flex items-center gap-2">
                <Settings size={18} />
                Admin
              </Link>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Carrito */}
            <Link to="/carrito" className="relative">
              <ShoppingCart className="text-gray-600 hover:text-blue-600 transition" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
              >
                <LogOut size={20} />
              </button>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-blue-600 transition">
                Iniciar Sesión
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t pt-4">
            <Link to="/" className="block py-2 text-gray-600 hover:text-blue-600">
              Inicio
            </Link>
            <Link to="/catalogo" className="block py-2 text-gray-600 hover:text-blue-600">
              Catálogo
            </Link>
            <Link to="/contacto" className="block py-2 text-gray-600 hover:text-blue-600">
              Contacto
            </Link>
            {isAuthenticated && role === 'admin' && (
              <Link to="/admin" className="block py-2 text-gray-600 hover:text-blue-600">
                Panel Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
