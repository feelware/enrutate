import { create } from 'zustand'
import { getAuthUser, authWithPassword, clearAuth, autoRefresh } from '../services/authUser'

const useLogin = create((set) =>  ({
  loggedIn: getAuthUser() !== null,
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
  autoRefresh: () => autoRefresh({
    onUserDelete: () => set({ loggedIn: false })
  })
}))

export default useLogin