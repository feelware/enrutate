import { 
  AppShell
} from '@mantine/core';

import useGUIStore from './store/useGUIStore'
import useProcessStore from './store/useProcessStore'
import useViewingPlan from './store/useViewingPlan'
import useUserStore from './store/useUserStore'

import Navbar from './layout/Navbar/'
import NavOpenToggle from './layout/NavOpenToggle'
import NewButton from './layout/NewButton'
import MapView from './layout/MapView'
import Aside from './layout/Aside'

// import ThemeToggle from './layout/ThemeToggle'

import classes from './App.module.css'

import { useEffect } from 'react';
import users from './services/users';

const App = () => {
  const { 
    mobileNavOpened,
    desktopNavOpened,
    toggleDesktopNav,
  } = useGUIStore()

  const {
    isViewing
  } = useProcessStore()

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

  return (
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
      {isViewing && <NavOpenToggle />}
      <NewButton />

      <AppShell.Navbar>
        {<Navbar />}
      </AppShell.Navbar>
      
      <AppShell.Main className={classes.main}>
        <MapView />
      </AppShell.Main>

      <AppShell.Aside>
        <Aside />
      </AppShell.Aside>
    </AppShell>
  );
}

export default App;