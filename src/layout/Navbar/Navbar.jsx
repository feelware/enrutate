import { useState } from 'react'
import {
  Title,
  Text,
  Stack,
  Group,
  ScrollArea,
  NavLink,
  ActionIcon,
  SegmentedControl,
  TextInput,
  Center,
  rem
} from '@mantine/core'
import {
  IconDownload,
  IconShare,
  IconArrowLeft,
  IconSearch,
  IconRoute,
  IconUsers,
  IconX
} from '@tabler/icons-react'

import UserOptions from './UserOptions/';

import useProcessStore from '../../store/useProcessStore'
import useGUIStore from '../../store/useGUIStore'

import classes from './Navbar.module.css'

const Navbar = () => {
  const { currentViewPlan } = useProcessStore()
  const { navPadding } = useGUIStore()
  const [mode, setMode] = useState('rutas')
  const [searching, setSearching] = useState(false)

  const Option = ({ label, Icon, onClick }) => (
    <NavLink
      pl={navPadding}
      pr={navPadding}
      label={<Text size={rem(13)}>{label}</Text>}
      leftSection={<Icon size="1rem" stroke={1.5} />}
      onClick={onClick}
    />
  )

  const options = [
    {
      label: 'Guardar como',
      Icon: IconDownload,
      onClick: () => console.log('Download')
    },
    {
      label: 'Compartir',
      Icon: IconShare,
      onClick: () => console.log('Share')
    },
    {
      label: 'Ver todos mis planes',
      Icon: IconArrowLeft,
      onClick: () => console.log('Back')
    },
  ]

  return (
    <Stack justify="space-between" className={classes.navbar}>
      <Stack gap={5} pr={navPadding} pl={navPadding} pt={75}>
        <Title order={3}>{currentViewPlan.name}</Title>
        <ScrollArea mb={20} h={20}>
          <Text size="xs" c="dimmed">
            {currentViewPlan.description}
          </Text>
        </ScrollArea>
      </Stack>
      <Stack gap={12} style={{ height: '100%' }}>
        <Group px={navPadding} h={32} gap={0} justify="space-between">
          {
            searching
            ? (
              <TextInput 
                placeholder={`Buscar ${mode}`}
              />
            )
            : (
              <SegmentedControl
                data={[
                  { 
                    value: 'rutas',
                    label: (
                      <Center px={4} py={2.5} style={{ gap: 5 }}>
                        <IconRoute style={{ width: rem(16), height: rem(16) }} />
                        <span>Rutas</span>
                      </Center>
                    ) 
                  },
                  { 
                    value: 'clientes',
                    label: (
                      <Center px={4} py={2.5} style={{ gap: 5 }}>
                        <IconUsers style={{ width: rem(16), height: rem(16) }} />
                        <span>Clientes</span>
                      </Center>
                    ) 
                  },
                ]}
                value={mode}
                onChange={setMode}
                size="xs"
              />
            )
          }
          <ActionIcon 
            variant="transparent"
            c="gray"
            onClick={() => setSearching(!searching)}
          >
          {
            searching
            ? <IconX 
              size={rem(18)}
              stroke={1.5}
            />
            : <IconSearch
              size={rem(18)}
              stroke={1.5}
            />
          }
          </ActionIcon>
        </Group>
        <ScrollArea className={classes.results}>
        {
          
        }
        </ScrollArea>
      </Stack>
      <Stack gap={0}>
        <Stack gap={0}>
        {
          options.map((option, index) => (
            <Option key={index} {...option} />
          ))
        }
        </Stack>
        <UserOptions />
      </Stack>
    </Stack>
  );
}

export default Navbar;