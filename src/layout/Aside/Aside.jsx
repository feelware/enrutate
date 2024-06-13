import { useState } from 'react'

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

import GeneralInfo from './GeneralInfo'
import AddClients from './AddClients'
import SelectVehicles from './SelectVehicles'

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
    setIsViewing,
    newPlan,
    setNewPlan
  } = useProcessStore()

  const [active, setActive] = useState(0)

  const { restoreNavOpened } = useGUIStore()

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

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())

  let nextDisabled = false
  switch (active) {
    case 0:
      nextDisabled = (title === '' || description === '')
      break 
    default:
      break
  }

  console.log(nextDisabled)
  
  return (
    <Stack 
      p={20}
      mt={60}
      justify='space-between'
      h='100%'
    >
      <Stepper
        active={active}
        completedIcon={<IconCircleCheck {...iconStyles} />}
      >
        <Stepper.Step 
          icon={<IconInfoCircle {...iconStyles} />}
        >
          <GeneralInfo 
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
          />
        </Stepper.Step> 
        <Stepper.Step 
          icon={<IconUsersGroup {...iconStyles} />}
        >
          <AddClients />
        </Stepper.Step>
        <Stepper.Step 
          icon={<IconTruckDelivery {...iconStyles} />}
        >
          <SelectVehicles />
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
          disabled={nextDisabled}
        >
          { active === 2 ? 'Generar' : 'Siguiente' }
        </Button>
      </Group>
    </Stack>
  )
}

export default Aside