import { useRoute } from "wouter"
import useViewingPlan from "../../store/useViewingPlan"
import useNewPlan from "../../store/useNewPlan"

const useMarkers = () => {
  const [planMatch] = useRoute('/plan/:id')
  const [newMatch] = useRoute('/new')
  const { viewingPlan } = useViewingPlan()
  const { clients } = useNewPlan()

  if (planMatch && viewingPlan) {
    const clients = []
    viewingPlan?.routes.forEach((route) =>
      route.clients.forEach(client => (
        clients.push({
          id: client.id,
          position: {
            lat: client.lat,
            lng: client.lng
          }
        })
      ))
    )
    return clients
  }

  if (newMatch) {
    return clients.map(client => ({
      id: client.id,
      position: {
        lat: client.lat,
        lng: client.lng
      }
    }))
  }

  return []
}

export default useMarkers