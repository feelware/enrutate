import Dashboard from './Dashboard'
import Login from './Login'

import useLogin from './store/useLogin'
import useGUI from './store/useGUI'

import { fetchProducts } from './services/products'
import { fetchVehicles } from './services/vehicles'

import { useEffect } from 'react'

const App = () => {
  const { 
    loggedIn, 
  } = useLogin()

  const { setFetchingData } = useGUI()

  useEffect(() => {
    const fetchInitData = async () => {
      if (loggedIn) {
        setFetchingData(true)
        await fetchProducts()
        await fetchVehicles()
        setFetchingData(false)
      }
    }
    fetchInitData()
  }, [loggedIn, setFetchingData])

  if (!loggedIn) {
    return <Login />
  }

  return (
    <Dashboard />
  )
}

export default App