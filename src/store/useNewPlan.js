import { create } from "zustand"

export default create((set, get) => ({
  title: '',
  setTitle: (title) => set({ title }),

  description: '',
  setDescription: (description) => set({ description }),

  startDate: new Date(),
  setStartDate: (startDate) => set({ startDate }),

  clients: [],
  addClient: (client) => set((state) => {
    if (!state.clients.find(c => c.id === client.id)) {
      const clients = [ client, ...state.clients ]
      return { clients }
    }
  }),
  updateClient: (client) => set((state) => {
    const clients = state.clients.map(c => c.id === client.id ? client : c)
    return { clients }
  }),
  removeClient: (id) => set((state) => {
    const clients = state.clients.filter(c => c.id !== id)
    return { clients }
  }),

  toJSON: () => get((state) => Object.toString(state))
}))
