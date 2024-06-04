import { create } from "zustand"

const useProcessStore = create((set) => ({
  currentProcess: 'view',
  setCurrentProcess: (currentProcess) => set({ currentProcess }),

  currentViewPlan: {},
  setCurrentViewPlan: (currentViewPlan) => set({ currentViewPlan }),
}))

export default useProcessStore