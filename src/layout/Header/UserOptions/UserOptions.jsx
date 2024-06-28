import {
  Avatar,
  Menu,
  rem,
} from '@mantine/core'

import {
  IconSettings,
  IconLogout,
} from '@tabler/icons-react'

import Settings from './Settings'
import useLogin from '../../../store/useLogin'
import { getAvatar } from '../../../services/authUser'
import { useDisclosure } from '@mantine/hooks'

const UserOptions = () => {
  const { logout } = useLogin()
  const [modalOpened, modalHandlers] = useDisclosure()

  console.log(getAvatar())

  return (
    <>
      <Menu
        width={200}
        position="bottom-start"
        offset={15}
        transitionProps={{ transition: 'fade' }}
        withinPortal
        shadow='xl'
      >
        <Menu.Target>
          <Avatar
            radius="xl"
            src={getAvatar()}
          />
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
            onClick={() => {
              modalHandlers.open()
            }}
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
        opened={modalOpened}
        onClose={modalHandlers.close}
      />
    </>
  )
}

export default UserOptions