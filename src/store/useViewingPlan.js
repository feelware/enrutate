import { create } from "zustand"

const useViewingPlan = create((set) => ({
  viewingPlan: null,
  setViewingPlan: (viewingPlan) => set({ viewingPlan }),
}))

export default useViewingPlan