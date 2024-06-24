import {
  Table,
  TextInput, 
  Group,
  Stack,
  ScrollArea,
  Button,
  Popover,
} from '@mantine/core'

import CrudRow from './CrudRow'
import CrudEditor from './CrudEditor'

import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'

const CrudTable = ({
  name,
  entries,
  attributes,
  onCreate,
  onUpdate,
  onDelete = () => {},
}) => {
  const [createOpened, createHandlers] = useDisclosure()
  const [filterQuery, setFilterQuery] = useState('')

  const filteringSelectors = Object.values(attributes)
    .filter((a) => a.filter)
    .map((a) => a.selector)

  const matchesQuery = (value) => value.toLowerCase().includes(filterQuery.toLowerCase())

  const filteredEntries = entries.filter((entry) => (
    !(filteringSelectors.every(selector => (
      !matchesQuery(selector(entry))
    )))
  ))

  const headers = Object.values(attributes).map((a) => a.label)

  const crudRows = filteredEntries.map((entry) => (
    <CrudRow 
      key={entry.id}
      entry={entry}
      attributes={attributes}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  ))

  return (
    <>
      <Stack h='100%'>
        <Group justify="space-between">
          <TextInput
            placeholder={`Buscar ${name}`}
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
          <Popover
            opened={createOpened}
            onClose={createHandlers.close}
            offset={10}
            withArrow
          >
            <Popover.Target>
              <Button onClick={createHandlers.toggle}>
                Nuevo
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <CrudEditor
                attributes={attributes}
                onSubmit={onCreate}
                close={createHandlers.close}
              />
            </Popover.Dropdown>
          </Popover>
        </Group>
        <ScrollArea h='100%'>
          <Table
            horizontalSpacing="md"
            styles={{
              td: {
                maxWidth: 350,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }
            }} 
          >
            <Table.Thead>
              <Table.Tr>
              {
                headers.map((h, i) => (
                  <Table.Th key={i}>
                    {h}
                  </Table.Th>
                ))
              }
                <Table.Th>{' '}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {crudRows}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </>
  )
}

export default CrudTable