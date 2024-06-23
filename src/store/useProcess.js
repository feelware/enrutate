import { create } from "zustand"

const useProcess = create((set) => ({
  isViewing: true,
  setIsViewing: (isViewing) => set(({ isViewing })),

  isFormValid: false,
  setFormValid: (isFormValid) => set(({ isFormValid })),
}))

export default useProcess