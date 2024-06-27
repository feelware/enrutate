import Dashboard from './Dashboard'
import Login from './Login'

import useLogin from './store/useLogin'
import useGUI from './store/useGUI'

import { fetchPlans, getPlans, findPlan } from './services/plans'
import { fetchProducts } from './services/products'
import { fetchVehicles } from './services/vehicles'
import useViewingPlan from './store/useViewingPlan'

import { useEffect } from 'react'
import { useLocation, useRoute } from 'wouter'

const App = () => {
  const [location, setLocation] = useLocation()
  const { loggedIn } = useLogin()
  const { setFetchingData } = useGUI()
  const [planMatch, planParams] = useRoute('/plan/:id')

  const {
    setViewingPlan
  } = useViewingPlan()

  const loadPlan = () => {
    if (planMatch) {
      const plan = findPlan(planParams.id)
      if (plan) {
        setViewingPlan(plan)
        return
      }
    }
    const plans = getPlans()
    if (!plans[0]) {
      return
    }
    setLocation(`/plan/${plans[0].id}`)
    setViewingPlan(plans[0])
  }

  useEffect(() => {
    const fetchInitData = async () => {
      if (loggedIn) {
        setFetchingData(true)
        await fetchPlans()
        await fetchProducts()
        await fetchVehicles()
        setFetchingData(false)
        loadPlan()
      }
    }
    fetchInitData()
  }, [loggedIn])

  useEffect(() => {
    if (['/plans', '/settings', '/new'].some(route => location === route)) {
      return
    }
    loadPlan()
  }, [location])

  if (!loggedIn) {
    return <Login />
  }

  return (
    <Dashboard />
  )
}

export default App