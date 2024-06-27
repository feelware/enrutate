import { useState } from 'react'

import {
  Stack,
  Group,
  Stepper,
  Box,
  Button,
  rem
} from '@mantine/core'

import {
  IconInfoCircle,
  IconUsersGroup,
  IconCircleCheck
} from '@tabler/icons-react'

import GeneralInfo from './GeneralInfo'
import AddClients from './AddClients'

import useProcess from '../../store/useProcess'
import useNewPlan from '../../store/useNewPlan'
import useGUI from '../../store/useGUI'

// import { generatePlan } from '../../services/plans'

const iconStyles = {
  style: {
    width: rem(18),
    height: rem(18)
  }
}

const Aside = () => {
  const {
    setIsViewing,
  } = useProcess()

  const newPlan = useNewPlan()
  const clients = Array.from(newPlan.clients.values()).reverse()

  const { restoreNavOpened } = useGUI()
  
  const [active, setActive] = useState(0)

  const prevStep = () => {
    setActive((current) => Math.max(0, current - 1))
  }
  const nextStep = async () => {
    if (active === 1) {
      const finishedPlan = {
        title: newPlan.title,
        description: newPlan.description,
        startDate: newPlan.startDate,
        clients: clients,
      }
      console.log(finishedPlan)
      // const res = await generatePlan(finishedPlan)
      // console.log(res)
      setActive(0)
      restoreNavOpened()
      setIsViewing(true)
      return
    }
    setActive((current) => current + 1)
  }

  const validatorSelector = () => {
    switch (active) {
      case 0:
        return (
          newPlan.title !== '' 
          && newPlan.description !== ''
        )
      case 1: {
        return (
          clients.length > 1
          && clients.every(client => client.products.length)
        )
      }
    }
  }

  const componentSelector = () => {
    switch (active) {
      case 0:
        return <GeneralInfo />
      case 1:
        return <AddClients 
          allClients={clients}
          onClientUpdate={newPlan.updateClient}
          onClientRemove={newPlan.removeClient} 
        />
    }
  }

  return (
    <Stack 
      p={20}
      mt={60}
      h='100vh'
    >
      <Stepper
        active={active}
        completedIcon={<IconCircleCheck {...iconStyles} />}
      >
        <Stepper.Step icon={<IconInfoCircle {...iconStyles} />} />
        <Stepper.Step icon={<IconUsersGroup {...iconStyles} />} />
      </Stepper>

      <Box h='100%'>
        {componentSelector()}
      </Box>

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
          variant={ active == 1 ? 'filled' : 'default' }
          disabled={!validatorSelector()}
        >
          { active === 1 ? 'Generar' : 'Siguiente' }
        </Button>
      </Group>
    </Stack>
  )
}

export default Aside