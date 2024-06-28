import {
  Popover,
  Text,
  Button,
  Group,
} from '@mantine/core'

import {
  useDisclosure
} from '@mantine/hooks'

import { useRoute } from 'wouter'

import {
  IconChevronDown
} from '@tabler/icons-react'

import useViewingPlan from '../../../store/useViewingPlan'

import Plans from "./Plans"

const PlanButton = () => {
  const [popoverOpened, popoverHandlers] = useDisclosure()
  const { viewingPlan } = useViewingPlan()
  const [newMatch] = useRoute('/new')
  
  let label
  if (newMatch) {
    label = (
      <Group gap={10} w='250' justify='center'>
        <IconChevronDown size={13} />
        <Text size='sm' fw={700}>
          Nuevo plan
        </Text>
      </Group>
    )
  }
  else if (viewingPlan) {
    label = (
      <Group gap={10} w='250' justify='center'>
        <IconChevronDown size={13} />
        <Text size='sm' fw={700} truncate='end'>
          {viewingPlan.title}
        </Text>
      </Group>
    )
  }
  else {
    label = (
      <Group gap={10} w='250' justify='center'>
        <IconChevronDown size={13} color='var(--mantine-color-dark-2)' />
        <Text size='xs' c='dimmed'>
          Ver todos mis planes
        </Text>
      </Group>
    )
  }

  return (
    <>
      <Popover
        opened={popoverOpened}
        offset={15}
        shadow='xl'
      >
        <Popover.Target>
          <Button
            w={350}
            title='Ver todos mis planes'
            variant='subtle'
            color='default'
            h='100%'
            onClick={popoverHandlers.toggle}
          >
            {label}
          </Button>
        </Popover.Target>
        <Popover.Dropdown p={0}>
          <Plans 
            onClose={popoverHandlers.close}
          />
        </Popover.Dropdown>
      </Popover>
    </>
  )
}

export default PlanButton