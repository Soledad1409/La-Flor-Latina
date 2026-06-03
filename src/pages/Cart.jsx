import { Link } from 'react-router-dom'
import { Trash2, ArrowLeft, Check } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useState } from 'react'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const total = items.reduce((acc, item) => acc + item.precio * item.quantity, 0)

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('El carrito está vacío')
      return
    }
    setOrderPlaced(true)
    setTimeout(() => {
      clearCart()
      setOrderPlaced(false)
    }, 2000)
  }

  if (orderPlaced) {
    return (
      <div className="py-20 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container-custom text-center">
          <div className="bg-white p-12 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ¡Pedido Realizado!
            </h1>
            <p className="text-gray-600 mb-6">
              Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
            </p>
            <p className="text-sm text-gray-500">
              Recibirás un correo de confirmación en breve.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft size={20} />
          Volver al Catálogo
        </Link>

        <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>

        {items.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg mb-6">Tu carrito está vacío</p>
            <Link to="/catalogo" className="btn-primary">
              Explorar Productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-lg shadow-md flex gap-4"
                  >
                    <img
                      src={item.imagen || 'https://via.placeholder.com/100'}
                      alt={item.nombre}
                      className="w-24 h-24 object-cover rounded"
                    />

                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{item.nombre}</h3>
                      <p className="text-gray-600 text-sm">{item.descripcion}</p>
                      <p className="text-blue-600 font-semibold text-lg mt-2">
                        ${item.precio.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="w-12 text-center border rounded py-1"
                        min="1"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumen */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Resumen del Pedido</h3>

                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impuesto:</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-semibold text-lg">Total:</span>
                  <span className="font-semibold text-2xl text-blue-600">
                    ${(total * 1.1).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full btn-primary mb-3"
                >
                  Finalizar Compra
                </button>

                <button
                  onClick={() => clearCart()}
                  className="w-full btn-secondary"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
