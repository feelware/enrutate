import {
  Stack,
  Group,
  Button,
  Title,
  Table,
  ActionIcon,
  rem
} from '@mantine/core'

import { 
  IconEdit, 
  IconTrash,
  IconShoppingCart
} from '@tabler/icons-react'

import SearchBar from '../../../components/SearchBar/SearchBar'

import useProcessStore from '../../../store/useProcessStore'

const AddClients = () => {
  const { newPlan, setNewPlan } = useProcessStore()
  
  return (
    <>
      <Stack pt={15}>
        <Title order={3}>
          Añadir clientes
        </Title>
        <Group justify='space-between' align='flex-end'>
          <SearchBar />
          <Button>
            Importar
          </Button>
        </Group>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Cliente</Table.Th>
              <Table.Th>Pedidos</Table.Th>
              <Table.Th>Acciones</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {newPlan.waypoints.map(w => (
              <Table.Tr key={w.client.id}>
                <Table.Td>
                  {w.client.name}
                </Table.Td>
                <Table.Td>
                  {Math.floor(Math.random() * 50 + 10)} kg
                </Table.Td>
                <Table.Td>
                  <Group gap={10}>
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
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </>
  )
}

export default AddClients