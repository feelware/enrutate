import {
  Button,
  Affix
} from '@mantine/core'

import useProcessStore from '../../store/useProcessStore'
import useGUIStore from '../../store/useGUIStore'

const NewButton = () => {
  const { isViewing, setIsViewing } = useProcessStore()
  const {
    setMobileNavOpened, 
    setDesktopNavOpened,
    holdNavOpened,
    restoreNavOpened
  } = useGUIStore()

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

export default NewButton