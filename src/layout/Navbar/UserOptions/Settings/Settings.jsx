import {
  Modal,
  Group,
  NavLink,
  Box,
  Stack
} from '@mantine/core'

import { useState } from 'react'

import General from './General'
import Products from './Products'
import Vehicles from './Vehicles'

import {
  useForm,
  isEmail,
  isNotEmpty
} from '@mantine/form'

import { 
  getAuthUser, 
  getDepot,
  updateAuthUser,
  updateDepot
} from '../../../../services/authUser'

const Settings = ({ opened, onClose }) => {
  const [active, setActive] = useState('general')
  // const authUser = getAuthUser()
  // const depot = getDepot()
  const [authUser, setAuthUser] = useState(getAuthUser())
  const [depot, setDepot] = useState(getDepot())

  const generalForm = useForm({
    mode: 'controlled',
    initialValues: {
      name: authUser.name,
      email: authUser.email,
      depot_description: depot.description,
      depot_formatted_address: depot.formatted_address,
      depot_lat: depot.lat,
      depot_lng: depot.lng
    },
    validate: {
      name: isNotEmpty('Campo requerido'),
      email: isEmail('Correo inválido')
    }
  })

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          generalForm.reset()
          onClose()
        }}
        withCloseButton={true}
        centered
        size='xl'
      >
        <Group 
          grow 
          preventGrowOverflow={false}
          align='flex-start'
          pt={0}
          pb={20}
          px={10}
          gap={25}
        >
          <Stack gap={0}>
            <NavLink 
              onClick={() => setActive('general')} 
              active={active === 'general'}
              label={'General'}
            />
            <NavLink 
              onClick={() => setActive('products')} 
              active={active === 'products'}
              label={'Productos'}
            />
            <NavLink 
              onClick={() => setActive('vehicles')} 
              active={active === 'vehicles'}
              label={'Vehículos'}
            />
          </Stack>
          <Box 
            flex={10}
            h={500}
          >
          {
            active === 'general' ? (
              <General 
                form={generalForm}
                onSubmit={async (values) => {
                  const updatedUser = {
                    name: values.name,
                    email: values.email
                  }
                  await updateAuthUser(updatedUser)
                  setAuthUser(updatedUser)
                  const updatedDepot = {
                    description: values.depot_description,
                    formatted_address: values.depot_formatted_address,
                    lat: values.depot_lat,
                    lng: values.depot_lng,
                  }
                  await updateDepot(updatedDepot)
                  setDepot(updatedDepot)
                }}
              />
            ) :
            active === 'products' ? <Products /> :
            active === 'vehicles' ? <Vehicles /> : null
          }
          </Box>
        </Group>
      </Modal>
    </>
  )
}

export default Settings