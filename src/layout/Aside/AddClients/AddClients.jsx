import {
  Stack,
  Group,
  Button,
  ScrollArea,
  Title,
  TextInput,
  Text,
  Center,
  rem,
} from '@mantine/core'

import {
  IconSearch
} from '@tabler/icons-react'

import { useState } from 'react'

import SearchBar from '../../../components/SearchBar/'
import ClientCard from './ClientCard/'

import useNewPlan from '../../../store/useNewPlan'

const scrollProps = {
  h: '100%',
  p: 8,
  style: { borderRadius: 'var(--mantine-radius-sm)' },
  bg: 'var(--mantine-color-dark-8)'
}

const selectProps = {
  variant: 'unstyled',
  leftSection: <IconSearch size={13} />,
}

const AddClients = () => {
  const [selectedClient, setSelectedClient] = useState(null)
  const [clientFilter, setClientFilter] = useState('')
  const [productFilter, setProductFilter] = useState('')
  const newPlan = useNewPlan()

  const clients = newPlan.clients.filter(client => {
    return client.name.toLowerCase().includes(clientFilter.toLowerCase())
  })
  
  return (
    <Stack h='100%'>
      <Title order={3}>
        Añadir clientes
      </Title>
      <Group justify='space-between' align='flex-end'>
        <SearchBar />
        <Button>
          Importar
        </Button>
      </Group>
      <Stack h='100%' gap={4}>
        <TextInput 
          {...selectProps} 
          placeholder='Buscar clientes'
          styles={{ input: { fontSize: 13 } }}
          value={clientFilter}
          onChange={e => setClientFilter(e.currentTarget.value)}
        />
        <ScrollArea 
          {...scrollProps}
        >
        {
          clients.length
          ? <Stack gap={8}>
          {
            clients.map(client => (
              <ClientCard
                key={client.id} 
                client={client} 
              />
            ))
          }
          </Stack>
          : <Center pt='sm'>
            <Text size={rem(13)} c='dimmed'>
              No se encontraron resultados
            </Text>
          </Center>
        }
        </ScrollArea>
      </Stack>
    </Stack>
  )
}

export default AddClients