import {
  Button
} from '@mantine/core'

import { useLocation } from 'wouter'
import useViewingPlan from '../../../store/useViewingPlan'

const NewButton = () => {
  const [location, setLocation] = useLocation()
  const { viewingPlan } = useViewingPlan()

  return (
    <Button 
      fullWidth
      variant='default'
      onClick={() => {
        if (location === '/new') {
          if (viewingPlan) {
            setLocation(`/plan/${viewingPlan.id}`)
          }
          else setLocation('/')
        }
        else setLocation('/new')
      }}
    >
      {location === '/new' ? 'Cancelar' : 'Nuevo'}
    </Button>
  )
}

export default NewButton