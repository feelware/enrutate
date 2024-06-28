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

import useViewingPlan from '../../store/useViewingPlan'
import useNewPlan from '../../store/useNewPlan'
import useGUI from '../../store/useGUI'
import { useLocation } from 'wouter'

// import { generatePlan } from '../../services/plans'

const iconStyles = {
  style: {
    width: rem(18),
    height: rem(18)
  }
}

const Aside = () => {
  const [, setLocation] = useLocation()
  const newPlan = useNewPlan()
  const { viewingPlan } = useViewingPlan()
  const { restoreNavOpened } = useGUI()
  const [active, setActive] = useState(0)

  const clients = newPlan.clients

  const prevStep = () => {
    setActive((current) => Math.max(0, current - 1))
  }
  const nextStep = async () => {
    if (active === 1) {
      const planToPost = {
        title: newPlan.title,
        description: newPlan.description,
        startDate: newPlan.startDate,
        clients: newPlan.clients
      }
      console.log(planToPost)
      const newLocation = viewingPlan ? `/plan/${viewingPlan.id}` : '/'
      setLocation(newLocation)
      setActive(0)
      restoreNavOpened()
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
          onClientAdd={newPlan.addClient}
          onClientUpdate={newPlan.updateClient}
          onClientRemove={newPlan.removeClient} 
        />
    }
  }

  return (
    <Stack 
      p={20}
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