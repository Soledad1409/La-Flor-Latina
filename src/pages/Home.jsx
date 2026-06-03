import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProductStore } from '../store/productStore'
import { useEffect } from 'react'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { products, fetchProducts, loading } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                La Flor Latina
              </h1>
              <p className="text-xl text-gray-300 mb-2">
                Indumentaria Moderna
              </p>
              <p className="text-lg text-gray-400 mb-8">
                Descubre nuestras colecciones exclusivas para hombre, mujer, niños y accesorios.
              </p>
              <Link
                to="/catalogo"
                className="btn-primary inline-flex items-center gap-2"
              >
                Ver Productos
                <ArrowRight size={20} />
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16ebc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                alt="Moda"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestras Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Hombre', 'Mujer', 'Niños', 'Accesorios'].map((cat) => (
              <Link
                key={cat}
                to={`/catalogo?categoria=${cat.toLowerCase()}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👔</span>
                </div>
                <h3 className="font-semibold text-lg">{cat}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Productos Destacados</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <p>Cargando productos...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No hay productos disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/catalogo" className="btn-primary">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
