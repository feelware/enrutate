import {
  Timeline,
  Text,
  Stack,
  Group,
  ActionIcon,
  Popover,
  Center,
  Transition,
} from '@mantine/core'

import { useHover } from '@mantine/hooks'

import {
  IconShoppingCart
} from '@tabler/icons-react'

import OrdersList from './OrdersList'

const Label = ({ name, address }) => (
  <Stack 
    gap={4}
    flex={10}
    mt={-3}
  >
    <Text 
      size='xs' 
      fw={500}
    >
      {name}
    </Text>
    <Text 
      c="dimmed" 
      size='xs'
    >
      {address}
    </Text>
  </Stack>
)

const OrdersButton = ({ products, visible }) => (
  <Popover 
    width={200} 
    position="right-start" 
    shadow="md"
    offset={50}
  >
    <Popover.Target>
      <ActionIcon
        title='Ver pedidos'
        variant='transparent'
        c='dimmed'
        size={15}
      >
        <Transition
          mounted={visible}
          transition="fade"
        >
        {
          (styles) => (
            <Center
              style={{
              ...styles
              }}
            >
              <IconShoppingCart size={15} />
            </Center>
          )
        }
        </Transition>
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
        products={products} 
        onClose={close} 
      />
    </Popover.Dropdown>
  </Popover> 
)

const Waypoint = ({ name, address, products }) => {
  const { hovered, ref } = useHover()

  return (
    <Timeline.Item
      title={(
        <Group
          gap={30}
          preventGrowOverflow={false}
          ref={ref}
        >
          <Label 
            name={name}
            address={address}
          />
          <OrdersButton 
            products={products}
            visible={hovered}
          />
        </Group>
      )}
      bullet={<></>}
    />
  )
}

export default Waypoint