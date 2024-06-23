import Dashboard from './Dashboard'
import Login from './Login'
import useLogin from './store/useLogin'

const App = () => {
  const { loggedIn, autoRefresh } = useLogin()

  if (!loggedIn) {
    return <Login />
  }

  autoRefresh()

  return (
    <Dashboard />
  )
}

export default App