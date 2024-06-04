import { create } from "zustand"

const useUserData = create((set) => ({
  userData: {},
  setUserData: (userData) => set({ userData })
}))

export default useUserData