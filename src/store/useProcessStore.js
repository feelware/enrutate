import { create } from "zustand"

const useProcessStore = create((set) => ({
  isViewing: true,
  setIsViewing: (isViewing) => set(({ isViewing })),

  currentPlan: null,
  setCurrentPlan: (currentPlan) => set({ currentPlan }),

  newPlan: { waypoints: [] },
  setNewPlan: (newPlan) => set({ newPlan }),
}))

export default useProcessStore