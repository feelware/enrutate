import { create } from "zustand"

const useGUI = create((set) => ({
  mobileNavOpened: false,
  setMobileNavOpened: (mobileNavOpened) => set({ mobileNavOpened }),

  desktopNavOpened: true,
  setDesktopNavOpened: (desktopNavOpened) => set({ desktopNavOpened }),

  holdNavOpenedValues: {
    mobile: false,
    desktop: true
  },

  holdNavOpened: () => set((state) => ({
    holdNavOpenedValues: {
      mobile: state.mobileNavOpened,
      desktop: state.desktopNavOpened
    }
  })),

  restoreNavOpened: () => set((state) => ({
    mobileNavOpened: state.holdNavOpenedValues.mobile,
    desktopNavOpened: state.holdNavOpenedValues.desktop
  })),

  isFetchingData: false,
  setFetchingData: (isFetchingData) => set({ isFetchingData }),

  isMapLoading: true,
  setMapLoading: (isMapLoading) => set({ isMapLoading }),
}))

export default useGUI