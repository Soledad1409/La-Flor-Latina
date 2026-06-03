import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore()

  const handleAddToCart = () => {
    addToCart(product)
    alert('¡Producto agregado al carrito!')
  }

  return (
    <div className="card overflow-hidden">
      {/* Imagen */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={product.imagen || 'https://via.placeholder.com/300x300?text=Producto'}
          alt={product.nombre}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Agotado</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.nombre}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.descripcion}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${product.precio.toFixed(2)}
          </span>
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? 'En stock' : 'Agotado'}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full btn-primary flex items-center justify-center gap-2 ${
            product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <ShoppingCart size={18} />
          Agregar al Carrito
        </button>
      </div>
    </div>
  )
}
