import Dashboard from './Dashboard'
import Login from './Login'

import useLogin from './store/useLogin'
import useGUI from './store/useGUI'

import { fetchPlans, getPlans } from './services/plans'
import { fetchProducts } from './services/products'
import { fetchVehicles } from './services/vehicles'
import useViewingPlan from './store/useViewingPlan'

import { useEffect } from 'react'

const App = () => {
  const { 
    loggedIn, 
  } = useLogin()

  const { setFetchingData } = useGUI()

  const {
    viewingPlan,
    setViewingPlan
  } = useViewingPlan()

  useEffect(() => {
    const fetchInitData = async () => {
      if (loggedIn) {
        setFetchingData(true)
        await fetchPlans()
        await fetchProducts()
        await fetchVehicles()
        setViewingPlan(getPlans()[0])
        setFetchingData(false)
      }
    }
    fetchInitData()
  }, [loggedIn, setFetchingData, setViewingPlan])

  console.log(viewingPlan)

  if (!loggedIn) {
    return <Login />
  }

  return (
    <Dashboard />
  )
}

export default App