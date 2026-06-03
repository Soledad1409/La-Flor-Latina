import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useProductStore } from '../store/productStore'
import ProductCard from '../components/ProductCard'

export default function Catalog() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || '')
  const { products, fetchProducts, searchProducts, loading } = useProductStore()

  const categories = ['Hombre', 'Mujer', 'Niños', 'Accesorios']

  useEffect(() => {
    if (search) {
      searchProducts(search)
    } else {
      fetchProducts(selectedCategory || null)
    }
  }, [search, selectedCategory])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category)
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <h1 className="text-4xl font-bold mb-8">Catálogo de Productos</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filtros */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-4">Filtros</h3>

              {/* Búsqueda */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar Producto
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Nombre del producto..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Categorías */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Categorías</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategory === category.toLowerCase()}
                        onChange={() => handleCategoryChange(category.toLowerCase())}
                        className="rounded text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Productos */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Cargando productos...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <p className="text-gray-600 text-lg">
                  No se encontraron productos
                </p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  Se encontraron {products.length} producto(s)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
