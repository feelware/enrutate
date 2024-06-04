import { 
  AppShell
} from '@mantine/core';

import useGUIStore from './store/useGUIStore';
import useProcessStore from './store/useProcessStore';
import useUserData from './store/useUserData';

import Navbar from './layout/Navbar/';
import NavOpenToggle from './layout/NavOpenToggle/'
import MapView from './layout/MapView'

// import ThemeToggle from './layout/ThemeToggle'

import classes from './App.module.css'

import { useEffect } from 'react';
import users from './services/users';

const App = () => {
  const { 
    mobileNavOpened,
    desktopNavOpened,
  } = useGUIStore()

  const { 
    setCurrentViewPlan
  } = useProcessStore()

  const {
    setUserData
  } = useUserData()

  useEffect(() => {
    // const userId = '0'
    // users.setCurrentUserId(userId)
    const storedUser = localStorage.getItem('userData')
    if (storedUser) {
      console.log('User data found in local storage')
      const user = JSON.parse(storedUser)
      console.log({ user })
      users.setCurrentUser(user)
      setUserData(user)
    }
    else {
      console.log('No user data found in local storage')
      const saveUser = async () => {
        const mockUser = await users.getMockUser()
        localStorage.setItem('userData', JSON.stringify(mockUser))
        users.setCurrentUser(mockUser)
        setUserData(mockUser)
      }
      saveUser()
    }
    const fetchLatestPlan = async () => {
      const latestPlan = await users.getLatestPlan()
      setCurrentViewPlan(latestPlan)
    }
    fetchLatestPlan()
  }, [setUserData, setCurrentViewPlan])

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileNavOpened, desktop: !desktopNavOpened },
      }}
    >
      <NavOpenToggle />

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>
      
      <AppShell.Main className={classes.main}>
        <MapView />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;