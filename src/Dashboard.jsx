import { 
  AppShell,
  LoadingOverlay
} from '@mantine/core'

import Header from './layout//Header'
import MapView from './layout/MapView'
import Navbar from './layout/Navbar'
import Aside from './layout/Aside'

import AppLoader from './components/AppLoader'
import useAppShell from './hooks/useAppShell'

const App = () => {
  const { 
    isAppLoading,
    navbarCollapsed,
    asideCollapsed 
  } = useAppShell()

  return (
    <>
      <AppShell 
        transitionDuration={350}
        header={{
          height: 55,
        }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: navbarCollapsed
        }}
        aside={{
          width: 600,
          breakpoint: 'sm',
          collapsed: asideCollapsed
        }}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>

        <AppShell.Main h='100vh' w='100vw'>
          <MapView />
        </AppShell.Main>

        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>

        <AppShell.Aside>
          <Aside />
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