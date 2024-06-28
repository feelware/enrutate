import { useState } from 'react'

import {
  Group,
  Stack,
  Text,
  UnstyledButton,
  SimpleGrid,
  Transition,
  Center,
  ColorSwatch,
} from '@mantine/core'

import {
  IconUsersGroup,
  IconRoute,
  IconTruckDelivery,
  IconClockHour3,
  IconChevronDown
} from '@tabler/icons-react'

const Stat = ({ Icon, label }) => (
  <Group gap="xs">
    <Icon size={12} />
    <Text size='xs'>
      {label}
    </Text>
  </Group>
)

const CardHeader = ({ bodyToggle, ...route }) => {
  const [hover, setHover] = useState(false)

  const stats = [
    {
      Icon: IconTruckDelivery,
      label: route.vehicle_name
    },
    {
      Icon: IconRoute,
      label: `${route.total_distance} km`
    },
    {
      Icon: IconUsersGroup,
      label: `${route.clients.length} clientes`
    },
    {
      Icon: IconClockHour3,
      label: `${route.total_duration} horas`
    }
  ]

  return (
    <Stack
      p='lg'
      bg={hover ? 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-5))' : ''}
      component={UnstyledButton} 
      onClick={bodyToggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Group justify='space-between'>
        <Group gap={9} my={5}>
          <ColorSwatch size={7} color='var(--mantine-color-blue-3)' />
          <Text size='xs' fw={700} lh={0}>
            Ruta {route.index + 1}
          </Text>
        </Group>
        <Transition
          mounted={hover}
          transition="fade"
        >
        {
          (styles) => <Center
            style={{
            ...styles
            }}
          >
            <IconChevronDown size={13} />
          </Center>
        }
        </Transition>
      </Group>
      <SimpleGrid 
        cols={2}
        verticalSpacing='xs'
      >
      {
        stats.map(stat => (
          <Stat key={stat.label} {...stat} />
        ))
      }
      </SimpleGrid>
    </Stack>
  )
}

export default CardHeader