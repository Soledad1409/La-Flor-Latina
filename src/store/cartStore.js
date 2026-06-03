import { create } from 'zustand'

export const useCartStore = create((set) => ({
  items: JSON.parse(localStorage.getItem('cart')) || [],

  addToCart: (product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)
      let newItems

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }]
      }

      localStorage.setItem('cart', JSON.stringify(newItems))
      return { items: newItems }
    })
  },

  removeFromCart: (productId) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(newItems))
      return { items: newItems }
    })
  },

  updateQuantity: (productId, quantity) => {
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
      localStorage.setItem('cart', JSON.stringify(newItems))
      return { items: newItems }
    })
  },

  clearCart: () => {
    localStorage.removeItem('cart')
    set({ items: [] })
  },

  getTotal: () => {
    const state = useCartStore.getState()
    return state.items.reduce((total, item) => total + item.precio * item.quantity, 0)
  },
}))
