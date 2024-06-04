import { create } from "zustand"

const useGUIStore = create((set) => ({
  mobileNavOpened: false,
  toggleMobileNav: () => set(state => ({ mobileNavOpened: !state.mobileNavOpened })),

  desktopNavOpened: true,
  toggleDesktopNav: () => set(state => ({ desktopNavOpened: !state.desktopNavOpened })),

  navPadding: 25,
}))

export default useGUIStore