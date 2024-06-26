import { useState } from 'react'

import {
  Timeline,
  Text,
  Stack,
  Flex,
  ActionIcon,
  Transition,
  Tooltip,
  Popover,
  rem
} from '@mantine/core'

import { useDisclosure } from '@mantine/hooks'

import {
  IconShoppingBag
} from '@tabler/icons-react'

import OrdersList from './OrdersList'

const Waypoint = ({ client }) => {
  const [hover, setHover] = useState(false)
  const [opened, { close, toggle }] = useDisclosure(false)

  return (
    <Timeline.Item
      title={
        <Flex 
          justify='space-between' 
          align='center'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Stack gap={rem(8)} >
            <Text size={rem(13)} fw={500}>
              {client?.main_text || 'Almacén'}
            </Text>
            <Text c="dimmed" size={rem(12)}>
              {client.formatted_address}
            </Text>
          </Stack>
          <Popover 
            width={200} 
            position="right-start" 
            shadow="md"
            offset={50}
            opened={opened}
          >
              <Transition
                mounted={client && hover}
                transition='fade'
              >
              {
                (styles) => 
                <div style={styles}>
                  <Tooltip 
                    label={
                      <Text size={rem(12)} py={3}>
                        Ver pedidos
                      </Text>
                    }
                    openDelay={150}
                    position='bottom'
                    offset={8}
                    transitionProps={{
                      duration: 250,
                      transition: 'fade'
                    }}
                  >
                    <Popover.Target>
                      <ActionIcon
                        size='xs'
                        color='default'
                        variant='transparent'
                        onClick={toggle}
                      >
                        <IconShoppingBag />
                      </ActionIcon>
                    </Popover.Target>
                  </Tooltip>
                </div>
              }
              </Transition>
            <Popover.Dropdown w={250}>
              <OrdersList products={client.products} onClose={close} />
            </Popover.Dropdown>
          </Popover>
        </Flex>
      }
      bullet={<></>}
    />
  )
}

export default Waypoint