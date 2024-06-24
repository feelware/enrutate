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

import useViewingPlan from '../../store/useViewingPlan'

import classes from './Navbar.module.css'

const Navbar = () => {
  const { viewingPlan } = useViewingPlan()
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView()
  
  const Option = ({ label, Icon, onClick }) => (
    <Button
      pl={25}
      pr={25}
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
      viewingPlan && <>
        <Stack gap={5} pr={25} pl={25} pt={75}>
          <Title order={3}>{viewingPlan.name}</Title>
          <ScrollArea mb={10} h={20}>
            <Text size="xs" >
              {viewingPlan.description}
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
                paddingRight: 25,
                paddingLeft: 25 + 10,
                backgroundColor: 'transparent',
              }
            }}
          />
          <ScrollArea className={classes.results}>
            <Stack ref={scrollableRef} gap={12} my={12}>
            {
              viewingPlan.routes?.map((route, index) => {
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