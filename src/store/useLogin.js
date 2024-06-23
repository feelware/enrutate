import { create } from 'zustand'
import storedUser, { authWithPassword, clearAuth, autoRefresh } from '../services/authUser'

const useLogin = create((set) => ({
  loggedIn: storedUser !== null,
  login: async ({ username, password }) => {
    const { loggedInUser, error } = await authWithPassword(username, password)
    if (error) {
      return { error }
    }
    set({ loggedIn: true })
    return { loggedInUser }
  },
  logout: () => {
    clearAuth()
    set({ loggedIn: false })
  },
  autoRefresh: () => autoRefresh(() => set({ loggedIn: false }))
}))

export default useLogin