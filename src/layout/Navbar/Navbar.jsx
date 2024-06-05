import {
  Title,
  Text,
  Stack,
  Group,
  ScrollArea,
  NavLink,
  ActionIcon,
  TextInput,
  Center,
  Card,
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

  console.log(currentViewPlan)

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

  const RouteCard = ({ clients }) => {
    console.log(clients)
    if (!clients) return
    return (
      <Card>
      {
        clients.map((client, index) => (
          <Text key={index}>
            {client.client_name}
            hola
          </Text>
        ))
      }
      </Card>
    )
  }

  return (
    <Stack justify="space-between" className={classes.navbar}>
      <Stack gap={5} pr={navPadding} pl={navPadding} pt={75}>
        <Title order={3}>{currentViewPlan.name}</Title>
        <ScrollArea mb={10} h={20}>
          <Text size="xs" >
            {currentViewPlan.description}
          </Text>
        </ScrollArea>
      </Stack>
      <Stack gap={2} style={{ height: '100%' }}>
        <TextInput
          pl={rem(13)}
          placeholder={'Buscar rutas'}
          style={{ width: '100%' }}
          leftSection={<IconSearch size={rem(13)} />}
          styles={{
            input: {
              borderRadius: 0,
              border: 'none',
              fontSize: rem(12),
              paddingRight: navPadding,
              paddingLeft: navPadding + 10,
              backgroundColor: 'transparent',
            }
          }}
        />
        <ScrollArea className={classes.results}>
          {/* <Stack>
          {
            (mode === 'rutas')
            && (
              currentViewPlan?.routes?.map((route, index) => {
                console.log(route)
                return (
                  <RouteCard key={index} {...route} />
                )
              })
            )
          }
          </Stack> */}
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