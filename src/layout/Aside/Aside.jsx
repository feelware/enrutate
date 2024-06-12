import {
  Stack,
  Group,
  Stepper,
  Button,
  rem
} from '@mantine/core'

import {
  IconInfoCircle,
  IconUsersGroup,
  IconTruckDelivery,
  IconCircleCheck
} from '@tabler/icons-react'

import { useState } from 'react'
import useProcessStore from '../../store/useProcessStore'
import useGUIStore from '../../store/useGUIStore'

const iconStyles = {
  style: {
    width: rem(18),
    height: rem(18)
  }
}

const Aside = () => {
  const { 
    setIsViewing 
  } = useProcessStore()

  const { restoreNavOpened } = useGUIStore()

  const [active, setActive] = useState(0)
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))
  const nextStep = () => {
    if (active === 2) {
      setActive(0)
      restoreNavOpened()
      setIsViewing(true)
      return
    }
    setActive((current) => (current < 3 ? current + 1 : current))
  }

  return (
    <Stack 
      p={20}
      mt={60}
    >
      <Stepper
        active={active}
        completedIcon={<IconCircleCheck {...iconStyles} />}
      >
        <Stepper.Step 
          icon={<IconInfoCircle {...iconStyles} />}
        >
          
        </Stepper.Step> 
        <Stepper.Step 
          icon={<IconUsersGroup {...iconStyles} />}
        >
          
        </Stepper.Step>
        <Stepper.Step 
          icon={<IconTruckDelivery {...iconStyles} />}
        >
          
        </Stepper.Step> 
      </Stepper>

      <Group justify='space-between'>
        <Button
          onClick={prevStep}
          disabled={active === 0}
          variant='default'
        >
          Anterior
        </Button>
        <Button
          onClick={nextStep}
          variant={ active == 2 ? 'filled' : 'default' }
        >
          { active === 2 ? 'Generar' : 'Siguiente' }
        </Button>
      </Group>
    </Stack>
  )
}

export default Aside