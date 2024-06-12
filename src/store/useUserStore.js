import { create } from "zustand"

const useUserStore = create((set) => ({
  user: {},
  setUser: (user) => set({ user }),

  plans: [],
  setPlans: (plans) => set({ plans }),

  depot: { vehicles: [], products: []  },
  setDepot: (depot) => set({ depot }),
}))

export default useUserStore