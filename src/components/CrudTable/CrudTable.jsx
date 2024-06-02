import {
  Table,
  TextInput, 
  ActionIcon,
  Title,
  Group,
  Button,
} from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import classes from './CrudTable.module.css'

const CrudTable = ({
  entityName,
  head,
  filterCol = "name",
  entries,
  colSelector,
  onEdit,
  onDelete,
  minWidth,
  maxHeight = "100%",
  height = "100%",
  flex = 1
}) => {
  const [filter, setFilter] = useState('')

  const data = {
    head: [ ...head, ' '],
    body: entries
      .filter((entry) => entry[filterCol].toLowerCase().includes(filter.toLowerCase()))
      .map((entry) => [
        ...colSelector(entry),
        <Group key={entry.id} justify='flex-end'>
          <ActionIcon 
            size='xs'
            variant="transparent"
            color="gray"
            title="Editar"
            onClick={() => onEdit(entry)}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            size='xs'
            variant="transparent"
            color="gray"
            title="Eliminar"
            onClick={() => onDelete(entry)}
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      ])
  }

  return (
    <>
      <div className={classes.main} style={{ 
        minWidth,
        maxHeight,
        height,
        flex
      }}>
        <Group justify="space-between">
          <Title align="center" order={5} weight={700} >
            {entityName.charAt(0).toUpperCase() + entityName.slice(1) + 's'}
          </Title>
          <Group>
            <TextInput
              placeholder={`Buscar ${entityName}`}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Button>
              Nuevo
            </Button>
          </Group>
        </Group>
        <div className={classes.table}>
          <Table
            stickyHeader
            data={data}
            verticalSpacing="sm"
            horizontalSpacing="md"
          />
        </div>
      </div>
    </>
  )
}

export default CrudTable