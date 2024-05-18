import { create } from "zustand"

const useData = create(() => ({
  mainArticle: '',
  fetch: 'idle',
}))

export default useData