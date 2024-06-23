import {
  // Avatar,
  Avatar,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core'

import {
  useDisclosure
} from '@mantine/hooks'

import {
  IconChevronRight,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react'

import { useState } from 'react'

import authUser from '../../../services/authUser'

import useLogin from '../../../store/useLogin'

import Settings from './Settings'

import classes from './UserOptions.module.css'

const UserOptions = () => {
  const [, setUserMenuOpened] = useState(false);
  const { logout } = useLogin()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Menu
        width={200}
        position="right"
        transitionProps={{ transition: 'fade' }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton className={classes.user}>
            <Group p={25}>
              <Avatar
                src="https://images.unsplash.com/photo-1622830032659-6d7f4e7a1f4e"
                size="sm"
                radius="xl"
              />
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {authUser.name}
                </Text>

                <Text c="dimmed" size="xs">
                  {authUser.email}
                </Text>
              </div>
              <IconChevronRight 
                style={{ 
                  width: rem(14), 
                  height: rem(14) 
                }} 
                stroke={1.5} 
              />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconSettings
                style={{
                  width: rem(16), 
                  height: rem(16) 
                }}
                stroke={1.5} 
              />
            }
            onClick={open}
          >
            Ajustes
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconLogout 
                style={{ 
                  width: rem(16), 
                  height: rem(16) 
                }} 
                stroke={1.5} 
              />
            }
            onClick={logout}
          >
            Cerrar sesión
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Settings 
        opened={opened}
        onClose={close}
      />
    </>
  )
}

export default UserOptions