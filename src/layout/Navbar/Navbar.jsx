import {
  Title,
  Text,
  Stack,
  ScrollArea,
  Button,
  TextInput,
  rem
} from '@mantine/core'

import { useScrollIntoView } from '@mantine/hooks'

import {
  IconDownload,
  IconShare,
  IconHome,
  IconSearch
} from '@tabler/icons-react'

import UserOptions from './UserOptions/'

import RouteCard from './RouteCard' 

import useProcessStore from '../../store/useProcessStore'
import useGUIStore from '../../store/useGUIStore'

import classes from './Navbar.module.css'

const Navbar = () => {
  const { currentPlan } = useProcessStore()
  const { navPadding } = useGUIStore()
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView()

  const Option = ({ label, Icon, onClick }) => (
    <Button
      pl={navPadding}
      pr={navPadding}
      justify='left'
      variant='subtle'
      color='default'
      leftSection={<Icon size="1rem" stroke={1.5} />}
      onClick={onClick}
    >
      <Text size={rem(13)}>{label}</Text>
    </Button>
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
      Icon: IconHome,
      onClick: () => console.log('Back')
    },
  ]

  return (
    <Stack justify="space-between" className={classes.navbar}>
    {
      currentPlan && <>
        <Stack gap={5} pr={navPadding} pl={navPadding} pt={75}>
          <Title order={3}>{currentPlan.name}</Title>
          <ScrollArea mb={10} h={20}>
            <Text size="xs" >
              {currentPlan.description}
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
            <Stack ref={scrollableRef} gap={12} my={12}>
            {
              currentPlan.routes?.map((route, index) => {
                return (
                  <RouteCard 
                    key={index}
                    index={index}
                    targetRef={targetRef}
                    scrollIntoView={scrollIntoView}
                    { ...route}
                  />
                )
              })
            }
            </Stack>
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
      </>
    }
    </Stack>
  );
}

export default Navbar;