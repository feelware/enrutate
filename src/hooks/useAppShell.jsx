import useGUI from '../store/useGUI'
import { useRoute } from 'wouter'

const useLayout = () => {
  const { 
    mobileNavOpened,
    desktopNavOpened,
    isFetchingData,
    isMapLoading
  } = useGUI()

  const [planMatch] = useRoute('/plan/:id')
  const [newMatch] = useRoute('/new')

  const isAppLoading = isFetchingData || isMapLoading

  const navbarCollapsed = {
    mobile: isAppLoading || !mobileNavOpened || !planMatch,
    desktop: isAppLoading || !desktopNavOpened || !planMatch
  }

  const asideCollapsed = {
    desktop: isAppLoading || !newMatch,
    mobile: isAppLoading || !newMatch 
  }

  return { navbarCollapsed, asideCollapsed, isAppLoading }
}

export default useLayout