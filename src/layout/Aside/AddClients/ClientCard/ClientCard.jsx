import {
  Stack,
  Group,
  Text,
  Card,
  ActionIcon,
  Menu,
  Popover,
  rem
} from '@mantine/core'

import { 
  IconTrash,
  IconEdit,
  IconShoppingCart,
  IconDots,
} from '@tabler/icons-react'

import {
  useDisclosure,
  useClickOutside
} from '@mantine/hooks'

import ProductSelector from './ProductSelector'

const iconProps = {
  size: rem(15),
}

const ClientCard = ({ 
  client,
  onUpdate,
  onDelete
}) => {
  const [popoverOpened, popoverHandlers] = useDisclosure()
  const popoverRef = useClickOutside(
    () => popoverHandlers.close()
  )

  return (
    <Card 
      h={70}
      bg='var(--mantine-color-dark-7)'
    >
      <Group justify='space-between' align='center' h='100%'>
        <Stack
          gap={0}
        >
          <Text size='sm' fw={500}>
            {client.main_text}
          </Text>
          <Text c="dimmed" size='xs' truncate='end' w='400'>
            {client.products.length} pedidos · {client.formatted_address}
          </Text>
        </Stack>
        <Group gap={10} justify='end'>
          <Popover
            opened={popoverOpened}
            onClose={popoverHandlers.close}
            position='left-start'
            ref={popoverRef}
          >
            <Popover.Target>
              <ActionIcon 
                size='xs'
                variant='transparent'
                color='gray'
                title='Pedidos'
                onClick={popoverHandlers.toggle}
              >
                <IconShoppingCart />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown
              bg='var(--mantine-color-dark-7)'
              h={350}
              w={300}
              p={10}
              bd='1px solid var(--mantine-color-dark-6)'
            >
              <ProductSelector 
                client={client}
                onUpdate={onUpdate}
                onClose={popoverHandlers.close}
              />
            </Popover.Dropdown>
          </Popover>
          <Menu
            position='bottom-end'
          >
            <Menu.Target>
              <ActionIcon 
                size='xs'
                variant='transparent'
                color='gray'
                title='Opciones'
              >
                <IconDots />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                pr={20}
                leftSection={<IconEdit {...iconProps} />}
              >
                Editar ubicación
              </Menu.Item>
              <Menu.Item
                pr={20}
                leftSection={<IconTrash {...iconProps} />}
                onClick={onDelete}
              >
                Eliminar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Card>
  )
}

export default ClientCard