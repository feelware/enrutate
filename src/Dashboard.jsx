import { 
  AppShell,
  LoadingOverlay
} from '@mantine/core'

import useGUI from './store/useGUI'
import useProcess from './store/useProcess'
import useViewingPlan from './store/useViewingPlan'
import useUserStore from './store/useUserStore'

import Navbar from './layout/Navbar'
import MapView from './layout/MapView'
import Aside from './layout/Aside'

import Settings from './layout/floating/Settings'
import NavToggle from './layout/floating/NavToggle'
import CreatePlanButton from './layout/floating/CreatePlanButton'

import AppLoader from './components/AppLoader'

import classes from './Dashboard.module.css'

import { useEffect } from 'react'
import users from './services/users'

const App = () => {
  const { 
    mobileNavOpened,
    desktopNavOpened,
    toggleDesktopNav,
    isFetchingData,
    isMapLoading
  } = useGUI()

  const {
    isViewing
  } = useProcess()

  const { setViewingPlan } = useViewingPlan()

  const {
    setUser,
    setPlans,
    setDepot
  } = useUserStore()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      users.setCurrentUser(user)
      setUser(user)
    }
    else {
      const saveUser = async () => {
        const mockUser = await users.getUser('0')
        localStorage.setItem('user', JSON.stringify(mockUser))
        users.setCurrentUser(mockUser)
        setUser(mockUser)
      }
      saveUser()
    }
    const fetchUserData = async () => {
      const plans = await users.getPlans()
      setPlans(plans)
      const latestPlan = plans[plans.length - 1]
      const latestPlanRoutes = await users.getRoutesOf(latestPlan.id)
      setViewingPlan({
        ...latestPlan,
        routes: latestPlanRoutes
      })
      const depot = await users.getDepot()
      setDepot(depot)
    }
    fetchUserData()
  }, [setUser, setPlans, setViewingPlan, setDepot, toggleDesktopNav])

  const isAppLoading = isFetchingData || isMapLoading

  return (
    <>
      <AppShell
        transitionDuration={350}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: {
            mobile: !mobileNavOpened,
            desktop: !desktopNavOpened 
          },
        }}
        aside={{
          width: 600,
          breakpoint: 'sm',
          collapsed: {
            mobile: isViewing,
            desktop: isViewing
          }
        }}
      >
        {/* Floating elements */}
        {isViewing && <NavToggle />}
        <CreatePlanButton />
        <Settings />

        <AppShell.Navbar>
          {!isAppLoading && <Navbar />}
        </AppShell.Navbar>
        
        <AppShell.Main className={classes.main}>
          <MapView />
        </AppShell.Main>

        <AppShell.Aside>
          {!isAppLoading && <Aside />}
        </AppShell.Aside>
      </AppShell>
      <LoadingOverlay
        visible={isAppLoading}
        overlayProps={{ blur: 2 }}
        loaderProps={{
          children: <AppLoader />
        }}
      />
    </>
  );
}

export default App;