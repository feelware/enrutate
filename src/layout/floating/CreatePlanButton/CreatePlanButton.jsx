import {
  Button,
  Affix
} from '@mantine/core'

import useProcess from '../../../store/useProcess'
import useGUI from '../../../store/useGUI'

const CreatePlanButton = () => {
  const { isViewing, setIsViewing } = useProcess()
  const {
    setMobileNavOpened, 
    setDesktopNavOpened,
    holdNavOpened,
    restoreNavOpened
  } = useGUI()

  const toggle = () => {
    if (isViewing) {
      holdNavOpened()
      setMobileNavOpened(false)
      setDesktopNavOpened(false)
      setIsViewing(false)
    }
    else {
      restoreNavOpened()
      setIsViewing(true)
    }
  }

  return (
    <Affix position={{ top: 20, right: 20 }}>
      <Button
        variant='default'
        onClick={toggle}
      >
        {isViewing ? 'Nuevo plan' : 'Cancelar'}
      </Button>
    </Affix>
  )
}

export default CreatePlanButton