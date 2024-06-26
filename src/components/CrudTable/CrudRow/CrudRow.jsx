import {
  Table,
  Group,
  ActionIcon,
  Button,
  Text,
  Stack,
  Popover,
  rem,
} from '@mantine/core'

import {
  IconEdit,
  IconTrash
} from '@tabler/icons-react'

import {
  useDisclosure,
  useClickOutside
} from '@mantine/hooks'

import CrudEditor from '../CrudEditor'

const buttonProps = {
  variant: 'transparent',
  color: 'default',
  size: 'xs',
}

const CrudRow = ({
  entry,
  attributes,
  onUpdate,
  onDelete,
}) => {
  const [editOpened, editHandlers] = useDisclosure()
  const [deleteOpened, deleteHandlers] = useDisclosure()
  const editRef = useClickOutside(editHandlers.close)
  const deleteRef = useClickOutside(deleteHandlers.close)

  const cells = Object.entries(attributes).map(([key, { selector }]) => (
    <Table.Td key={key}>
      {selector(entry)}
    </Table.Td>
  ))

  return (
    <Table.Tr>
      {cells}
      <Table.Td>
        <Group key={entry.id} justify='flex-end'>
          <Popover 
            opened={editOpened}
            onClose={editHandlers.close}
            offset={15}
            withArrow
          >
            <Popover.Target>
              <ActionIcon 
                {...buttonProps}
                title="Editar"
                onClick={editHandlers.toggle}
              >
                <IconEdit />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown w={250} ref={editRef}>
              <CrudEditor
                attributes={attributes}
                entry={entry}
                onSubmit={onUpdate}
                close={editHandlers.close}
              />
            </Popover.Dropdown>
          </Popover>
          <Popover
            opened={deleteOpened}
            onClose={deleteHandlers.close}
            offset={15}
            withArrow
          >
            <Popover.Target>
              <ActionIcon
                {...buttonProps}
                title="Eliminar"
                onClick={deleteHandlers.toggle}
              >
                <IconTrash />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown ref={deleteRef}>
              <Stack
                gap={16}
                py={5}
                align='center'
              >
                <Text size={rem(15)}>
                  ¿Estás seguro?
                </Text>
                <Group>
                  <Button
                    onClick={deleteHandlers.close}
                    variant='default'
                  >
                    Cancelar
                  </Button>
                  <Button
                    color='red'
                    onClick={async () => {
                      await onDelete(entry)
                      deleteHandlers.close()
                    }}
                  >
                    Eliminar
                  </Button>
                </Group>
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Table.Td>
    </Table.Tr>
  )
}

export default CrudRow