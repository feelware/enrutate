import { create } from "zustand"

export default create((set, get) => ({
  title: '',
  setTitle: (title) => set({ title }),

  description: '',
  setDescription: (description) => set({ description }),

  startDate: new Date(),
  setStartDate: (startDate) => set({ startDate }),

  clients: new Map(),
  removeClient: (id) => set((state) => {
    const clients = new Map(state.clients)
    clients.delete(id)
    return { clients }
  }),
  updateClient: (client) => set((state) => {
    const clients = new Map(state.clients)
    clients.set(client.id, client)
    return { clients }
  }),

  vehicles: new Map(),
  setVehicles: (vehicles) => set({ vehicles }),
  removeVehicle: (id) => set((state) => {
    const vehicles = new Map(state.vehicles)
    vehicles.delete(id)
    return { vehicles }
  }),
  updateVehicle: (vehicle) => set((state) => {
    const vehicles = new Map(state.vehicles)
    vehicles.set(vehicle.id, vehicle)
    return { vehicles }
  }),

  toJSON: () => get((state) => Object.toString(state))
}))
