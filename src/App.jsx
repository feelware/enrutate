import Dashboard from './Dashboard'
import Login from './Login'

import useAuthReload from './hooks/useAuthReload'
import useLoadPlan from './hooks/useLoadPlan'

const App = () => {
  const { loggedIn } = useAuthReload()
  useLoadPlan()

  if (!loggedIn) {
    return <Login />
  }

  return (
    <Dashboard />
  )
}

export default App