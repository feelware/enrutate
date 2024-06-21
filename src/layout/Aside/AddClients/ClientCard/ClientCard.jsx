import {
  Stack,
  Group,
  Text,
  Card,
  ActionIcon,
} from '@mantine/core'

import { 
  IconTrash,
  IconEdit,
  IconShoppingCart
} from '@tabler/icons-react'

import useNewPlan from '../../../../store/useNewPlan'

const ClientCard = ({ client }) => {
  const { clients, setClients } = useNewPlan()

  return (
    <Card h={70}>
      <Group justify='space-between' align='center' h='100%'>
        <Stack
          gap={0}
        >
          <Text size='sm' fw={500}>
            {client.main_text}
          </Text>
          <Text c="dimmed" size='xs' truncate='end' w='400'>
            {client.products.length} pedidos · {client.address}
          </Text>
        </Stack>
        <Group gap={10} justify='end'>
          <ActionIcon 
            size='xs'
            variant='transparent'
            color='gray'
            title='Pedidos'
          >
            <IconShoppingCart />
          </ActionIcon>
          <ActionIcon 
            size='xs'
            variant='transparent'
            color='gray'
            title='Editar'
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon 
            size='xs'
            variant='transparent'
            color='gray'
            title='Eliminar'
            onClick={() => {
              setClients(clients.filter(c => c.id !== client.id))
            }}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  )
}

export default ClientCard