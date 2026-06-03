import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  role: null,

  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      set({
        user: data.user,
        isAuthenticated: true,
        role: email === 'm.juli@live.com.ar' ? 'admin' : 'cliente',
      })
      
      return data
    } catch (error) {
      console.error('Error de login:', error)
      throw error
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut()
      set({
        user: null,
        isAuthenticated: false,
        role: null,
      })
    } catch (error) {
      console.error('Error de logout:', error)
    }
  },

  checkAuth: async () => {
    try {
      const { data } = await supabase.auth.getSession()
      if (data?.session?.user) {
        set({
          user: data.session.user,
          isAuthenticated: true,
          role: data.session.user.email === 'm.juli@live.com.ar' ? 'admin' : 'cliente',
          loading: false,
        })
      } else {
        set({ loading: false })
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      set({ loading: false })
    }
  },
}))
