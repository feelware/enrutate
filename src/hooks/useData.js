import { create } from "zustand"

const useData = create(() => ({
  fetchState: null,
}))

export default useData