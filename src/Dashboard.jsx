import { 
  AppShell,
  LoadingOverlay
} from '@mantine/core'

import useGUI from './store/useGUI'
import useProcess from './store/useProcess'

import Navbar from './layout/Navbar'
import MapView from './layout/MapView'
import Aside from './layout/Aside'

import Plans from './layout/floating/Plans'
import Settings from './layout/floating/Settings'
import NavToggle from './layout/floating/NavToggle'
import CreatePlanButton from './layout/floating/CreatePlanButton'

import AppLoader from './components/AppLoader'

import classes from './Dashboard.module.css'

const App = () => {
  const { 
    mobileNavOpened,
    desktopNavOpened,
    isFetchingData,
    isMapLoading
  } = useGUI()

  const {
    isViewing
  } = useProcess()

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
        {!isAppLoading && <Plans />}
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