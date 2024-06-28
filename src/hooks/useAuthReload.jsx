import useGUI from "../store/useGUI"
import useLogin from "../store/useLogin"

import { fetchPlans } from '../services/plans'
import { fetchProducts } from '../services/products'
import { fetchVehicles } from '../services/vehicles'
import { useEffect } from "react"

const useAuthReload = () => {
  const { loggedIn } = useLogin()
  const { setFetchingData } = useGUI()

  useEffect(() => {
    const fetchInitData = async () => {
      if (loggedIn) {
        setFetchingData(true)
        await fetchPlans()
        await fetchProducts()
        await fetchVehicles()
        setFetchingData(false)
      }
    }
    fetchInitData()
  }, [loggedIn])

  return { loggedIn }
}

export default useAuthReload