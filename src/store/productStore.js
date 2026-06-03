import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async (category = null) => {
    set({ loading: true, error: null })
    try {
      let query = supabase.from('productos').select('*')
      
      if (category) {
        query = query.eq('categoria', category)
      }

      const { data, error } = await query

      if (error) throw error

      set({ products: data || [], loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  addProduct: async (product) => {
    try {
      const { data, error } = await supabase
        .from('productos')
        .insert([product])
        .select()

      if (error) throw error

      set((state) => ({
        products: [...state.products, ...data],
      }))

      return data[0]
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  updateProduct: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('productos')
        .update(updates)
        .eq('id', id)
        .select()

      if (error) throw error

      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, ...updates } : p
        ),
      }))

      return data[0]
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  deleteProduct: async (id) => {
    try {
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id)

      if (error) throw error

      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }))
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  searchProducts: async (searchTerm) => {
    try {
      const { data, error } = await supabase
        .from('productos')
        .select('*')
        .ilike('nombre', `%${searchTerm}%`)

      if (error) throw error

      set({ products: data || [] })
    } catch (error) {
      set({ error: error.message })
    }
  },
}))
