import { useEffect } from "react"
import { useRoute } from "wouter"
import { findPlan } from "../services/plans"
import useViewingPlan from "../store/useViewingPlan"
import useGUI from "../store/useGUI"

const useLoadPlan = () => {
  const [planMatch, planParams] = useRoute('/plan/:id')
  const { viewingPlan, setViewingPlan } = useViewingPlan()
  const { isFetchingData } = useGUI()

  useEffect(() => {
    if (!planMatch) {
      return
    }
    if (planParams?.id === viewingPlan?.id) {
      return
    }
    const plan = findPlan(planParams.id)
    if (!plan) {
      return
    }
    setViewingPlan(plan)
  }, [planMatch, isFetchingData])
}

export default useLoadPlan