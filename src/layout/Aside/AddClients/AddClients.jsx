import {
  Stack,
  Group,
  Button,
  ScrollArea,
  Title,
  TextInput,
  Skeleton,
  Text,
  Center,
  Card,
  rem,
} from '@mantine/core'

import {
  IconSearch
} from '@tabler/icons-react'

import { useState } from 'react'

import PlacesSearchBar from '../../../components/PlacesSearchBar/'
import ClientCard from './ClientCard/'

const selectProps = {
  variant: 'unstyled',
  leftSection: <IconSearch size={13} />,
}

const AddClients = ({ 
  allClients,
  onClientUpdate,
  onClientRemove
}) => {
  const [filterQuery, setFilterQuery] = useState('')
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    failHandler: null
  })

  const filteredClients = allClients.filter(client => {
    return (
      !([client.main_text, client.formatted_address].every(field =>
        !(field.toLowerCase().includes(filterQuery.toLowerCase()))
      ))
    )
  })
  
  return (
    <Stack>
      <Title order={3}>
        Añadir clientes
      </Title>
      <Group justify='space-between' align='flex-end'>
        <PlacesSearchBar 
          onSubmit={(newClient) => onClientUpdate({ ...newClient, products: [] })}
          setSubmitState={setSubmitState}
          w={350}
        />
        <Button>
          Importar
        </Button>
      </Group>
      <Stack gap={4}>
        <TextInput 
          {...selectProps} 
          placeholder='Filtrar por nombre o dirección'
          styles={{ input: { fontSize: 13 } }}
          value={filterQuery}
          onChange={e => setFilterQuery(e.currentTarget.value)}
        />
        <ScrollArea 
          h='calc(100vh - 380px)'
          px={8}
          style={{ borderRadius: 'var(--mantine-radius-sm)' }}
          bg='var(--mantine-color-dark-8)'
        >
        {
          filteredClients.length || submitState.status !== 'idle'
          ? <Stack 
            gap={8}
            py={8}
          >
          {
            submitState.status !== 'idle' && 
            <Card h={70}>
            {
              submitState.status === 'fail'
              ? (
                <Group h='100%' justify='center' gap={13}>
                  <Text size={rem(13)} c='dimmed'>
                    Hubo un error al añadir el cliente
                  </Text>
                  <Button
                    variant='default'
                    onClick={submitState.failHandler}
                  >
                    Reintentar
                  </Button>
                </Group>
              )
              : submitState.status === 'loading' && (
                <Stack h='100%' justify='center' gap={13}>
                  <Skeleton height={13} radius="xl" width="30%" />
                  <Skeleton height={8} radius="xl" width="50%" />
                </Stack>
              )
            }
            </Card>
          }
          {
            filteredClients.map(client => (
              <ClientCard
                key={client.id} 
                client={client}
                onUpdate={(updatedClient) => onClientUpdate(updatedClient)}
                onDelete={() => onClientRemove(client.id)}
              />
            ))
          }
          </Stack>
          : <Center pt='lg'>
            <Text size={rem(13)} c='dimmed'>
              {
                filterQuery === ''
                ? 'Añade un cliente para comenzar'
                : 'No se encontraron resultados'
              }
            </Text>
          </Center>
        }
        </ScrollArea>
      </Stack>
    </Stack>
  )
}

export default AddClients