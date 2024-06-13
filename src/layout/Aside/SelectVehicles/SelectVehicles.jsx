import {
  Stack,
  Group,
  Title,
  // Checkbox,
  Table,
  TextInput,
  rem
} from '@mantine/core'

import useUserStore from '../../../store/useUserStore'

const SelectVehicles = () => {
  const { depot } = useUserStore()

  return (
    <Stack pt={15}>
      <Title order={3}>
        Vehículos elegibles
      </Title>
      {/* <Checkbox 
        label='Toda la flota'
      /> */}
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Modelo</Table.Th>
            <Table.Th>Capacidad</Table.Th>
            <Table.Th>Instancias</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {depot.vehicles.map(v => (
            <Table.Tr key={v.id}>
              <Table.Td>
                {v.name}
              </Table.Td>
              <Table.Td>
                {v.capacity} kg
              </Table.Td>
              <Table.Td>
                <Group>
                  <TextInput
                    placeholder='0'
                    type='number'
                    min={0}
                    max={v.instances}
                    w={rem(50)}
                  />
                  / {v.instances}
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  )
}

export default SelectVehicles