import {
  Timeline,
  Text,
  Stack,
  Group,
  ActionIcon,
  Popover,
  rem
} from '@mantine/core'

import {
  IconShoppingCart
} from '@tabler/icons-react'

import OrdersList from './OrdersList'

const Waypoint = ({ client }) => {
  return (
    <Timeline.Item
      title={
        <Group
          gap={30}
          grow
          preventGrowOverflow={false}
        >
          <Stack 
            gap={rem(8)}
            flex={8}
          >
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
          >
            <Popover.Target>
              <ActionIcon
                title='Ver pedidos'
                color='dimmed'
                variant='transparent'
                flex={1}
              >
                <IconShoppingCart size={15} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown 
              w={250}
              mah={300}
              p={0}
              style={{
                overflowY: 'auto',
              }}
            >
              <OrdersList 
                products={client.products} 
                onClose={close} 
              />
            </Popover.Dropdown>
          </Popover>
        </Group>
      }
      bullet={<></>}
    />
  )
}

export default Waypoint