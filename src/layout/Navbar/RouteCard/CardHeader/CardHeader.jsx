import { useState } from 'react'

import {
  Group,
  Stack,
  Text,
  UnstyledButton,
  Transition,
  Center,
  rem
} from '@mantine/core'

import {
  IconUsersGroup,
  IconRoute,
  IconTruckDelivery,
  IconClockHour3,
  IconChevronDown
} from '@tabler/icons-react'

import classes from './CardHeader.module.css'

const CardHeader = ({ onClick, ...route }) => {
  const [hover, setHover] = useState(false)

  return (
    <Stack 
      className={classes.header} 
      component={UnstyledButton} 
      p="md" 
      onClick={() => {
        onClick()
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Group justify='space-between' >
        <Text size={rem(13)} fw={500}>
          Ruta {route.index + 1}
        </Text>
        <Center h={rem(22)}>
          <Transition
            mounted={hover}
            transition="fade"
          >
          {
            (styles) => <div style={{
              ...styles, margin: 0
            }}>
              <IconChevronDown size={rem(14)} />
            </div>
          }
          </Transition>
        </Center>
        
        
      </Group>
      <Group grow>
        <Stack gap="xs">
          <Group gap="xs">
            <IconTruckDelivery size={rem(14)} />
            <Text size={rem(12)}>
              {route.vehicle_name}
            </Text>
          </Group>
          <Group gap="xs">
            <IconRoute size={rem(14)} />
            <Text size={rem(12)}>
              {route.total_distance} km
            </Text>
          </Group>
        </Stack>
        <Stack gap="xs">
          <Group gap="xs">
            <IconUsersGroup size={rem(14)} />
            <Text size={rem(12)}>
              {route.clients.length} clientes
            </Text>
          </Group>
          <Group gap="xs">
            <IconClockHour3 size={rem(14)} />
            <Text size={rem(12)}>
              {route.total_duration} horas
            </Text>
          </Group>
        </Stack>
      </Group>
    </Stack>
  )
}

export default CardHeader