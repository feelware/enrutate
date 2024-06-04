import { useState } from 'react'
import useUserData from '../../../store/useUserData'
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
  IconChevronRight,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react'

import useGUIStore from '../../../store/useGUIStore';
import classes from './UserOptions.module.css';

const UserOptions = () => {
  const [, setUserMenuOpened] = useState(false);
  const { userData } = useUserData()
  const { navPadding } = useGUIStore()

  return (
    <Menu
      width={200}
      position="right"
      transitionProps={{ transition: 'fade-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group p={navPadding}>
            <Avatar
              src="https://images.unsplash.com/photo-1622830032659-6d7f4e7a1f4e"
              size="sm"
              radius="xl"
            />
            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500}>
                {userData.name}
              </Text>

              <Text c="dimmed" size="xs">
                {userData.email}
              </Text>
            </div>
            <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          }
        >
          Ajustes
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          }
        >
          Cerrar sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserOptions