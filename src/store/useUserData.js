import { create } from "zustand"

const useUserData = create((set) => ({
  user: {},
  setUser: (user) => set({ user }),

  plans: [],
  setPlans: (plans) => set({ plans }),
}))

export default useUserData