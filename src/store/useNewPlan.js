import { create } from "zustand"

export default create((set) => ({
  title: '',
  setTitle: (title) => set({ title }),

  description: '',
  setDescription: (description) => set({ description }),

  startDate: new Date(),
  setStartDate: (startDate) => set({ startDate }),

  clients: [],
  setClients: (clients) => set({ clients }),

  vehicles: [],
  setVehicles: (vehicles) => set({ vehicles }),
}))
